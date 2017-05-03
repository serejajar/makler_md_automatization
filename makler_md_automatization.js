var webPage = require('webpage');
var page = webPage.create();

const email = 'ntczyldfgikb@dropmail.me';
const pass = 'WooThooW3kei';

var interval = 0;

page.viewportSize = {
  width: 1920,
  height: 1080
};


page.open('https://makler.md/ru', function(status) {
  if (status === 'success') {
    // LOGIN: click on the link --> display form --> add values (email, pass) --> click on the submit button

    // CLICK ON THE LINK
    // find coordinats for the login elem
    const logInElemCoordinats = page.evaluate(function() {
      return document.getElementById('logInDiv').getBoundingClientRect();
    });

    // calculate the center of the login element and clik on it
    const loginElemCenter = {
      x: logInElemCoordinats.right - (logInElemCoordinats.width / 2),
      y: logInElemCoordinats.bottom - (logInElemCoordinats.height / 2)
    };
    // click on the link for showing the login form
    page.sendEvent('click', loginElemCenter.x, loginElemCenter.y, 'left');

    // ADD VALUES (email, pass) for login form and click on the submit button
    setTimeout(function() {
      const logInBtnCoordinats = page.evaluate(function(email, pass) {
        // add values
        document.getElementById('logInEmail').value = email;
        document.getElementById('logInPassword').value = pass;

        // find coordinats for the login submit button
        return document.querySelector('a[data-action="login"]').getBoundingClientRect();
      }, email, pass);

      // calculate the center of the login button and clik on it
      const loginBtnCenter = {
        x: logInBtnCoordinats.right - (logInBtnCoordinats.width / 2),
        y: logInBtnCoordinats.bottom - (logInBtnCoordinats.height / 2)
      };
      // click on the submit button
      page.sendEvent('click', loginBtnCenter.x, loginBtnCenter.y, 'left');
    }, interval += 1000);

    // GO TO MY GOODS and push up last item
    setTimeout(function() {
      page.open('https://makler.md/ru/an/my', function() {
        // find coordinats for the push-up button
        const pushUpBtnCoordinats = page.evaluate(function() {
          var elemColl = document.querySelectorAll('a.push-up'); // finf all btns

          return elemColl[elemColl.length-1].getBoundingClientRect(); // return last push-up btn
        });

        const pushUpBtnCenter = {
          x: pushUpBtnCoordinats.right - (pushUpBtnCoordinats.width / 2),
          y: pushUpBtnCoordinats.bottom - (pushUpBtnCoordinats.height / 2)
        };

        console.log(pushUpBtnCenter);
        page.sendEvent('click', pushUpBtnCenter.x, pushUpBtnCenter.y, 'left');
      });
    }, interval += 1000);

    setTimeout(function() { // we need the setTimeot function for allowing the phantomJS to render the login elemen
      console.log(page.url);
      page.render('makler.jpeg', {format: 'jpeg', quality: '100'});
      phantom.exit();
    }, interval += 1000);
  }
  // else {
  //  log into file
  // }
});
