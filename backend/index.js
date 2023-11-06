import express, { json } from 'express';
import cors from 'cors';
import mysql from 'mysql';
import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';
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

const MONGO_DB = process.env.MONGO_URI || '';
const mongoClient = new MongoClient(MONGO_DB);
mongoClient.connect();
const usersMongoDb = mongoClient.db('db').collection('users');

app.post('/auth/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    console.log(email, password);
    const user = await usersMongoDb
      .find({ email: JSON.parse(email), password: JSON.parse(password) }) // JSON.parse to demonstrate noSQLi
      .toArray();

    if (user.length === 0) {
      res.sendStatus(403);
    } else {
      res.json(user);
    }
  } catch {
    const user = await usersMongoDb
      .find({ email: email, password: password })
      .toArray();
    if (user.length === 0) {
      res.sendStatus(403);
    } else {
      res.json(user);
    }
  }
});

app.get('/mongo/users', async (req, res) => {
  const name = req.query.name;
  if (name) {
    const users = await usersMongoDb.find({ name }).toArray();
    console.log(users);
    res.json(users);
  } else {
    res.status(400).json('Bad query!');
  }
});

app.post('/mongo/users', async (req, res) => {
  const name = req.body.name;
  const query = { name: name };
  console.log(name);
  if (name) {
    const users = await usersMongoDb.find(query).toArray();
    console.log(users);
    res.json(users);
  } else {
    res.status(400).json('Bad query!');
  }
});

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
