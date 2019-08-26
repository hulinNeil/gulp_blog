function transformMd() {
  $('#preview').innerHTML = marked($('#input').value);
}

function renderer() {
  var origin = new marked.Renderer();
  origin.code = function(code, lang) {
    var hl = Prism.highlight(
      code,
      Prism.languages[lang] || Prism.languages.js
    );
    return `<pre class="language-${lang}"><code class="language-${lang}">${hl}</code></pre>`;
  }
  return origin;
}

marked.setOptions({
  renderer: renderer()
});

if ($('#input').value.length > 0) {
  transformMd();
  console.log(666)
}

$('.publish-btn').addEventListener('click', uploadArticle);
$('.toggle-btn').addEventListener('click', togglePopup);

$('#input').addEventListener('input', transformMd);
$('#input').addEventListener('paste', e => {
  var data = e.clipboardData || window.clipboardData;
  //获取图片内容
  blob = data.items[0].getAsFile();
  if (!blob) {
    return;
  }
  uploadFile(blob);
});

$('#input').addEventListener('drop', event => {
  if (event.dataTransfer && event.dataTransfer.files) {
    var image = event.dataTransfer.files[0];
    if (~image.type.indexOf("image")) {
      event.preventDefault();
      return uploadFile(image);
    }
  }
});

function togglePopup(e) {
  if (~this.className.indexOf('active')) {
    this.classList.remove('active');
    $('.publish-popup').style.display = 'none';
  } else {
    this.classList.add('active');
    $('.publish-popup').style.display = 'block';
  }
}

function uploadFile(file) {
  var formData = new FormData();
  formData.append('imageFile', file);

  ajax({
    url: '/upload',
    method: 'POST',
    data: formData,
    contentType: false,
    success: function(e) {
      $('#input').value += `![${e.data}](${e.data})`;
      transformMd();
    },
    fail: function(err) {
      console.log(err);
    }
  })
}

function uploadArticle() {
  var obj = {
    title: $('#title-input').value,
    markdown: $('#input').value,
    html: $('#preview').innerHTML,
    tags: $('.publish-tags').value.split(','),
    articleID: location.pathname.slice(8)
  }
  ajax({
    url: '/articleStorage',
    method: 'POST',
    data: obj,
    success: function(e) {
      console.log(e);
      if (e.success) {
        location.href = '/detail/' + e.data.id;
      }
    },
    fail: function(err) {
      console.log(err);
    }
  })
}
