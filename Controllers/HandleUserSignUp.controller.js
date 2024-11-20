const {User}=require('../models/User.models')
const {v4: uuidv4}= require('uuid')
async function HandleUserSignUp(req,res){
    const {rollnumber,email,year,password,admin}=req.body;
    try {
        const user= await User.create({
            rollnumber,
            email,
            year,
            password,
            admin
        })
        res.cookie('user', user, {
            httpOnly: true,
            secure: true
        });
        console.log("Successful Signup");
        res.status(200).send("Welcome Aboard Sir");
        
    } catch (error) {
        console.log("An error occured",error);
        res.status(500).send(User)
    }
    
}

async function HandleUserLogin(req,res){
    const {email,password,admin,year}=req.body
    try {
        const LoggedinUser=await User.findOne({email,password,admin,year});
        const sessionId=uuidv4();
        
        if(!LoggedinUser){
            res.status(404).send('User not found');
        }
        else
        {
            // setUser(sessionId,LoggedinUser);
            const cookiedata= res.cookie('uid',sessionId,{
                httpOnly:true,
                secure: true,
            });
            console.log("cookie generated");
            return res.status(200).send({success : true, token:cookiedata});
            console.log("check3");
        }
    } catch (error) {
        res.status(404).send('User not found');
    } 
}

async function HandleUserLogout(req,res){
    
}
module.exports={HandleUserSignUp ,HandleUserLogin, HandleUserLogout }