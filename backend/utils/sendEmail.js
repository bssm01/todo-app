import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host:process.env.SMTP_HOST,
    port:process.env.SMTP_PORT,
    auth:{
        user:process.env.SMTP_USER,
        pass:process.env.SMTP_PASS
    },
})

export const sendEmail= async(to , subject , text)=>{
await transporter.sendMail({
    from:process.env.EMAIL_FROM,
    to,
    subject,
    text,
})
}