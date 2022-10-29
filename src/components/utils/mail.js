const nodemailer = require('nodemailer');

const { USER, USER_PASSWORD, CLIENT_ID, CLIENT_SECRET, REFRESH_TOKEN } =
  process.env;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: USER,
    pass: USER_PASSWORD,
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    refreshToken: REFRESH_TOKEN,
  },
});

/**
 * @descriptions - email sent to users when they successfully register their account to the application.
 */
const sendWelcomeEmail = async (email, name) => {
  try {
    const info = await transporter.sendMail({
      from: 'admin@mydiarylogs.com',
      to: `${email}`,
      subject: 'Thanks for Joining in', // Subject line
      text: `Welcome to the app, ${name}, let us know how you get along with our product and services`, // plain text body
      //   html: '<b><p>Do well to enjoy your usage </></b>', // html body
    });
    return info;
  } catch (e) {
    console.log(e);
  }
};

/**
 * @descriptions - email sent to users when they successfully delete their account from the application.
 */
const sendGoodbyeEmail = async (email, name) => {
  try {
    const info = await transporter.sendMail({
      from: 'admin@mydiarylogs.com',
      to: `${email}`,
      subject: `Goodbye ${name}`,
      text: `We hate goodbyes, but we believe goodbye is not the end. Your account has been deleted successfully ${name}, we hope to see you back soon.`,
      //   html: '<b><p>Do well to enjoy your usage </></b>', // html body
    });
    return info;
  } catch (e) {
    console.log(e);
  }
};

module.exports = { sendWelcomeEmail, sendGoodbyeEmail };
