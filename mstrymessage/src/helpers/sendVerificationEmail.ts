import { resend } from "@/lib/resend";
import VerificationEmail from "@/emails/VerifiactionEmail";
import { ApiResponse } from "@/types/ApiResponse";

export async function sendVerificationEmail(
    username:string,
    verifyCode: string,
    email:string): Promise<ApiResponse>{
    
        try {
            await resend.emails.send({
                from:"onboarding@resend.dev",
                to: email,
                subject: "Verify your email",
                react: VerificationEmail({username, otp: verifyCode})
            })
            return {success: true, message: "Verification email send successfully"};
        } catch (error) {
            console.error("Error sending email", error)
            return {success: false, message: "Error sending email"}
        }
    
}