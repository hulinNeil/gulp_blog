function setDirectory() {
  var headers = document.querySelectorAll('h3'),
    directory = document.querySelector('.directory'),
    directorySection = document.querySelector('.directory-sticky');
  if (headers.length === 0) {
    return;
  }
  directorySection.style.display = 'block';
  var directorys = '';
  headers.forEach(value => {
    directorys += '<li><a href="#' + value.id + '">' + value.innerText + '</a></li>';
  });
  directory.innerHTML = directorys;
  var highlightTitle = document.querySelector('.highlight-title');
  window.addEventListener('scroll', event => {
    var oldActive = directory.querySelector('.active');
    if (headers[0].getBoundingClientRect().top > 5) {
      oldActive && oldActive.classList.remove('active');
      highlightTitle.style.height = '0px';
      return;
    }
    headers.forEach((value, index) => {
      if (value.getBoundingClientRect().top <= 2 && (headers.length !== 1 && headers[index + 1] &&
          headers[index + 1].getBoundingClientRect()
          .top > 2 || index + 1 >= headers.length)) {
        var newActive = directory.querySelectorAll('li')[index];
        oldActive && oldActive.classList.remove('active');
        newActive.classList.add('active');
        highlightTitle.style.top = newActive.offsetTop + 'px';
        highlightTitle.style.height = newActive.offsetHeight + 'px';
      }
    });
  })
}
setDirectory();

var md = document.getElementById('preview');
md.addEventListener('click', function(event) {
  var target = event.target;
  if (target.tagName === 'IMG') {
    var src = target.src;
    if (src) {
      var preview = new Preview(src);
      preview.show();
    }
  }
})
