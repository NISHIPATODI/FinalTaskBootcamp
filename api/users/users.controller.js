const {create, getUserById, getUserByCategory,getUsers, deleteUser, updateUser,getUserByEmail, countEmp, maxSalary,orderExp}= require ("./users.service")
const {genSaltSync , hashSync, compareSync}= require("bcrypt");
const {sign}= require("jsonwebtoken")
//const multer = require('multer');

module.exports ={

    createUser:(req,res)=>{

        const body = req.body;
        //const salt = genSaltSync(3);
        //body.password= hashSync(body.password, salt)
    create(body, (err , results)=>{
        if(err){
            console.log(err);
            return res.status(500).json({
                success:0,
                message: "database connection error"
            });
        }
        return res.status(200).json(
            {
                success:1,
                data: results,
                mailsent: "true"
            }
        )
    })
    
    },


    getUserById:(req, res)=>{
        const name =  req.params.name;
        getUserById(name, (err,results)=>{
            if(err){
                console.log(err);
                return;
            }
            if(!results)
{            return res.json(
                {
                    success:0,
                    message:"record not found"
                }
            )
}

return res.json({
    success:1,
    data:results
})
       
        })

    },

    getUserByCategory:(req, res)=>{
        console.log("by category");
        
        const name =  req.params.title;
        console.log(name);
        getUserByCategory(name, (err,results)=>{
            if(err){
                console.log(err);
                return;
            }
            if(!results)
{            return res.json(
                {
                    success:0,
                    message:"record not found"
                }
            )
}

return res.json({
    success:1,
    data:results
})
       
        })

    },

    
    updateUser:(req,res)=>{
       // const body =  req.params.id;
        
        const body = req.body;
        updateUser(body,(err,results)=>{
            if(err){
                console.log(err);
                return;
            
        } 
        return res.json({
            success:1,
            message:"update Successfully" 
        })
        
        })

    },
    deleteUser:(req,res)=>{
        const data =  req.params.id;
        
        //const data = req.body;
        deleteUser(data,(err,results)=>{
            if(err){
                console.log(err);
                return;
            
        } 
        if(!results){
            return res.json({
                success:0,
                message:"succesfully delete"
            })
        }
        return res.json({
            success:1,
            message:"update Succesfully" 
        })
        
        })


    },
    login:(req,res)=>{
        const body = req.body;
        getUserByEmail(body.email,(err,results)=>{
            if(err){
                console.log(err);
                return;
            
        } 
        if(!results){
            return res.json(
                {
                    success:0,
                    message:"invalid email or password"
                }
            )
        };
           // const result = compareSync(body.password, results.password)
            var string1 = body.password;
            var string2 = results.password;
            var result2 = string1.localeCompare(string2);

           // console.log(body.password+" resutlt password"+results.password+"result2  "+result2)
            if(result2==0){
            if(results){
                results.password= undefined;
                const jsontoken=sign({result:results},"que123", {expiresIn:"1h"})
          return res.json({
              success:1,
              message:"login succesfully",
              token:jsontoken
          })
        
            }
            else{
                return res.json(
                    {
                        success:0,
                        message:"invalid email or password"
                    }
                )
               
            }
        }

        else{
            return res.json(
                {
                    success:0,
                    message:"invalid email or password"
                }
            )
           
        }
    
        
        });
        
        
            },
        
    getUsers:(req,res)=>{
        console.log("in get Users body")
       // const data = req.body;
        getUsers((err,results)=>{
            if(err){
                console.log(err);
                return;
            
        } 
        return res.json({
            success:1,
         data: results 
        })
        
        })


    },
    
    countEmp:(req,res)=>{
        console.log("in get  count emp Users body")
       // const data = req.body;
       countEmp((err,results)=>{
            if(err){
                console.log(err);
                return;
            
        } 
        console.log(results)
       
        return res.json({
            success:1,
         total_workers: results
        })
        
        })


    },
    
    maxSalary:(req,res)=>{
         maxSalary((err,results)=>{
            if(err){
                console.log(err);
                return;
            
        } 
        console.log(results)
       
        return res.json({
            success:1,
         MAX_salary: results
        })
        
        })


    },
    
    orderExp:(req,res)=>{
        orderExp((err,results)=>{
           if(err){
               console.log(err);
               return;
           
       } 
       console.log(results)
      
       return res.json({
           success:1,
        sorted_by_maxExperience : results
       })
       
       })


   },
  
  
   
}