export const sendEmail = async ({ to, subject, html }) => {
  // In production integrate with a provider like SendGrid, SES, or Mailgun.
  console.log('Sending email to:', to);
  console.log('Subject:', subject);
  console.log('HTML:', html);
};
