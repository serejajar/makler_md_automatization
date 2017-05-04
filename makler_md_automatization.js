var webPage = require('webpage');
var page = webPage.create();

const email = 'ntczyldfgikb@dropmail.me';
const pass = 'WooThooW3kei';

page.viewportSize = {
  width: 1920,
  height: 1080
};

page.open('https://makler.md/ru', function(status) {
  var interval = 0;
  var flowObj = {};
  if (status === 'success') {

    // LOGIN: click on the link for displaing form --> add values (email, pass) --> click on the submit button
    findCoordinatsForElem(flowObj, 'link', '#logInDiv');
    page.sendEvent('click', flowObj.linkCenterX, flowObj.linkCenterY, 'left');

    setTimeout(function() { // set timeout n second for allow to render the elem
      addValueIntoForm(email, pass);
      findCoordinatsForElem(flowObj, 'btn', 'a[data-action="login"]');
      page.sendEvent('click', flowObj.btnCenterX, flowObj.btnCenterY, 'left'); // click on the submit button
    }, interval += 5000);

    // GO TO MY GOODS and push up last itemk
    setTimeout(function() {
      page.open('https://makler.md/ru/an/my', function() {
        findCoordinatsForElem(flowObj, 'pushup', 'a.push-up');
        page.sendEvent('click', flowObj.pushupCenterX, flowObj.pushupCenterY, 'left');
      });
    }, interval += 5000);

    // check if all is ok
    setTimeout(function() {
      findStatusText(flowObj, '#push-up');
      console.log(flowObj.statusText);
      phantom.exit();
    }, interval += 5000);
  }
  else {
    console.log('ERROR with loading page: ' + status);
  }
});

//  functions
function findCoordinatsForElem(flowObj, elemName, querySelector) {
  flowObj[elemName] = page.evaluate(function(querySelector) {
    var elemColl = document.querySelectorAll(querySelector); // finf all elem
    return elemColl[elemColl.length-1].getBoundingClientRect(); // return last push-up btn
  }, querySelector);

  // calculate the center of the login element and clik on it
  flowObj[elemName + 'CenterX'] = flowObj[elemName].right - (flowObj[elemName].width / 2);
  flowObj[elemName + 'CenterY'] = flowObj[elemName].bottom - (flowObj[elemName].height / 2);
}

function addValueIntoForm(email, pass) {
  // the email, pass vars were declarate globaly
  page.evaluate(function(email, pass) {
    // add values
    document.getElementById('logInEmail').value = email;
    document.getElementById('logInPassword').value = pass;
  }, email, pass);
}

function findStatusText(flowObj, querySelector) {
  flowObj.statusText = page.evaluate(function(querySelector) {
    var elem1 = document.querySelector(querySelector + ' p');
    var elem2 = document.querySelector(querySelector + ' div.message');

    return elem1 ? elem1.innerHTML : elem2.innerHTML; // return status text
  }, querySelector);
}
