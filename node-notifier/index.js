const Growl = require('node-notifier').Growl;
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {

  res.send('Hello World!')
})

const WindowsBalloon = require('node-notifier').WindowsBalloon;

var notifier = new WindowsBalloon({
  withFallback: false, // Try Windows Toast and Growl first?
  customPath: undefined // Relative/Absolute path if you want to use your fork of notifu
});

notifier.notify(
  {
    title: undefined,
    message: undefined,
    sound: false, // true | false.
    time: 5000, // How long to show balloon in ms
    wait: false, // Wait for User Action against Notification
    type: 'info' // The notification type : info | warn | error
  },
  function (error, response) {
    console.log(response);
  }
);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))





