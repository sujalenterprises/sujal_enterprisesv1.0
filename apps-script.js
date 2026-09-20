function doPost(e) {
  const params = e.parameter;

  const name = params.name || 'N/A';
  const email = params.email || 'N/A';
  const phone = params.phone || 'N/A';
  const company = params.company || 'N/A';
  const product = params.product || 'General enquiry';
  const message = params.message || 'N/A';

  const subject = `New enquiry from ${name}`;

  const body = `
Name: ${name}
Email: ${email}
Phone: ${phone}
Company: ${company}
Product: ${product}

Message:
${message}
  `;

  GmailApp.sendEmail(
    'sujalenterprisesgzb@gmail.com',
    subject,
    body
  );

  return ContentService.createTextOutput('OK');
}
