const sgMail=require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)


const welcomemail=async(email,name,otp)=>{
    try{
        await sgMail.send({
            to:email,
            from:'aagrawal1@student.nitw.ac.in',
            subject:'Account Verification!',
            text:`Welcome to the app,${name}.
            OTP is ${otp}`,
        })
    }catch(e){
        console.log('error');
    }
}
module.exports={
    welcomemail,
}