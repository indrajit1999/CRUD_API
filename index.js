// this code for dev and prod

const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const db = require("./db");

dotenv.config();

const PORT = process.env.PORT || 4000;

const app = express();

app.use(bodyParser.json());

app.get("/api/all_users", (req, res) => {
  res.json(db.getAllUsers());
});

app.get("/api/all_users/:userId", (req, res) => {
  const { userId } = req.params;
  const user = db.getUserById(userId);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  res.json(user);
});

app.post("/api/new_users", (req, res) => {
  const { username, age, hobbies } = req.body;
  if (!username || !age) {
    return res.status(400).json({ error: "Username and age are required" });
  }
  const newUser = db.createUser({ username, age, hobbies });
  res.status(201).json(newUser);
});

app.put("/api/update_users/:userId", (req, res) => {
  const { userId } = req.params;
  const { username, age, hobbies } = req.body;
  const updatedUser = db.updateUser(userId, { username, age, hobbies });
  if (!updatedUser) {
    return res.status(404).json({ error: "User not found" });
  }
  res.json(updatedUser);
});

app.delete("/api/delete_users/:userId", (req, res) => {
  const { userId } = req.params;
  db.deleteUser(userId);
  res.sendStatus(204);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

//==================================================

// this code for multi port

// const cluster = require("cluster");
// const numCPUs = require("os").cpus().length;
// const express = require("express");
// const bodyParser = require("body-parser");
// const db = require("./db");

// if (cluster.isMaster) {
//   console.log(`Master ${process.pid} is running`);

//   for (let i = 0; i < numCPUs - 1; i++) {
//     cluster.fork();
//   }

//   cluster.on("exit", (worker, code, signal) => {
//     console.log(`Worker ${worker.process.pid} died`);
//   });
// } else {
//   const app = express();

//   app.use(bodyParser.json());

//   app.get("/api/all_users", (req, res) => {
//     res.json(db.getAllUsers());
//   });

//   app.get("/api/all_users/:userId", (req, res) => {
//     const { userId } = req.params;
//     const user = db.getUserById(userId);
//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }
//     res.json(user);
//   });

//   app.post("/api/new_users", (req, res) => {
//     const { username, age, hobbies } = req.body;
//     if (!username || !age) {
//       return res.status(400).json({ error: "Username and age are required" });
//     }
//     const newUser = db.createUser({ username, age, hobbies });
//     res.status(201).json(newUser);
//   });

//   app.put("/api/update_users/:userId", (req, res) => {
//     const { userId } = req.params;
//     const { username, age, hobbies } = req.body;
//     const updatedUser = db.updateUser(userId, { username, age, hobbies });
//     if (!updatedUser) {
//       return res.status(404).json({ error: "User not found" });
//     }
//     res.json(updatedUser);
//   });

//   app.delete("/api/delete_users/:userId", (req, res) => {
//     const { userId } = req.params;
//     db.deleteUser(userId);
//     res.sendStatus(204);
//   });

//   const PORT = parseInt(process.env.PORT, 10) || 4000;
//   const workerPort = PORT + cluster.worker.id;
//   app.listen(workerPort, () => {
//     console.log(
//       `Worker ${cluster.worker.id} running on http://localhost:${workerPort}`
//     );
//   });
// }

// for the multi port
//"start:multi": "node index.js"
