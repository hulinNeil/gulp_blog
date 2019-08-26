"use strict";

function createXHR() {
  if (typeof XMLHttpRequest != "undefined") {
    return new XMLHttpRequest();
  } else if (typeof ActiveXObject != "undefined") {
    if (typeof arguments.callee.activeXString != "string") {
      var versions = ["MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.3.0", "MSXML2.XMLHttp"];

      for (var i = 0, len = versions.length; i < len; i++) {
        try {
          var xhr = new ActiveXObject(versions[i]);
          arguments.callee.activeXString = versions[i];
          return xhr;
        } catch (ex) {
          if (len - 1 == i) {
            throw new Error("there is no xmlhttprequest object available");
          }
        }
      }
    } else {
      return new ActiveXObject(arguments.callee.activeXString);
    }
  } else {
    createXHR = function createXHR() {
      throw new Error("there is no xmlhttprequest object available");
    };
  }
}

function ajax(_optionsObj, _cfFlag, _timeout) {
  var timeout = _timeout || new Date().getTime();

  var optionsObj = {
    method: _optionsObj.method || 'GET',
    url: _optionsObj.url || '',
    requestType: _optionsObj.requestType === false ? false : true,
    timeout: _optionsObj.timeout || 10000,
    data: _optionsObj.data || '',
    contentType: _optionsObj.contentType === false ? false : _optionsObj.contentType || 'application/json',
    complete: _optionsObj.complete || null,
    fail: _optionsObj.fail || null,
    success: _optionsObj.success || null
  };
  var cfFlag = _cfFlag || true;
  var ajaxZXFlag = true;
  var timeOutRD = setTimeout(function () {
    clearTimeout(timeOutRD);
    ajaxZXFlag = false;

    if (!cfFlag) {
      ajax(optionsObj, true, timeout);
    } else {
      optionsObj.fail && optionsObj.fail();
    }
  }, optionsObj.timeout);
  var xhr = createXHR();

  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && ajaxZXFlag) {
      clearTimeout(timeOutRD);

      if (httpSuccess(xhr) && ajaxZXFlag) {
        optionsObj.success && optionsObj.success(JSON.parse(xhr.responseText));
      } else {
        optionsObj.fail && optionsObj.fail();
      }

      optionsObj.complete && optionsObj.complete(xhr);
      xhr = null;
    }
  };

  var url;

  if (optionsObj.url.indexOf("?") > -1) {
    url = optionsObj.url + "&timestamp=" + new Date().getTime();
  } else {
    url = optionsObj.url + "?timestamp=" + new Date().getTime();
  }

  xhr.open(optionsObj.method, optionsObj.url, optionsObj.requestType);

  if ("GET" === optionsObj.method) {
    xhr.send(null);
  } else {
    if (optionsObj.contentType) {
      xhr.setRequestHeader('Content-Type', optionsObj.contentType);
      optionsObj.data = JSON.stringify(optionsObj.data);
    }

    xhr.send(optionsObj.data);
  }
}

var httpSuccess = function httpSuccess(r) {
  var flag = false;

  try {
    if (r.status >= 200 && r.status <= 300 || r.status == 304) {
      flag = true;
    } else if (!r.status && location.protocol == "file:") {
      flag = true;
    } else if (navigator.userAgent.indexOf('Safari') >= 0 && typeof r.status == "undefined") {
      flag = true;
    } else {
      flag = false;
    }
  } catch (e) {
    flag = false;
  } finally {
    return flag;
  }
};

var $ = function $(select) {
  return document.getElementById(select) || document.querySelector(select);
};