const express=require("express");
const router=express.Router();
const auth=require("../middleware/auth");
const user=require("../controllers/user");
router.post("/signup",user.Signup);
router.post("/login",user.Login);
router.get("/hello",user.hello);
router.get("/allusers",auth,user.getAllUsers);
router.put("/users/:userId",user.UpdateProfile);
module.exports=router;