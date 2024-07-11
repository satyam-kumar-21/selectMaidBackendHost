// controllers/contact.js

const nodemailer = require('nodemailer');
const EMAIL = process.env.CONTACT_EMAIL;
const EMAIL_SECRET = process.env.EMAIL_SECRET;
const SELECT_MAID_EMAIL = process.env.SELECT_MAID_EMAIL; // Additional recipient email

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: EMAIL, // Replace with your Gmail email
    pass: EMAIL_SECRET, // Replace with your Gmail password or app-specific password
  },
});

const submitMessage = async (req, res) => {
  const { name, email, message } = req.body;

  // Create email content
  const mailOptions = {
    from: email,
    to: EMAIL, // Include both recipients here
    subject: 'New Message from Contact Form of selectmaid.in',
    html: `<p><strong>Name:</strong> ${name}</p>
           <p><strong>Email:</strong> ${email}</p>
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
