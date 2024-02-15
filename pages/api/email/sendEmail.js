// //https://www.youtube.com/watch?v=-qQjyxbla-k
// //--------https://www.youtube.com/watch?v=t2LvPXHLrek
// //https://www.youtube.com/watch?v=t2LvPXHLrek&t=1s

// //https://mailtrap.io/inboxes/2499902/messages/3867662540
//https://app-eu.smtp2go.com/reports/activity/

const nodemailer = require("nodemailer");
import { fetchallemails } from "../../../lib/db";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { subject, message } = req.body;

  const emailsender = "uettaxila@lostnest.xyz";
  if (!subject || !message) {
    return res.status(400).json({ error: "Missing required parameters" });
  }

  const transporter = nodemailer.createTransport({
    port: 25,
    secure: false,
    host: process.env.smtp_host,
    auth: {
      user: process.env.smtp_user,
      pass: process.env.smtp_pass,
    },
  });
  // const transporter = nodemailer.createTransport({
  //   port: 587,
  //   secure: false,
  //   host: process.env.password_changehost,
  //   auth: {
  //     user: process.env.password_changeusername,
  //     pass: process.env.password_changepass,
  //   },
  // });

  const to = (await fetchallemails()).map((user) => user.email);
  //const to = "ghufran.chaudary12@gmail.com";
  // Set up email options
  const mailOptions = {
    from: emailsender,
    to,
    subject: subject,
    html: message,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    res
      .status(200)
      .json({ success: true, message: "Email sent to registered users." });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Error in sending email to registered users." });
  }
}





