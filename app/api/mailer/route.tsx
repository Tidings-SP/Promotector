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
            <p>I hope this email finds you well. I am writing to bring to your attention a concerning issue regarding a video/reel uploaded on your platform. Upon careful observation, it has come to my attention that the content in question appears to be fake and potentially harmful.
            The dissemination of misinformation poses a significant threat to the integrity of your platform and its users. As a responsible member of your community, I urge you to take swift action to remove this content and investigate its origins to prevent further dissemination of misleading information.
            I have attached the link of the reel of the fake content Link:<strong>${data.link}</strong>.
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