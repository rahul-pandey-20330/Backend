# 📄 Full Documentation for Node.js + Express + MongoDB CRUD App

This project is a **CRUD (Create, Read, Update, Delete)** application built using:

* **Node.js** (backend runtime)
* **Express.js** (web server framework)
* **MongoDB** (database)
* **EJS** (templating engine)

---

## 🗂 Project Structure

```
crud-app/
├── models/
│   └── user.js           # MongoDB schema
├── public/
│   ├── stylesheet/
│   │   └── style.css     # CSS styling
├── views/
│   ├── index.ejs         # Create user form
│   ├── read.ejs          # View all users
│   ├── edit.ejs          # Edit user form
├── index.js              # Main server file
└── package.json
```

---

## 🚀 Setup Instructions

1. **Install dependencies**

   ```bash
   npm install express mongoose ejs
   ```
2. **Run MongoDB server locally**

   ```bash
   mongod
   ```
3. **Start the project**

   ```bash
   node index.js
   ```
4. Open your browser at [http://localhost:3000](http://localhost:3000)

---

## 🔧 `index.js` (Main Server Logic)

### 1. Importing Required Modules

```js
const express = require('express');
const app = express();
const Path = require('path');
const usermodel = require("./models/user");
```

### 2. View Engine and Middleware Setup

```js
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(Path.join(__dirname, 'public')));
```

### 3. Routes

#### Home Page

```js
app.get('/', (req, res) => {
    res.render("index");
});
```

* Renders a form to create a new user.

#### Read All Users

```js
app.get('/read', async (req, res) => {
    let users = await usermodel.find();
    res.render('read', { users });
});
```

* Fetches all users from MongoDB and displays them.

#### Create New User

```js
app.post('/create', async (req, res) => {
    let { username, email, image } = req.body;
    await usermodel.create({ username, email, image });
    res.redirect('/read');
});
```

#### Delete User

```js
app.get('/delete/:id', async (req, res) => {
    await usermodel.findOneAndDelete({ _id: req.params.id });
    res.redirect('/read');
});
```

#### Edit User - Show Form

```js
app.get('/edit/:userid', async (req, res) => {
    let user = await usermodel.findOne({ _id: req.params.userid });
    res.render('edit', { user });
});
```

#### Update User - Save Changes

```js
app.post('/update/:userid', async (req, res) => {
    let { image, username, email } = req.body;
    await usermodel.findOneAndUpdate(
        { _id: req.params.userid },
        { image, username, email },
        { new: true }
    );
    res.redirect('/read');
});
```

### 4. Start the Server

```js
app.listen(3000);
```

---

## 📘 MongoDB Model – `/models/user.js`

```js
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/testdb');

const userSchema = mongoose.Schema({
    image: String,
    username: String,
    email: String
});

module.exports = mongoose.model('user', userSchema);
```

* Connects to MongoDB and defines the `user` schema.

---

## 🖥 Views - EJS Templates

### ✅ `index.ejs` – Create User Form

```html
<form action="/create" method="post">
  <input type="text" name="username" placeholder="Name" required>
  <input type="email" name="email" placeholder="Email" required>
  <input type="text" name="image" placeholder="Image url">
  <input type="submit" value="Create User">
</form>
```

### ✅ `read.ejs` – Show All Users

```ejs
<% if(users.length > 0) { %>
  <% users.forEach(function(user) { %>
    <div class="profile">
      <img src="<%= user.image %>" alt="">
      <h4><%= user.username %></h4>
      <h5><%= user.email %></h5>
      <a href="/edit/<%= user._id %>">Edit</a>
      <a href="/delete/<%= user._id %>">Delete</a>
    </div>
  <% }) %>
<% } else { %>
  <h3>No User Yet</h3>
<% } %>
```

### ✅ `edit.ejs` – Update Form

```html
<form action="/update/<%= user._id %>" method="post">
  <input type="text" name="username" value="<%= user.username %>" required>
  <input type="email" name="email" value="<%= user.email %>" required>
  <input type="text" name="image" value="<%= user.image %>">
  <input type="submit" value="Update User">
</form>
```

---

## 🎨 `style.css` Highlights (public/stylesheet/style.css)

```css
form input {
  height: 33px;
  width: 16%;
  background-color: rgba(50, 41, 41, 0.463);
  color: antiquewhite;
  border-radius: 10px;
  padding: 10px;
}
```

* Clean and readable dark-mode theme.

---

## ✅ CRUD Flow Summary

| Action         | Route              | View        | DB Operation         |
| -------------- | ------------------ | ----------- | -------------------- |
| Create User    | `POST /create`     | `index.ejs` | `usermodel.create()` |
| View Users     | `GET /read`        | `read.ejs`  | `usermodel.find()`   |
| Delete User    | `GET /delete/:id`  | —           | `findOneAndDelete()` |
| Edit User View | `GET /edit/:id`    | `edit.ejs`  | `findOne()`          |
| Update User    | `POST /update/:id` | —           | `findOneAndUpdate()` |

---

## ✅ Future Improvements

* Add form validation and error messages
* Use `try/catch` for better error handling
* Add login and authentication using `passport` or `JWT`
* Use a UI library like Bootstrap or Tailwind

---

## 📌 License

MIT

---

Happy Coding! 🚀

---
