var whois = require("node-whois");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;
const nodemailer = require("nodemailer");
const express=require("express");
var app=express();







var Pro = new Promise((res, rej) => {
  whois.lookup("google.com", function (err, address, family) {
    if (err) {
      return rej(err.message);
    } else {
      return res(address);
    }
  });
});


// async function caller()
// {

Pro.then(async (data) => {

  //extraction of Data has been started from here

  let ts = Date.now();

  let date_time = new Date(ts);
  let date = date_time.getDate();
  let month = date_time.getMonth() + 1;
  let year = date_time.getFullYear();

  var main_d = year + "-" + month + "-" + date;
  console.log(year + "-" + month + "-" + date);
  const csvWriter = createCsvWriter({
    path: `file${main_d}.csv`,
    header: [
      { id: "name", title: "Domain Name" },
      { id: "rgws", title: "Registry Whois Server" },
      { id: "rgu", title: "Registrar URL" },
      { id: "email", title: "Registered Email" },
      { id: "phone", title: "Registered Phone" },
    ],
  });

  var a = data.split("\r\n");
  var obj = {};
  a.forEach((e, i) => {
    if (i < 4 || i == 9 || i == 10) {
      // console.log(e);
      if (i == 0) {
        d = e.split(":").slice(1, 2);
        d.forEach((e, i) => {
          console.log(e);
          obj["name"] = e;
        });
      } else if (i == 1) {
        d = e.split(":").slice(1, 2);
        d.forEach((e, i) => {
          console.log(e);
          obj["rgws"] = e;
        });
      } else if (i == 2) {
        d = e.split(":").slice(1, 2);
        d.forEach((e, i) => {
          console.log(e);
          obj["rgu"] = e;
        });
      } else if (i == 3) {
        d = e.split(":").slice(1, 2);
        d.forEach((e, i) => {
          console.log(e);
        });
      } else if (i == 9) {
        d = e.split(":").slice(1, 2);
        d.forEach((e, i) => {
          console.log(e);
          obj["email"] = e;
        });
      } else {
        d = e.split(":").slice(1, 2);
        d.forEach((e, i) => {
          console.log(e);
          obj["phone"] = e;
        });
      }
    }
  });

  // Data is going store in csv file
  
  console.log(obj);

  app.get('/',(req,res)=>{
    // console.log(res.send)
    res.send(obj);
  })

  const records = [obj];

  csvWriter
    .writeRecords(records) // returns a promise
    .then(() => {
      console.log("...Done");
    });


    // Sending the email using nodemailer
     
    let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "perry82@ethereal.email",
        pass: "suS9Pp6TX5xqQAf9zx",
      },
    });
    let info = await transporter.sendMail({
      from: '"Ashad Mubeen " <mo.anas123kha@gmail.com>', // sender address
      to: "javascriptlearner123@gmail.com", // list of receivers
      subject: "Daily Emitter", // Subject line
      text: "Hello world?", // plain text body
      html: "<b>Hello world?</b>", // html body
    });
    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    app.get("/email", (req, res) => {
      // console.log(res.send)
      res.send(info);
    });



}).catch((err) => {
  console.log(err);
});


// }

app.listen('8000',()=>{
    console.log("Listening to port number :  8000 ");
})