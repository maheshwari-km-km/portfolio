import emailjs from '@emailjs/browser';

interface EmailData {
  to: string;
  subject: string;
  body: string;
}

/**
 * Send an email using EmailJS service
 */
export const sendEmail = async (emailData: EmailData): Promise<void> => {
  try {
    const templateParams = {
      title: emailData.subject,
      name: emailData.to.split('<')[0].trim(),
      time: new Date().toLocaleString(),
      message: emailData.body,
      email: emailData.to.split('<')[1]?.replace('>', '').trim() || emailData.to
    };

    console.log('Attempting to send email with:', {
      serviceId: 'service_822brma',
      templateId: 'template_drlzuew',
      params: templateParams
    });

    const response = await emailjs.send(
      'service_822brma',
      'template_drlzuew',
      templateParams,
      'T9t0SqwKl2KRez2cI'
    );

    console.log('EmailJS Response:', response);

    if (response.status !== 200) {
      throw new Error(`Failed to send email: ${response.text}`);
    }
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error(error instanceof Error ? error.message : 'Failed to send email. Please try again later.');
  }
};
