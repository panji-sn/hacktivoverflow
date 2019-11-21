const cron = require("node-cron")
const nodemailer = require("nodemailer")
const User = require('../models/User')
const mongoose = require('mongoose')
const Question = require('../models/Question')
const mustache = require('mustache')
const fs = require('fs')
require('dotenv').config()

const mongooseConfig = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}

mongoose.connect(process.env.MONGOOSE_URL, mongooseConfig, function(err) {
    if(err) console.log(err)
    console.log('database connect')
} )

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_EMAIL,
    pass: process.env.GMAIL_PASSWORD
  }
});

cron.schedule("59 23 * * *", function() {
    let template = fs.readFileSync('./helpers/template.html', 'utf8');
    console.log("---------------------");
    console.log("Running Cron Job");
    let data = []
    User.find()
    .then (result => {
        for (let i = 0; i < result.length; i++) {
            data.push(result[i].email)
        }
        console.log('masuk sini')
        return Question.find().populate('UserId').sort({answer:'desc'})
        
    })
    .then (result => {
        console.log(result)
        let temp = result[0]
        console.log(temp, 'ini dari temp')
        let mailOptions = {
            from: process.env.GMAIL_EMAIL,
            to: data,
            subject: `The Most Answered Question !!`,
            html: mustache.to_html(template, temp)
          };
        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
              console.log(error);
            } else {
              console.log("Email successfully sent!");
            }
          });
    })
    .catch (err => {
        console.log('masuk error')
        console.log(err)
    })
});