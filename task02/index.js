const {MongoClient} = require('mongodb');
const express = require("express");
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {TasksClient} = require("./proto/task03/api_grpc_pb");
const {credentials, status} = require("@grpc/grpc-js");
const {ProtoTask, PaginationRequest, DeleteRequest, GetRequest} = require("./proto/task03/api_pb");

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

    const tasksClient = new TasksClient(process.env.TASKS_API_ADDRESS, credentials.createInsecure())

    const app = express();
    app.use(bodyParser.json());

    app.get('/', function (req, res) {
        res.send('hello world');
    });
    app.post('/api/v1/users', async function (req, res) {
        const login = req.query.login;
        const password = req.query.password;

        if (!login || !password) {
            res.status(400).send(JSON.stringify({"status": "error", "message": "you should provide login&password"}));
            return
        }

        if (await users.countDocuments({login}) > 0) {
            res.status(400).send(JSON.stringify({"status": "error", "message": "user already exists"}));
            return
        }

        await users.insertOne({
            login,
            password_hash: (await bcrypt.hash(password, saltRounds)),
            ...Object.fromEntries(editableFields.map(e => [e, ""]))
        })
        res.send(JSON.stringify({"status": "ok"}))
    });
    app.get('/api/v1/token', async function (req, res) {
        const login = req.query.login;
        const password = req.query.password;

        const userOrNull = await users.findOne({
            login
        });
        if (userOrNull == null) {
            res.status(400).send(JSON.stringify({"status": "error", "message": "user not found"}));
            return
        }
        if (!(await bcrypt.compare(password, userOrNull.password_hash))) {
            res.status(403).send(JSON.stringify({"status": "error", "message": "login or password is incorect"}));
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

    const authorized = async (req, res, next) => {
        const token = req.header("Authorization")
        if (!token) {
            res.status(401).send(JSON.stringify({
                "status": "error",
                "message": "you should provide Authorization header"
            }));
            return
        }
        let decoded = null;
        try {
            decoded = jwt.verify(token, secretKey);
        } catch (err) {
            console.log(err);
            res.status(401).send(JSON.stringify({
                "status": "error",
                "message": "you should provide valid token in Authorization header"
            }));
            return
        }
        req.data = decoded.data
        next()
    }

    app.patch('/api/v1/users', authorized, async function (req, res) {
        const login = req.data.login;

        if (!Object.entries(req.body).every(field => editableFields.indexOf(field[0]) != -1)) {
            res.status(400).send(JSON.stringify({
                "status": "error",
                "message": "you attemted to edit non-editable field"
            }));
            return
        }

        await users.updateOne({login}, {$set: req.body});

        res.send(JSON.stringify({"status": "ok"}))
    })

    app.post('/api/v1/task', authorized, function (req, res) {
        return new Promise((resolve, reject) => {
            tasksClient.createTask(new ProtoTask()
                    .setAuthor(req.data.login)
                    .setTitle(req.body.title)
                    .setStatus(req.body.status)
                    .setDescription(req.body.description)
                , (error, response) => {
                    if (error != null) {
                        res.status(500).send({"status": "error", "message": error.message})
                    } else {
                        res.send({"status": "ok", "task": response.toObject()});
                    }
                })
        })
    })
    app.patch('/api/v1/task', authorized, function (req, res) {
        return new Promise((resolve, reject) => {
            tasksClient.updateTask(new ProtoTask()
                    .setId(req.body.id)
                    .setAuthor(req.data.login)
                    .setTitle(req.body.title)
                    .setStatus(req.body.status)
                    .setDescription(req.body.description)
                , (error, response) => {
                    if (error != null) {
                        if (error.code === status.NOT_FOUND) {
                            res.status(404).send({"status": "error", "message": "not found"})
                        } else if (error.code === status.PERMISSION_DENIED) {
                            res.status(403).send({"status": "error", "message": "forbidden"})
                        } else {
                            res.status(500).send({"status": "error", "message": error.message})
                        }
                    } else {
                        res.send({"status": "ok", "task": response.toObject()});
                    }
                })
        })
    })

    app.delete('/api/v1/task', authorized, function (req, res) {
        return new Promise((resolve, reject) => {
            tasksClient.deleteTask(new DeleteRequest()
                    .setId(req.query.id)
                    .setAuthor(req.data.login)
                , (error, response) => {
                    if (error != null) {
                        if (error.code === status.NOT_FOUND) {
                            res.status(404).send({"status": "error", "message": "not found"})
                        } else if (error.code === status.PERMISSION_DENIED) {
                            res.status(403).send({"status": "error", "message": "forbidden"})
                        } else {
                            res.status(500).send({"status": "error", "message": error.message})
                        }
                    } else {
                        res.send({"status": "ok"});
                    }
                })
        })
    })

    app.get('/api/v1/task', authorized, function (req, res) {
        return new Promise((resolve, reject) => {
            tasksClient.getTask(new GetRequest()
                    .setId(req.query.id)
                , (error, response) => {
                    if (error != null) {
                        if (error.code === status.NOT_FOUND) {
                            res.status(404).send({"status": "error", "message": "not found"})
                        } else {
                            res.status(500).send({"status": "error", "message": error.message})
                        }
                    } else {
                        res.send({"status": "ok", "task": response.toObject()});
                    }
                })
        })
    })

    app.get('/api/v1/tasks', authorized, function (req, res) {
        return new Promise((resolve, reject) => {
            tasksClient.getTasks(new PaginationRequest()
                    .setSkip(req.query.skip ?? 0)
                    .setTake(req.query.take ?? 10)
                , (error, response) => {
                    if (error != null) {
                        res.status(500).send({"status": "error", "message": error.message})
                    } else {
                        res.send({"status": "ok", "task": response.toObject()});
                    }
                })
        })
    })

    app.listen(port, () => {
        console.log(`App listening on port ${port}`)
    })
}

main()