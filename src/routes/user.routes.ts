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

router.post("/SiGN-UP", register);
router.post("/SIGN-IN", login);

router.post("/ADD-TO-DO",checktoken,addTodo);
router.post("/UPDATE-TO-DO",checktoken,updateTodo);
router.post("/REMOVE-TO-DO",checktoken,deletetodo);
router.get("/GET-ALL-TO-DO",checktoken,alltodo);
router.post("/GET-TO-DO-BY-ID",checktoken,idtodo);

router.get("/GET-ALL-USER",checktoken,alluser);
router.post("/ASSIGN-TO-DO",checktoken, updateTodoUser);

// router.get("/user/:id", ); 

export default router
