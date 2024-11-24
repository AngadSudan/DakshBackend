const {User}=require('../models/User.models')

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
        res.status(200).send("Welcome Aboard Sir");
        
    } catch (error) {
        console.log("An error occured",error);
        res.status(500).send(User)
    }
    
}

async function HandleUserLogin(req,res){
    const {email,password,admin,year}=req.body
    try {
        const LoggedinUser=await User.find({email,password,admin,year}).select('_id admin');
        if(LoggedinUser?.length===0){
            return res.status(202).send('User not found');
        }
        else
        {
            const isidpresent= LoggedinUser[0].id ?true:false;
            if(isidpresent){
                return res.status(200).send({admin:LoggedinUser[0].admin,sessionID:true,user:LoggedinUser[0]._id});
            }
        }
    } catch (error) {
        console.log("An error occured",error);
        res.status(223).send('Internal Error Occured');
    } 
}

async function HandleUserLogout(req,res){
    
}
module.exports={HandleUserSignUp ,HandleUserLogin, HandleUserLogout }