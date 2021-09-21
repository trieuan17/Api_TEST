import {Request, Response,NextFunction, request} from "express";
import * as bodyParser from  "body-parser";
import {User} from "../entity/User";
import {Any, Check, getRepository} from "typeorm";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import { isWeakSet } from "util/types";
import { decode } from "punycode";
import {Token} from "../entity/token";
import { TODO } from "../entity/TO-DO";



var secret='f8898b0107aaA9^&(*!@YOUIHASDHJASD518c8aD14e4B61fAa3E1A4EBd8';

declare global {
     namespace Express {
         interface Request {
             user? : Record<string,any>
         }
     }
 }


export const register = async (req:Request, res:Response)=>{
   if(req.body.username==null || req.body.fullname == null || req.body.password == null){
     res.json({"result":0, "errMsg":"Thiếu Parameters"});
   }
   else{
     try{
     const salt = await bcrypt.genSalt(10);
     const hashPassword = await bcrypt.hash(req.body.password,salt);
    const userRepo = getRepository(User);
    await userRepo.findOne({username: req.body.username}).catch((err)=>{
     res.json({"result":0, "errMsg":" Server Error!"});
    })
    .then(async function(user){
        if(!user){
             
          const user = userRepo.create({
                        username : req.body.username,
                        fullname: req.body.fullname,
                        password: hashPassword
                   })
                   await userRepo.save(user).catch((err) =>{
                         console.log("Error: ", err);
                        })
                        res.json({"result":1, "errMsg": "đăng ký tài khoản thành công"});
        }
        else{
          res.json({"result":0, "errMsg": "username đã  tồn tại"});
        }
    })
     }
     catch{
          res.json({"result":0, "errMsg": "Đăng ký thất bại vui lòng thử lại"});
     }
   }

}
export const login = async (req:Request, res:Response) =>{
       
     if(!req.body.username || !req.body.password){
          res.json({result:0, errMsg: "Thiếu username hoặc password"});
      }else{
          const userRepo = getRepository(User);
           userRepo.findOne({username:req.body.username}).then(function(item){
               if(!item){
                    res.json({result:0, errMsg:"tài khoản chưa đăng ký."});
               }
               else{
                 
                    bcrypt.compare(req.body.password,item.password,async function(err,resb){
                         if(err || resb === false){
                              res.json({result:0, errMsg:"Sai mật khẩu."});
                          }else{
                              item.password = "không hiện thị đâu!!!!";
                                   jwt.sign({
                                        exp: Math.floor(Date.now() / 1000) + (60 * 60 * 60 * 60 * 60),
                                        data: item
                                   },secret,(err:any, tokent:any)=>{
                                        if(err){
                                             res.json({result:0, errMsg: "Lỗi tạo Token!"});
                                        }
                                        else{
                                             console.log(secret)
                                             const tokenRepo = getRepository(Token);
                                             const token = tokenRepo.create({
                                                 
                                                  token: tokent,
                                                  userid: item.id
                                             })
                                              tokenRepo.save(token).then(function(data){
                                                  res.json({result:1, errMsg: data});
                                              }).catch(function(err){
                                                  res.json({result:0, errMsg: err});
                                              })
                                             
                                        }
                                   })
                         }
                    })
                         
                    
               }
           }).catch(function(err){
               res.json({result:0, errMsg:"tài khoản chưa đăng ký."});
           })
           
           
          
      }
     
}
export const checktoken = async function(req:Request, res:Response, next:NextFunction){
     if(!req.body.token){
          
        res.json({result:0, errMsg:"Bạn chưa login"});
     }
     else{
          var token = req.body.token;
          const TokenRepo = getRepository(Token);
          TokenRepo.findOne({token:token}).then(function(item){
              if(!item){
               res.json({result:0, errMsg:"vui lòng đăng nhập"});
              }
              else{
               jwt.verify(item.token,secret,function(err:any,data:any){
                    if(err){
                         res.json({result:0, errMsg:"Token không còn hiệu lực"});
                    }
                    else{
                         
                        
                         const idUser = data.data.id;
                        req.user = idUser;
                        next();
                        
                    }
               })
              }
             
          }).catch(function(err){
               res.json({result:0, errMsg:"vui lòng đăng nhập"});
          })
         
         
     }
  
   
}
export const addTodo =  async function (req:Request, res:Response, next:NextFunction) {
   
          const todoRepo = getRepository(TODO);
          const todo = todoRepo.create({
               Name:req.body.Name,
               Description:req.body.Description,
               DateCompletion:req.body.DateCompletion,
               DateCreation: Date.now(),
               Datemodification:req.body.Datemodification,
               status:0, // false new true Complete
               UserId:req.body.idUser
             
          }) 
          await todoRepo.save(todo).then(function(datatodo){
               res.json({"result":0, data:datatodo});
          }).catch(function(err){
               res.json({"result":0, "errMsg":" save is failse "});
          })
     

}

export const updateTodo =  async function (req:Request, res:Response, next:NextFunction) {
   
     const todoRepo = getRepository(TODO);
     
     const idTodo = req.body.idTodo;
     todoRepo.findOne({id:idTodo}).then(async function(todo){
          if(!todo){
               res.json({"result":0,errMsg:"Todo không tồn tại"})
          }
          else{
               if(todo.status !== 0){
                    res.json({"result":0,errMsg:"cập nhật không thành công do trạng thái là COMPLETE"})
               }
               else{
                   
                   await todoRepo.createQueryBuilder().update(todo).set({
                    Name:req.body.Name,
                    Description:req.body.Description,
                    DateCompletion:req.body.DateCompletion,
                   
                    Datemodification:req.body.Datemodification,
                    status:req.body.status // 0 new 1 Complete
                    
                   }).where("id = :id",{id:todo.id})
                   .execute().then(function(data){
                        res.json({"result":0,errMsg:"Update thành công"})
                   }).catch(function(err){
                        res.json({"result":0,errMsg:"cập nhật không thành công!!"})
                   })
               }
          }
     }).catch(function(err){
          res.json({"result":0,errMsg:err})
     })


}

export const deletetodo =  async function (req:Request, res:Response, next:NextFunction) {
   
     const todoRepo = getRepository(TODO);
     
     const idTodo = req.body.idTodo;
     todoRepo.findOne({id:idTodo}).then(async function(todo){
          if(!todo){
               res.json({"result":0,errMsg:"Todo không tồn tại"})
          }
          else{
               if(todo.status !== 0){
                    res.json({"result":0,errMsg:"Xóa  không thành công do trạng thái là COMPLETE"})
               }
               else{
                   todoRepo.delete({id:todo.id}).then(function(data){
                    res.json({"result":1,errMsg:"đã xóa"})
                   }).catch(function(err){
                    res.json({"result":0,errMsg:" xóa thất bại"})
                   })
                 
               }
          }
     }).catch(function(err){
          res.json({"result":0,errMsg:err})
     })


}

export const alltodo =  async function (req:Request, res:Response, next:NextFunction) {
   
     const todoRepo = getRepository(TODO);
     
          todoRepo.find().then(function(data){
               res.json({"result":1,data:data})
          }).catch(function(err){
               res.json({"result":0,err:err})
          })


}

export const idtodo =  async function (req:Request, res:Response, next:NextFunction) {
   
     const todoRepo = getRepository(TODO);
     
     const idTodo = req.body.idTodo;
     todoRepo.findOne({id:idTodo}).then(async function(todo){
          if(!todo){
               res.json({"result":0,errMsg:"Todo không tồn tại"})
          }
          else{
               res.json({"result":1,data:todo})
          }
     }).catch(function(err){
          res.json({"result":0,errMsg:err})
     })


}

export const alluser =  async function (req:Request, res:Response, next:NextFunction) {
   
     const userRepo = getRepository(User);
     
    userRepo.find().then(function(data){
         res.json({"result":1,data:data})
    }).catch(function(err){
     res.json({"result":0,err:err})
    })


}

export const updateTodoUser =  async function (req:Request, res:Response, next:NextFunction) {
     
     const idUserup = parseInt(req.body.iduser) ;
     const userRepo = getRepository(User);

     const iduserjw =req.user ;
     await userRepo.findOne(iduserjw).then(function(data){
          if(!data){
               res.json({"result":0,errMsg:"Không thành công"})
          }
          else{
               if(idUserup === data.id){
                    res.json({"result":0,errMsg:"Không thể assign cho chính mình"})
               }
               else{
                    const todoRepo = getRepository(TODO);
               
                    const idTodo = req.body.idTodo;
                    todoRepo.findOne({id:idTodo}).then(async function(todo){
                         if(!todo){
                              res.json({"result":0,errMsg:"Todo không tồn tại"})
                         }
                         else{
                              if(todo.status !== 0){
                                   res.json({"result":0,errMsg:"cập nhật không thành công do trạng thái là COMPLETE"})
                              }
                              else{
                                  
                                  await todoRepo.createQueryBuilder().update(todo).set({
                                
                                   UserId:idUserup
                                  }).where("id = :id",{id:todo.id})
                                  .execute().then(function(data){
                                       res.json({"result":0,errMsg:"Update thành công"})
                                  }).catch(function(err){
                                       res.json({"result":0,errMsg:"cập nhật không thành công!!"})
                                  })
                              }
                         }
                    }).catch(function(err){
                         res.json({"result":0,errMsg:err})
                    })
               
               }
          }
     }).catch(function(err){
          res.json({"result":0,errMsg:err})
     })
     
   

     


}
