const {createUser, getUserById,updateUser, deleteUser,getUsers,login, countEmp, maxSalary,orderExp,getUserByCategory}= require ("./users.controller");
//const { getUserById } = require("./users.service");
const router = require ("express"). Router();
const {checkToken}=require("../../auth/token_validate");
const multer = require('multer');
global.__basedir = __dirname;

var path = require('path');


// this function upload the profile picture
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '/home/nishi/rest api/api/users/uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

const upload = multer({ storage }).single('profile_pic');


router.post('/profile_pic', upload, (req, res) => {
    console.log(req.file) 
    console.log(`file name is ${req.file.originalname} `);
    if(req.file!==undefined){
//audio= req.file;

    res.send({
        //return res.sendFile(path.join(`${__dirname}/uploads/1598713507242${req.file.originalname}`));

        success:"true",
        message:"upload succesfully"
    
    })
}
else{
    res.send({

       // return res.sendFile(path.join(`${__dirname}/../uploads/1598713507242localhost (copy).txt.html`));

        success:"false",
        message:"kindly upload your profile picture"
    
    })

}
    
})


//this will create user profile and send welcome mail
router.post("/", createUser);

// generate your TOKEN using this endpoint
router.post("/login", login);

// after passing a TOKEN access all the below end points functionality

// Access all the employee details
router.get("/", getUsers);

//SEARCH USER by name
router.get("/:name",checkToken,getUserById)

router.get("/category/:title",checkToken,getUserByCategory)

//delete record of user
router.delete("/:id",checkToken, deleteUser);

//update details of user
router.patch("/",checkToken, updateUser);









//router.patch("/:title",checkToken, updateUser);

// total entries available
router.get("/count", checkToken,countEmp);

//employee having max salary
router.get("/max", checkToken, maxSalary);

//display user data in sorted order of its experience year
router.get("/ordered", checkToken,orderExp);


module.exports= router;

/*{
    "fullname":"abc",
    "joinyear":"2000",
    "email":"nishi@gmail.com",
    "package":"345456",
"password":"123"
}*/