const pool =require('../../config/database');
var nodemailer = require('nodemailer'); 
var nodemailer = require('nodemailer');


module.exports={

//As user signup it recieves welcome EMAIL
    create:(data, callback)=>{
        pool.query(
`insert into registration (fullname,jobtitle,joinYear, email, password, package ) values(?,?,?,?,?,?)`,
[
    data.fullname,data.jobtitle,data.joinyear, data.email, data.password, data.package
],
(error ,results, fields)=>{
    if(error){
        console.log("fail at users.service");
        return callback(error);

    }
    let mail= data.email;// email id is fetch from database then mail send to user as they complete signup
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'nishi.patodi@gmail.com',
          pass: "Mypwd"
        }
      });
      
      var mailOptions = {
        from: 'nishi.patodi@gmail.com',
        to: "pawan.patodi@gmail.com",
        subject: 'Sending Email using Node.js',
        text: `hello ${data.fullname}, welcome to our channel`
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
      
    return callback(null, results);
}

        );
    },



getUsers:(callback)=>{
    console.log("in getusers body og users.service")
    pool.query(`select * from registration `,[], 
    (error, results, fields)=>{
        if(error){
            callback(error);
        }
        return callback(null, results)
    })
},
    getUserById:(name,callback)=>{
        pool.query(`select * from registration where fullname=?`,[name], 
        (error, results, fields)=>{
            if(error){
                callback(error);
            }
            return callback(null, results[0])
        })
    },

    getUserByCategory:(name,callback)=>{
        console.log(name);
        pool.query(`select * from registration where jobtitle=?`,[name], 
        (error, results, fields)=>{
            if(error){
                callback(error);
            }
            return callback(null, results)
        })
    },
    updateUser:(data,callback)=>{
        //gender=?, email=?, password=?, number=?
        pool.query(
            `update registration set  jobtitle=? where fullname=?`,
            [
               data.jobtitle,data.fullname
            ],
            (error ,results, fields)=>{
                if(error){
                    //console.log("fail at users.service");
                    return callback(error);
            
                }
                return callback(null, results[0]);
            }
            
                    );
                },
  deleteUser:(data,callback)=>{
                    pool.query(
                        `delete from registration where id=?`,
                        [
                           data
                        ],
                        (error ,results, fields)=>{
                            if(error){
                                console.log("fail at users.service");
                                return callback(error);
                        
                            }
                            return callback(null, results[0]);
                        }
                        
                                );
                            },
 getUserByEmail:(email,callback)=>{
                                pool.query(`select * from registration where email=?`,[email], 
                                (error, results, fields)=>{
                                    if(error){
                                        callback(error);
                                    }
                                    return callback(null, results[0])
                                })
                            },
                            countEmp:(callback)=>{
                               // console.log("in getusers body og users.service")
                                pool.query(`select count(id) from registration `,[], 
                                (error, results, fields)=>{
                                    if(error){
                                        callback(error);
                                    }
                                    return callback(null, results)
                                })
                            },
                            maxSalary:(callback)=>{
                                // console.log("in getusers body og users.service")
                                 pool.query(`select fullname, package from registration where package in (select max(package) from registration)  `,[], 
                                 (error, results, fields)=>{
                                     if(error){
                                         callback(error);
                                     }
                                     return callback(null, results)
                                 })
                             },
                             orderExp:(callback)=>{
                                // console.log("in getusers body og users.service")
                                 pool.query(`select * from registration order by joinYear  `,[], 
                                 (error, results, fields)=>{
                                     if(error){
                                         callback(error);
                                     }
                                     return callback(null, results)
                                 })
                             },
                                 
                                                                  
                }
               
            
