import express, { json } from 'express';
import cors from 'cors';
import mysql from 'mysql';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(json());
app.use(cors());

const db = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

db.connect();

app.get('/users/:name', (req, res) => {
  const name = req.params.name;
  console.log(req.params.name);
  db.query(
    `SELECT * FROM users WHERE name = '${name}';`,
    (err, rows, fields) => {
      if (err) throw err;
      console.log(rows, fields);
      res.json(rows);
    }
  );
});

app.listen(3000, () => {
  console.log('Cool beans');
});
