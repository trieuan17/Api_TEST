"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTodoUser = exports.alluser = exports.idtodo = exports.alltodo = exports.deletetodo = exports.updateTodo = exports.addTodo = exports.checktoken = exports.login = exports.register = void 0;
var User_1 = require("../entity/User");
var typeorm_1 = require("typeorm");
var bcrypt_1 = __importDefault(require("bcrypt"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var token_1 = require("../entity/token");
var TO_DO_1 = require("../entity/TO-DO");
var secret = 'f8898b0107aaA9^&(*!@YOUIHASDHJASD518c8aD14e4B61fAa3E1A4EBd8';
var register = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var salt, hashPassword_1, userRepo_1, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                if (!(req.body.username == null || req.body.fullname == null || req.body.password == null)) return [3 /*break*/, 1];
                res.json({ "result": 0, "errMsg": "Thiếu Parameters" });
                return [3 /*break*/, 6];
            case 1:
                _b.trys.push([1, 5, , 6]);
                return [4 /*yield*/, bcrypt_1.default.genSalt(10)];
            case 2:
                salt = _b.sent();
                return [4 /*yield*/, bcrypt_1.default.hash(req.body.password, salt)];
            case 3:
                hashPassword_1 = _b.sent();
                userRepo_1 = (0, typeorm_1.getRepository)(User_1.User);
                return [4 /*yield*/, userRepo_1.findOne({ username: req.body.username }).catch(function (err) {
                        res.json({ "result": 0, "errMsg": " Server Error!" });
                    })
                        .then(function (user) {
                        return __awaiter(this, void 0, void 0, function () {
                            var user_1;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (!!user) return [3 /*break*/, 2];
                                        user_1 = userRepo_1.create({
                                            username: req.body.username,
                                            fullname: req.body.fullname,
                                            password: hashPassword_1
                                        });
                                        return [4 /*yield*/, userRepo_1.save(user_1).catch(function (err) {
                                                console.log("Error: ", err);
                                            })];
                                    case 1:
                                        _a.sent();
                                        res.json({ "result": 1, "errMsg": "đăng ký tài khoản thành công" });
                                        return [3 /*break*/, 3];
                                    case 2:
                                        res.json({ "result": 0, "errMsg": "username đã  tồn tại" });
                                        _a.label = 3;
                                    case 3: return [2 /*return*/];
                                }
                            });
                        });
                    })];
            case 4:
                _b.sent();
                return [3 /*break*/, 6];
            case 5:
                _a = _b.sent();
                res.json({ "result": 0, "errMsg": "Đăng ký thất bại vui lòng thử lại" });
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.register = register;
var login = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userRepo;
    return __generator(this, function (_a) {
        if (!req.body.username || !req.body.password) {
            res.json({ result: 0, errMsg: "Thiếu username hoặc password" });
        }
        else {
            userRepo = (0, typeorm_1.getRepository)(User_1.User);
            userRepo.findOne({ username: req.body.username }).then(function (item) {
                if (!item) {
                    res.json({ result: 0, errMsg: "tài khoản chưa đăng ký." });
                }
                else {
                    bcrypt_1.default.compare(req.body.password, item.password, function (err, resb) {
                        return __awaiter(this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                if (err || resb === false) {
                                    res.json({ result: 0, errMsg: "Sai mật khẩu." });
                                }
                                else {
                                    item.password = "không hiện thị đâu!!!!";
                                    jsonwebtoken_1.default.sign({
                                        exp: Math.floor(Date.now() / 1000) + (60 * 60 * 60 * 60 * 60),
                                        data: item
                                    }, secret, function (err, tokent) {
                                        if (err) {
                                            res.json({ result: 0, errMsg: "Lỗi tạo Token!" });
                                        }
                                        else {
                                            console.log(secret);
                                            var tokenRepo = (0, typeorm_1.getRepository)(token_1.Token);
                                            var token = tokenRepo.create({
                                                token: tokent,
                                                userid: item.id
                                            });
                                            tokenRepo.save(token).then(function (data) {
                                                res.json({ result: 1, errMsg: data });
                                            }).catch(function (err) {
                                                res.json({ result: 0, errMsg: err });
                                            });
                                        }
                                    });
                                }
                                return [2 /*return*/];
                            });
                        });
                    });
                }
            }).catch(function (err) {
                res.json({ result: 0, errMsg: "tài khoản chưa đăng ký." });
            });
        }
        return [2 /*return*/];
    });
}); };
exports.login = login;
var checktoken = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var token, TokenRepo;
        return __generator(this, function (_a) {
            if (!req.body.token) {
                res.json({ result: 0, errMsg: "Bạn chưa login" });
            }
            else {
                token = req.body.token;
                TokenRepo = (0, typeorm_1.getRepository)(token_1.Token);
                TokenRepo.findOne({ token: token }).then(function (item) {
                    if (!item) {
                        res.json({ result: 0, errMsg: "vui lòng đăng nhập" });
                    }
                    else {
                        jsonwebtoken_1.default.verify(item.token, secret, function (err, data) {
                            if (err) {
                                res.json({ result: 0, errMsg: "Token không còn hiệu lực" });
                            }
                            else {
                                var idUser = data.data.id;
                                req.user = idUser;
                                next();
                            }
                        });
                    }
                }).catch(function (err) {
                    res.json({ result: 0, errMsg: "vui lòng đăng nhập" });
                });
            }
            return [2 /*return*/];
        });
    });
};
exports.checktoken = checktoken;
var addTodo = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var todoRepo, todo;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    todoRepo = (0, typeorm_1.getRepository)(TO_DO_1.TODO);
                    todo = todoRepo.create({
                        Name: req.body.Name,
                        Description: req.body.Description,
                        DateCompletion: req.body.DateCompletion,
                        DateCreation: Date.now(),
                        Datemodification: req.body.Datemodification,
                        status: 0,
                        UserId: req.body.idUser
                    });
                    return [4 /*yield*/, todoRepo.save(todo).then(function (datatodo) {
                            res.json({ "result": 0, data: datatodo });
                        }).catch(function (err) {
                            res.json({ "result": 0, "errMsg": " save is failse " });
                        })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
};
exports.addTodo = addTodo;
var updateTodo = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var todoRepo, idTodo;
        return __generator(this, function (_a) {
            todoRepo = (0, typeorm_1.getRepository)(TO_DO_1.TODO);
            idTodo = req.body.idTodo;
            todoRepo.findOne({ id: idTodo }).then(function (todo) {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!!todo) return [3 /*break*/, 1];
                                res.json({ "result": 0, errMsg: "Todo không tồn tại" });
                                return [3 /*break*/, 4];
                            case 1:
                                if (!(todo.status !== 0)) return [3 /*break*/, 2];
                                res.json({ "result": 0, errMsg: "cập nhật không thành công do trạng thái là COMPLETE" });
                                return [3 /*break*/, 4];
                            case 2: return [4 /*yield*/, todoRepo.createQueryBuilder().update(todo).set({
                                    Name: req.body.Name,
                                    Description: req.body.Description,
                                    DateCompletion: req.body.DateCompletion,
                                    Datemodification: req.body.Datemodification,
                                    status: req.body.status // 0 new 1 Complete
                                }).where("id = :id", { id: todo.id })
                                    .execute().then(function (data) {
                                    res.json({ "result": 0, errMsg: "Update thành công" });
                                }).catch(function (err) {
                                    res.json({ "result": 0, errMsg: "cập nhật không thành công!!" });
                                })];
                            case 3:
                                _a.sent();
                                _a.label = 4;
                            case 4: return [2 /*return*/];
                        }
                    });
                });
            }).catch(function (err) {
                res.json({ "result": 0, errMsg: err });
            });
            return [2 /*return*/];
        });
    });
};
exports.updateTodo = updateTodo;
var deletetodo = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var todoRepo, idTodo;
        return __generator(this, function (_a) {
            todoRepo = (0, typeorm_1.getRepository)(TO_DO_1.TODO);
            idTodo = req.body.idTodo;
            todoRepo.findOne({ id: idTodo }).then(function (todo) {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        if (!todo) {
                            res.json({ "result": 0, errMsg: "Todo không tồn tại" });
                        }
                        else {
                            if (todo.status !== 0) {
                                res.json({ "result": 0, errMsg: "Xóa  không thành công do trạng thái là COMPLETE" });
                            }
                            else {
                                todoRepo.delete({ id: todo.id }).then(function (data) {
                                    res.json({ "result": 1, errMsg: "đã xóa" });
                                }).catch(function (err) {
                                    res.json({ "result": 0, errMsg: " xóa thất bại" });
                                });
                            }
                        }
                        return [2 /*return*/];
                    });
                });
            }).catch(function (err) {
                res.json({ "result": 0, errMsg: err });
            });
            return [2 /*return*/];
        });
    });
};
exports.deletetodo = deletetodo;
var alltodo = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var todoRepo;
        return __generator(this, function (_a) {
            todoRepo = (0, typeorm_1.getRepository)(TO_DO_1.TODO);
            todoRepo.find().then(function (data) {
                res.json({ "result": 1, data: data });
            }).catch(function (err) {
                res.json({ "result": 0, err: err });
            });
            return [2 /*return*/];
        });
    });
};
exports.alltodo = alltodo;
var idtodo = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var todoRepo, idTodo;
        return __generator(this, function (_a) {
            todoRepo = (0, typeorm_1.getRepository)(TO_DO_1.TODO);
            idTodo = req.body.idTodo;
            todoRepo.findOne({ id: idTodo }).then(function (todo) {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        if (!todo) {
                            res.json({ "result": 0, errMsg: "Todo không tồn tại" });
                        }
                        else {
                            res.json({ "result": 1, data: todo });
                        }
                        return [2 /*return*/];
                    });
                });
            }).catch(function (err) {
                res.json({ "result": 0, errMsg: err });
            });
            return [2 /*return*/];
        });
    });
};
exports.idtodo = idtodo;
var alluser = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var userRepo;
        return __generator(this, function (_a) {
            userRepo = (0, typeorm_1.getRepository)(User_1.User);
            userRepo.find().then(function (data) {
                res.json({ "result": 1, data: data });
            }).catch(function (err) {
                res.json({ "result": 0, err: err });
            });
            return [2 /*return*/];
        });
    });
};
exports.alluser = alluser;
var updateTodoUser = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var idUserup, userRepo, iduserjw;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    idUserup = parseInt(req.body.iduser);
                    userRepo = (0, typeorm_1.getRepository)(User_1.User);
                    iduserjw = req.user;
                    return [4 /*yield*/, userRepo.findOne(iduserjw).then(function (data) {
                            if (!data) {
                                res.json({ "result": 0, errMsg: "Không thành công" });
                            }
                            else {
                                if (idUserup === data.id) {
                                    res.json({ "result": 0, errMsg: "Không thể assign cho chính mình" });
                                }
                                else {
                                    var todoRepo_1 = (0, typeorm_1.getRepository)(TO_DO_1.TODO);
                                    var idTodo = req.body.idTodo;
                                    todoRepo_1.findOne({ id: idTodo }).then(function (todo) {
                                        return __awaiter(this, void 0, void 0, function () {
                                            return __generator(this, function (_a) {
                                                switch (_a.label) {
                                                    case 0:
                                                        if (!!todo) return [3 /*break*/, 1];
                                                        res.json({ "result": 0, errMsg: "Todo không tồn tại" });
                                                        return [3 /*break*/, 4];
                                                    case 1:
                                                        if (!(todo.status !== 0)) return [3 /*break*/, 2];
                                                        res.json({ "result": 0, errMsg: "cập nhật không thành công do trạng thái là COMPLETE" });
                                                        return [3 /*break*/, 4];
                                                    case 2: return [4 /*yield*/, todoRepo_1.createQueryBuilder().update(todo).set({
                                                            UserId: idUserup
                                                        }).where("id = :id", { id: todo.id })
                                                            .execute().then(function (data) {
                                                            res.json({ "result": 0, errMsg: "Update thành công" });
                                                        }).catch(function (err) {
                                                            res.json({ "result": 0, errMsg: "cập nhật không thành công!!" });
                                                        })];
                                                    case 3:
                                                        _a.sent();
                                                        _a.label = 4;
                                                    case 4: return [2 /*return*/];
                                                }
                                            });
                                        });
                                    }).catch(function (err) {
                                        res.json({ "result": 0, errMsg: err });
                                    });
                                }
                            }
                        }).catch(function (err) {
                            res.json({ "result": 0, errMsg: err });
                        })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
};
exports.updateTodoUser = updateTodoUser;
//# sourceMappingURL=user.controller.js.map