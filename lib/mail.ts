import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: 587,
    secure: false,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD
    },
});

export async function sendPasswordResetEmail(email: string, token: string) {
    const confirmLink = `http://${process.env.PRD_URL}/auth/new-password?token=${token}`;
    await transporter.sendMail({
        from: "info@mail.maziyar-isa.ir",
        to: "r6.acc.051@gmail.com",
        subject: "Reset your password",
        html: `<a href="${confirmLink}">Click to reset your password</a>`
    });
};

export async function sendTwoFactorEmail(email: string, token: string) {
    await transporter.sendMail({
        from: "info@mail.maziyar-isa.ir",
        to: "r6.acc.051@gmail.com",
        subject: "Reset your password",
        html: `<p>${token}</p>`
    });
};