import sgMail from "@sendgrid/mail";

export default class EmailService {
  async sendMail(
    to: string[],
    subject: string,
    message: string,
    cc?: string[]
  ): Promise<void> {
    sgMail.setApiKey(<string>process.env.SENDGRID_API_KEY);
    const msg = {
      to, // Change to your recipient
      from: "smartpos14@gmail.com", // Change to your verified sender
      subject,
      cc,
      html: `<h3>${message}</div>`,
    };
    sgMail
      .send(msg)
      .then(() => {
        console.log("Email sent");
      })
      .catch((error) => {
        console.error(error);
      });
  }
}
