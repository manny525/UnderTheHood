const sgMail=require('@sendgrid/mail')

sgMail.setApiKey(process.env.sendgridapi)


const welcomemail=async(email,name)=>{
    try{
        await sgMail.send({
            to:email,
            from:'aagrawal1@student.nitw.ac.in',
            subject:'Email Verification!',
            text:`Welcome to the app,${name}.`,
            //Give Html Link for verification
            // html:"<a href=''> Link </a> <script src='./../utils/js/email.js'> </script> ",
        })
    }catch(e){
        console.log('error');
    }
}
module.exports={
    welcomemail,
}