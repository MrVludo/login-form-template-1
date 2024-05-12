const express = require("express");
const path = require("path");
const fs = require('fs');
const bodyParser = require("body-parser");

const app = express();
const PORT = 8000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

app.post('/check-login', (req, res) => {
    var username = req.body.username.toString();
    var password = req.body.password.toString();
    fs.readFile('private/users.txt', 'utf-8', (err, data) => {
        if (err) {
            console.error('Failed to read  users:', err);
            res.status(500).send('Failed to read users');
            return;
        }
        else {
            var users = data.split('\n');
            var loggedIn = false;
            for (var user=0; user<users.length; user+=2) {
                if (username === users[user]) {
                    if (password === users[user+1])
                        loggedIn = true; 
                    break;
                }
            }
            res.send(loggedIn);
        }
    });
});

app.post('/check-reg', (req, res) => {
    var username = req.body.username.toString();
    var password = req.body.password.toString();

    var problem = "ok";
    if (username.length < 2 || username.length > 18) 
        problem = "username";
    else if (password.length < 3 || password.length > 30)
        problem = "password";
    if (problem !== "ok") {
        res.send(problem);
        return;
    }

    fs.readFile('private/users.txt', 'utf-8', (err, data) => {
        if (err) {
            console.error('Failed to read users:', err);
            problem = "Failed to read users";
        }
        else {
            var users = data.split('\n');
            for (var user=0; user<users.length; user+=2) {
                if (username === users[user]) {
                    problem = "username"; 
                    break;
                }
            }
        }
        if (problem !== "ok") 
            res.send(problem);
        else {
            fs.appendFile('private/users.txt', username+'\n'+password+'\n', (err) => {
                if (err) {
                    console.error('Failed to add user:', err);
                    res.status(500).send('Failed to add user');
                    return;
                } else {
                    console.log('User '+username+' added successfully');
                    res.send(problem);
                }
            });
        }
    });
});

app.listen(PORT, () => {console.log(`Server is running on a port ${PORT}`)});