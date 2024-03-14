const { MongoClient } = require('mongodb');
const express = require("express");
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const saltRounds = 10;
const port = 3000;
console.log(process.env)
const secretKey = process.env.SECRET_KEY;

const editableFields = ["name", "surname", "birthdate", "mail", "phone"]

async function main() {
    const client = new MongoClient(process.env.MONGO_URL);
    await client.connect();
    const db = client.db("auth");
    const users = db.collection("users");

    const app = express();
    app.use(bodyParser.json());

    app.get('/', function (req, res) {
        res.send('hello world');
    });
    app.post('/api/v1/users', async function (req, res) {
        const login = req.query.login;
        const password = req.query.password;

        if (!login || ! password) {
            res.status(400).send(JSON.stringify({ "status": "error", "message": "you should provide login&password" }));
            return
        }

        if (await users.countDocuments({ login }) > 0) {
            res.status(400).send(JSON.stringify({ "status": "error", "message": "user already exists" }));
            return
        }

        await users.insertOne({
            login,
            password_hash: (await bcrypt.hash(password, saltRounds)),
            ...Object.fromEntries(editableFields.map(e => [e, ""]))
        })
        res.send(JSON.stringify({ "status": "ok" }))
    });
    app.get('/api/v1/token', async function (req, res) {
        const login = req.query.login;
        const password = req.query.password;

        const userOrNull = await users.findOne({
            login
        });
        if (userOrNull == null) {
            res.status(400).send(JSON.stringify({ "status": "error", "message": "user not found" }));
            return
        }
        if (!(await bcrypt.compare(password, userOrNull.password_hash))) {
            res.status(403).send(JSON.stringify({ "status": "error", "message": "login or password is incorect" }));
            return
        }
        res.send({
            "status": "ok", "token": jwt.sign({
                exp: Math.floor(Date.now() / 1000) + (60 * 60), // Проэкспарится через час
                data: {
                    login
                }
            }, secretKey)
        });
    });
    app.patch('/api/v1/users', async function (req, res) {
        const token = req.header("Authorization")
        if (!token) {
            res.status(401).send(JSON.stringify({ "status": "error", "message": "you should provide Authorization header" }));
            return
        }
        let decoded = null;
        try {
            decoded = jwt.verify(token, secretKey);
        } catch (err) {
            console.log(err);
            res.status(401).send(JSON.stringify({ "status": "error", "message": "you should provide valid token in Authorization header" }));
            return
        }

        if (!Object.entries(req.body).every(field => editableFields.indexOf(field[0]) != -1)) {
            res.status(400).send(JSON.stringify({ "status": "error", "message": "you attemted to edit non-editable field" }));
            return
        }

        const login = decoded.data.login;

        await users.updateOne({ login }, { $set: req.body });

        res.send(JSON.stringify({ "status": "ok" }))
    })
    app.listen(port, () => {
        console.log(`App listening on port ${port}`)
    })
}
main()