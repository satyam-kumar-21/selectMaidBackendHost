// controllers/contact.js

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'satyamkumar2716@gmail.com', // Replace with your Gmail email
    pass: 'Satyam@2002', // Replace with your Gmail password or app-specific password
  },
});

const submitMessage = async (req, res) => {
  const { name, email, message } = req.body;

  // Create email content
  const mailOptions = {
    from: `${email}`,
    to: 'satyamkumar2716@gmail.com', // Replace with recipient's email
    subject: 'New Message from Contact Form',
    html: `<p><strong>Name:</strong> ${name}</p>
           <p><strong>Email:</strong> ${email}</p>
           <p><strong>Message:</strong> ${message}</p>`,
  };

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
