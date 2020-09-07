const {verify}= require("jsonwebtoken")

module.exports={
    checkToken:(req,res,next)=>{
        //const token =req.get
let token = req.get("authorization");
if(token){
    //console .log("move to next body")
    
token = token.slice(7)
verify(token,"que123",(err,decoded)=>{
    if(err){
        res.json({
            success:0,
            message:"invalid token"
        })
    }
    else{
        //console .log("move to next1 body")
    
        next();
    }


   })
}
else{
    console .log("not running")
    res.json({
        success:0,
        message:"access denied, token not found"
    })
}
    }
}