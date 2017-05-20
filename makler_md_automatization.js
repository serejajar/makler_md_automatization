var webPage = require('webpage');
var page = webPage.create();

const email = 'YOUR_EMAIL';
const pass = 'YOUR_PASSWORD';

page.viewportSize = {
  width: 1920,
  height: 1080
};

page.open('https://makler.md/ru/an/my', function(status) {
  var interval = 0;
  var flowObj = {};

  if (status === 'success') {
    // ADD VALUES (email, pass) --> click on the submit button
    logIn(email, pass);

    // PUSH UP last itemk
    setTimeout(function() {
      clickOnElem(flowObj, 'pushup', 'a.push-up');
    }, interval += 5000);

    // CHECK if all is ok and EXIT
    setTimeout(function() {
      findStatusText(flowObj, '#push-up');
      page.render('makler.jpeg', {format: 'jpeg', quality: '100'});
      phantom.exit();
    }, interval += 5000);
  }
  else {
    console.log('ERROR with loading page: ' + status);
  }
});

//  functions
function logIn(email, pass) {
  log('logIn');
  // the email, pass vars were declarate globaly
  page.evaluate(function(email, pass) {
    // add values
    document.getElementById('email').value = email;
    document.getElementById('password').value = pass;
    // send request for log in
    $('#userLoginForm').submit();
  }, email, pass);
}

function clickOnElem(flowObj, elemName, querySelector) {
  log('clickOnElem:' + querySelector);

  flowObj[elemName] = page.evaluate(function(querySelector) {
    var elemColl = document.querySelectorAll(querySelector); // find all elem
    var element = elemColl[elemColl.length-1];

    var event = document.createEvent('MouseEvents');
    event.initMouseEvent('click', true, true, window, 1, 0, 0);
    // send click to element
    element.dispatchEvent(event);
  }, querySelector);
}


function findStatusText(flowObj, querySelector) {
  log('findStatusText');
  flowObj.statusText = page.evaluate(function(querySelector) {
    var elem1 = document.querySelector(querySelector + ' p');
    var elem2 = document.querySelector(querySelector + ' div.message');
    return elem1 ? elem1.innerHTML : elem2.innerHTML; // return status text
  }, querySelector);
  console.log('statusText: ' + flowObj.statusText);
}

function log(msg) {
  var date = new Date();
  console.log(date, msg);
}
