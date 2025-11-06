// pages/api/send-email.js
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { to, subject, html } = req.body;
      
      const msg = {
        to,
        from: 'noreply@yourdomain.com', // Your verified sender
        subject,
        html,
      };

      await sgMail.send(msg);
      res.status(200).json({ success: true });
    } catch (error) {
      console.error('Email error:', error);
      res.status(500).json({ error: 'Failed to send email' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}