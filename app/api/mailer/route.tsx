import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer'

export async function POST(request: Request) {
    try {
        const data = await request.json();

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'arunm2020@psnacet.edu.in',
                pass: process.env.MAILER_PASSWORD,
            }
        })

        const mailOptions = {
            from: 'Promotector@gmail.com',
            to: 'arunm2020@psnacet.edu.in',
            subject: 'Report of Fake Content: Urgent Action Required',
            html: `
            <p>I hope this message finds you well. I am reaching out to report a concerning issue regarding a fake promotion that has been circulating on your platform. Upon careful observation, it has come to my attention that there is a promotion being advertised that appears to be misleading and potentially harmful to your users.
            I have attached the link of the fake content Link:<strong>${data.link}</strong>.
            Thank you for your commitment to maintaining a safe and trustworthy environment for all users.
            </p>
           <br>
           <p> 
            Sincerely,
            <br>
            Promotector,
            <br>
            promotector@gmail.com,
            </p> `
        }

        await transporter.sendMail(mailOptions)

        return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: 'failed to send' }, { status: 500 })

    }
}