"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var secret = 'f8898b0107aaA9^&(*!@YOUIHASDHJASD518c8aD14e4B61fAa3E1A4EBd8';
var router = (0, express_1.Router)();
var user_controller_1 = require("../controllers/user.controller");
router.post("/user", user_controller_1.register);
router.post("/user/login", user_controller_1.login);
router.post("/addtodo", user_controller_1.checktoken, user_controller_1.addTodo);
router.post("/updatetodo", user_controller_1.checktoken, user_controller_1.updateTodo);
router.post("/deletetodo", user_controller_1.checktoken, user_controller_1.deletetodo);
router.get("/alltodo", user_controller_1.checktoken, user_controller_1.alltodo);
router.post("/todobyid", user_controller_1.checktoken, user_controller_1.idtodo);
router.get("/alluser", user_controller_1.checktoken, user_controller_1.alluser);
router.post("/assignuser", user_controller_1.checktoken, user_controller_1.updateTodoUser);
// router.get("/user/:id", ); 
exports.default = router;
//# sourceMappingURL=user.routes.js.map