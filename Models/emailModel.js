const nodemailer = require("nodemailer");
const sendEmail = async (to, subject, text) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  // console.log("user",process.env.EMAIL_USER)
  // console.log("pass is This",process.env.EMAIL_PASS)

  const mailOptions = {
    from: "invoicely@gmail.com",
    to: to,
    subject: subject,
    template:'index.html',
    // attachments: [{filename:'abc.jpg',path.resolve(__dirname,'../views/in')}]
    text: text,
  };

  const info = await transporter.sendMail(mailOptions);
  console.log("Email sent: %s", info.messageId);
};

module.exports = {
  send: sendEmail,
};
