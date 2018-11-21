var nodemailer = require('nodemailer');

const PORT = process.env.PORT || 3000;

var express = require('express');

var app = express();

var transporter = nodemailer.createTransport({
  service: 'outlook',
  auth: {
    user: 'userEmail',
    pass: 'password'
  },
  tls:{
    rejectUnauthorized:false
  }
});

var mailOptions = {
  from: 'manikandan.mahendran@aspiresys.com',
  to: 'kathiravan.sethuraman@aspiresys.com',
  subject: 'Sending Email using Node.js',
  html: '<h1 style="text-color:red">hiii</h1>'
};

transporter.sendMail(mailOptions, function (error, info) {
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});


app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
