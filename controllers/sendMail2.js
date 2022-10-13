const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const { GOOGLE_ID, GOOGLE_SECRET, GOOGLE_REFRESH, GOOGLE_URL, GOOGLE_USER } =
  process.env;

const sendMail = async (mail, name, lastname, country, state, phone, shippingadress, productName, productPrice, code) => {
  const client = new OAuth2(GOOGLE_ID, GOOGLE_SECRET, GOOGLE_URL);
  client.setCredentials({
    refresh_token: GOOGLE_REFRESH,
  });
  const accessToken = client.getAccessToken();
  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: GOOGLE_USER,
      type: "OAuth2",
      clientId: GOOGLE_ID,
      clientSecret: GOOGLE_SECRET,
      refreshToken: GOOGLE_REFRESH,
      accessToken: accessToken,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
  const mailOptions = {
    from: GOOGLE_USER,
    to: mail,
    subject: "Purchase detail - MindGrow",
    html: `
            <div>
                <h2 style="text-align: center; color: #5c8d89;">Purchase detail - MindGrow</h2>
                <p style="text-align: center;">Products: ${productName}</p>
                <p style="text-align: center;">Price: $${productPrice}</p>
                <h3 style="text-align: center; color: #5c8d89;">Buyer details</h3>
                <p style="text-align: center">Country: ${country}</p>
                <p style="text-align: center">State: ${state}</p>
                <p style="text-align: center">Name: ${name}</p>
                <p style="text-align: center">Lastname: ${lastname}</p>
                <p style="text-align: center">Shipping adress: ${phone}</p>
                <p style="text-align: center">Purchase code: ${code}</p>
                <p style="text-align: center">Phone: ${shippingadress}</p>
                <p style="text-align: center"><strong><img style="display: block; margin-left: auto; margin-right: auto;" src="https://cdn.discordapp.com/attachments/998938279938359307/1029767945796194344/doctor_rabbit.png" height="200" /></strong>Thanks for your purchase.</p>
            </div>
        `,
  };
  await transport.sendMail(mailOptions, (error, response) => {
    if (error) {
      console.log(error);
    } else {
      console.log("ok");
    }
  });
};

module.exports = sendMail;