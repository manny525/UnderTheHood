const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const generateVerificationCode = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

const sendVerificationCode = (email) => {
    const vCode = generateVerificationCode(100000,999999)
    sgMail.send({
        to: email,
        from: 'mtolia9@gmail.com',
        subject: 'Verificaton Code',
        text: `Your verification code is ${vCode}`
    }).then(() => {
        return vCode
    }).catch((e) => {
        console.log(e.response.body)
    })
}

// const sendWelcomeEmail = (email, name) => {
//     sgMail.send({
//         to: email,
//         from: 'mtolia9@gmail.com',
//         subject: 'Welcome to task manager app',
//         text: `Welcome to the app ${name}. Let us know your feedback once you start using the app`
//     }).then(() => {
//     }).catch((e) => {
//         console.log(e.response.body)
//     })
// }

// const deleteAccountEmail = (email, name) => {
//     sgMail.send({
//         to: email,
//         from: 'mtolia9@gmail.com',
//         subject: 'We are sorry to see you go',
//         text: `Goodbye ${name}, we are sorry to hear that you are leaving. Please let us know if there is something we could have done better.`
//     }).then(() => {
//     }).catch((e) => {
//         console.log(e.response.body)
//     })
// }

module.exports = {
    sendVerificationCode
}