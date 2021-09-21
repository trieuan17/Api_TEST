# Api_TEST

Chạy dự án : npm start

Mysql :

    "host": "localhost",
    "port": 3306,
    "username": "root",
    "password": "",
    "database": "testdatabase",
    
tên Database:   testdatabase
table database:
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
    
    
    
    
