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
  const query = `SELECT * FROM users WHERE name = "${name}"`;

  db.query(query, (err, rows, fields) => {
    if (err) {
      res.status(400).json('Bad SQL query!');
    } else {
      console.log(rows);
      res.json(rows);
    }
  });
});

app.listen(3000, () => {
  console.log('Cool beans');
});
