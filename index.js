(function () {
  "use strict";
  var http = require('http');
  var fs = require('fs');
  var nodemailer = require("nodemailer");

  var config = JSON.parse(fs.readFileSync('config.json'));

  var onStatusResponse = function (result) {
    var completeResponse = JSON.parse(result);

    if (completeResponse.summary != "OK") {
      console.log("Status *not OK* at " + new Date());
      console.log(completeResponse);

      var smtpTransport = nodemailer.createTransport("SMTP", config.mail.smtp);
      var mailOptions = config.mail.options;
      mailOptions.text = "Status summary *not OK*:\n" + result;
      smtpTransport.sendMail(mailOptions, function (error, response) {
        if (error) {
          console.log(error);
        }
        else {
          console.log("Message sent: " + response.message);
        }
        smtpTransport.close();
      });
    }
  };

  http
      .get(config.options, function (response) {
             var result = '';
             response.on('data', function (chunk) {
               result += chunk;
             });
             response.on('end', function () {
               onStatusResponse(result);
             });
           })
      .on("error", function (e) {
            console.log("Got error: " + e.message);
          });

})();