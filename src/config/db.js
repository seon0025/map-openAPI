// mysql 모듈 포함
const mysql = require("mysql");

// mysql 연결을 위한 인스턴스 생성
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PSWORD,
  database: process.env.DB_DATABASE,
});

db.connect();

module.exports = db;
