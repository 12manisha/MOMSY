const express = require("express");
const cors = require("cors");
var bodyParser = require('body-parser')
var jwt = require('jsonwebtoken')
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))
const port = 8000;

const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/momsy");
const Users = mongoose.model("Users", { username: String, email:String ,password: String });

app.get("/", (req, res) => {
  res.send("hello world");
});

app.get('/user', async (req, res) => {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decodedToken = jwt.verify(token, 'MYKEY');
      const userId = decodedToken.data._id;
      
      const user = await Users.findById(userId);
      res.json(user);
    } catch (error) {
      console.error('Error fetching user data: ', error);
      res.status(401).json({ message: 'Unauthorized' });
    }
  });
  

app.post("/signup", async (req, res) => {
    console.log(req.body);

    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;

    const existingUser = await Users.findOne({ email: email });

    if (existingUser) {
        res.send({ message: "User already exists" });
    } else {
        const user = new Users({ username: username, email: email ,password: password });

        user
            .save()
            .then(() => res.send({ message: "Saved successfully" }))
            .catch((err) => res.send(err));
    }
});

app.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    Users.findOne({ email: email })
        .then((result) => {
            if (!result) {
                res.send({ message: 'User not found' });
            } else {
                if (result.password === password) {
                    const token = jwt.sign({
                        data: result
                    }, 'MYKEY', {expiresIn: '1h'});
                    res.send({ message: 'Login successful', token:token });
                } else {
                    res.send({ message: 'Incorrect password' });
                }
            }
        })
        .catch((err) => {
            res.send({ message: 'Server error' });
        });
});


app.listen(port, () => {
  console.log(`Listening at port ${port}`);
});
