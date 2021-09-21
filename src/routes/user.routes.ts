import { Router } from "express";
import {Request, Response,NextFunction} from "express";
import * as bodyParser from  "body-parser";
import {User} from "../entity/User";
import {Any, Check, getRepository} from "typeorm";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import { isWeakSet } from "util/types";
import { decode } from "punycode";
import {Token} from "../entity/token";
var secret='f8898b0107aaA9^&(*!@YOUIHASDHJASD518c8aD14e4B61fAa3E1A4EBd8';
const router = Router();
import {register, login,checktoken,addTodo,updateTodo,alltodo,deletetodo,idtodo,alluser, updateTodoUser} from "../controllers/user.controller"

router.post("/user", register);
router.post("/user/login", login);

router.post("/addtodo",checktoken,addTodo);
router.post("/updatetodo",checktoken,updateTodo);
router.post("/deletetodo",checktoken,deletetodo);
router.get("/alltodo",checktoken,alltodo);
router.post("/todobyid",checktoken,idtodo);

router.get("/alluser",checktoken,alluser);
router.post("/assignuser",checktoken, updateTodoUser);

// router.get("/user/:id", ); 

export default router