/* Express */
const express = require("express");
const app = express();

app.use(express.json());

/* Dotenv */
require('dotenv').config();

/* Body-parser */
const bodyParser = require('body-parser');

app.use(bodyParser.json());

/* Cookie Parsing Middleware */
const cookieParser = require('./middleware/cookieParser');

app.use(cookieParser);

/* Routes */
const authRoutes = require('./routes/auth/auth.js');
const userRoutes = require('./routes/user/user.js');
const usersRoutes = require('./routes/users/users.js');
const todosRoutes = require('./routes/todos/todos.js');

app.use("/", authRoutes);
app.use("/user", userRoutes);
app.use("/users", usersRoutes);
app.use("/todos", todosRoutes);

/* Not found Middleware */
const notFound = require('./middleware/notFound.js');

app.use(notFound);

/* Port */
const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
