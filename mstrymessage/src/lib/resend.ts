import { Resend } from 'resend';
import dotenv from 'dotenv';
dotenv.config();
export const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY || "re_AxWmNrSk_MTyhwMQAw8CeV4gHZ9NgVCki");