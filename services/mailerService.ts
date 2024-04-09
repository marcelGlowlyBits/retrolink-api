import { transporter } from '../datasources/mailer';


export const mailerService = {
  sendWelcome: (email: string) =>  {
      const mailOptions = {
          from: process.env.NODEMAILER_FROM,
          to: email,
          subject: "Hello from Retrolink",
          text: "This is a test email sent using Retrolink backend api.",
        };
      
      transporter.sendMail(mailOptions, (error: any, info: any) => {
          if (error) {
            console.error("Error sending email: ", error);
          } else {
            console.log("Email sent: ", info.response);
          }
        });
  }
}