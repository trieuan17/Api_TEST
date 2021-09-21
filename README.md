# Api_TEST

Chạy dự án : npm start

Mysql :

    "host": "localhost",
    "port": 3306,
    "username": "root",
    "password": "",
    "database": "testdatabase",
    
Tên Database:   testdatabase


Table database:



user :
    id : number
    
    username: String,
    
    fullname: String,
    
    password: String
    
    
token:

    id: number,
    
    DateCreate: Date,
    
    token:String,
    
    userId:number
    
    
todo:

    id: number,
    
    Name: String,
    
    Description: String,
    
    DateCompletion:Date,
    
    Datemodification: Date,
    
    status : number // 0 là New khác 0 là Complete
    
    UserId : number,
    
    DateCreation:date
    
    
    API
    
    1. Paramsters: Username , fullname, password
    
    2. Paramsters: username, password
    
    3. Paramsters: token ,Name, Decription, DateCompletion, Datemodification
    
    4. Paramsters: token, Name, Decription, DateCompletion, Datemodification, status // 0 New khác 0 Complete
    
    5. Paramsters: token, idTodo
    
    6. Paramsters : token
    
    7.  Paramsters: token, idTodo
    
    8. Paramsters: token
    
    9. Paramsters: token, iduser
