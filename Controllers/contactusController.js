const Contact = require('../Models/contactUs');
const transporter = require('../Middlewares/nodemailer'); 

const createContact = async (req, res) => {
  try {
    const { name, email, phone, message  } = req.body;
    
    let contact = await Contact.findOne({ email });

    if (!contact) {

    const newContact = new Contact({
      name,
      email,
      phone,
      message
    });

    await newContact.save();
  }
    // Send confirmation email to the user
    const userMailOptions = {
      from: 'heshvithatech@gmail.com',
      to: email,
      subject: 'Contact Form Submission Confirmation',
      text: `Dear ${name},

Thank you for contacting us. We have received your submission and will get back to you shortly.

Best regards,
HeshvithaTech Team`,
    };

    // Send enquiry email to the admin
    const adminMailOptions = {
      from: 'heshvithatech@gmail.com',
      to: 'vishnusharmabora93@gmail.com', // Add Admin email address
      subject: 'New Contact Form Submission',
      text: `A new contact form submission has been received with the following details:


name: ${name}
Email: ${email}
Phone: ${phone}
Message: ${message}`,
    };

    // Send the emails for both user and admin
    transporter.sendMail(userMailOptions, (userError, userInfo) => {
      if (userError) {
        console.error('Error sending confirmation email:', userError);
        return res.status(500).json({ error: 'Error sending confirmation email' });
      } else {
        console.log('Confirmation email sent:', userInfo.response);

        transporter.sendMail(adminMailOptions, (adminError, adminInfo) => {
          if (adminError) {
            console.error('Error sending enquiry email:', adminError);
            return res.status(500).json({ error: 'Error sending enquiry email' });
          } else {
            console.log('Enquiry email sent:', adminInfo.response);
            return res.status(201).json({ message: 'Contact form submitted successfully. Confirmation email sent to user and enquiry email sent to admin.' });
          }
        });
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createContact };