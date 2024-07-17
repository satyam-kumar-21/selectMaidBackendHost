// controllers/contact.js

const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();
const EMAIL = process.env.CONTACT_EMAIL;
const EMAIL_SECRET = process.env.EMAIL_SECRET;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: EMAIL, // Replace with your Gmail email
    pass: EMAIL_SECRET, // Replace with your Gmail password or app-specific password
  },
});

const submitMessage = async (req, res) => {
  const { name, email, message, mobile } = req.body;

  // Create email content
  const mailOptions = {
    from: `${EMAIL}`, 
    to: email, // Your email(s)
    subject: `New Message from Contact Form of selectmaid.in`,
    html: `<p><strong>Name:</strong> ${name}</p>
           <p><strong>Email:</strong> ${email}</p>
           <p><strong>Contact No.:</strong> ${mobile}</p>
           <p><strong>Message:</strong> ${message}</p>`,
  };

  console.log(mailOptions);

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Failed to send message' });
  }
};


module.exports = {
  submitMessage,
};
