var webFrame = require('web-frame');

window._zoomIn = function () {
  webFrame.setZoomFactor(webFrame.getZoomFactor() + 0.1);
};

window._zoomOut = function () {
  webFrame.setZoomFactor(webFrame.getZoomFactor() - 0.1);
};

window._zoomActualSize = function() {
  webFrame.setZoomFactor(1);
};

window._loadRph = function() {

  // First of all, let's remove the head container for all pages that need it (we don't want it!)
  var headContainer = document.getElementById('headContainer');
  if (headContainer) {
    console.log('Removed the bloody header container.');
    headContainer.parentNode.removeChild(headContainer);
  }

  // Attempt to load the RPH Tools for enhanced functionality.
  var s = document.createElement('script');
  s.async = s.defer = true;
  s.src = 'https://cdn.rawgit.com/shuffyiosys/rph_tools/master/trunk/rph_tools.js';
  var a = document.getElementsByTagName('script')[0];
  a.parentNode.insertBefore(s, a);
  console.log('Loading in rph_tools.js userscript');


  // We only want to be on the login page until we're authenticated.
  var loginPageTest = /rphaven.com\/login.php/;
  var isLoginPage   = loginPageTest.test(window.location.href);

  if (isLoginPage) {

    console.log('On a login page.');
    $(function() {
      _on('account', function(data) {
        if (data.props.accid) {
          console.log('Account ID found!');
          window.location = 'http://chat.rphaven.com';
        }
      });
    });

  } else {

    console.log('On a chat page.');
    window.addEventListener('message', function(e) {
      var msg = JSON.parse(e.data);
      if (msg.data['error-msg'] == 903) {
        window.location = 'http://www.rphaven.com/login.php';
      }    
    });

  }
  
};

document.addEventListener('DOMContentLoaded', window._loadRph);
