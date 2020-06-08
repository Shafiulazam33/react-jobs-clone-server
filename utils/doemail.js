const nodemailer = require("nodemailer");
async function doemail(email, token, resetLink) {
    let testAccount = await nodemailer.createTestAccount();

    let transporter = nodemailer.createTransport({
        host: 'in-v3.mailjet.com',
        port: 587,
        secure: false,
        auth: {
            user: "mdshafiulazam33@yahoo.com",
            pass: '1234578mdshafiulazam33@yahoo.com'
        },
        tls: {
            rejectUnauthorized: false
        }
    });
    let link;
    if (resetLink) {
        link = `localhost:3000/password-reset?token=${token}&email=${email}`
    }
    else {
        link = `localhost:4000/api/profile/email-verification?token=${token}`
    }
    let info = await transporter.sendMail({
        from: '"Fred Foo 👻" <foo@example.com>', // sender address
        to: email, // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: `<a href="${link}">${link}</a>`, // html body
    });
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}
module.exports.doemail = doemail