const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
const path = require('path');

const app = express();
const saltRounds = 10;

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const fs = require('fs');
const { JSDOM } = require('jsdom');

const mainHtmlFilePath = path.join(__dirname, 'views/main.ejs');
const mainHtmlContent = fs.readFileSync(mainHtmlFilePath, 'utf-8');

const mainDom = new JSDOM(mainHtmlContent);
const mainDocument = mainDom.window.document;


var db = new sqlite3.Database(path.join(__dirname, 'database.db'), (err) => {
    if (err) {
        console.error('Error opening database', err.message);
    } else {
        console.log('Connected to the database');
    }
});

app.use(session({
    secret: 'extremely-secret-key',
    resave: false,
    saveUninitialized: true,
}));

app.use(bodyParser.urlencoded({ extended: true }));

db.run('CREATE TABLE IF NOT EXISTS users(username text, password text, name text, location text, title text, certificate text)', (err) => {
    if (err) {
        console.error('Error creating users table', err);
    }
});
db.run('CREATE TABLE IF NOT EXISTS connection_requests (username text, connection_request_came_from text)', (err) => {
    if (err) {
        console.error('Error creating connection requests table', err);
    }
});
db.run('CREATE TABLE IF NOT EXISTS connections (username text, connection_with text)', (err) => {
    if (err) {
        console.error('Error creating connections table', err);
    }
});

app.post('/register', (req, res) => {
    const { username, password, name, location, title, certificate } = req.body;

    bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
            return res.status(500).send('Error hashing password');
        }

        db.run('INSERT INTO users(username, password, name, location, title, certificate) VALUES (?, ?, ?, ?, ?, ?)', 
            [username, hash, name, location, title, certificate], 
            (err) => {
                if (err) {
                    return res.status(500).send('Error saving data');
                }
                req.session.userName = name;
                req.session.location = location;
                req.session.title = title;
                req.session.certificate = certificate;
                res.redirect('/main');
                checkConnections();
            }
        );
    });
});
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    let connectionRequestsUsernames = [];
    let connectionsUsernames = [];
    
    db.get('SELECT * FROM users WHERE username = ?', [username], (err, user) => {
        if (err) {
            console.error('Error fetching user:', err);
            return res.status(500).send('Internal Server Error');
        }

        if (!user) {
            return res.render('index', { error: 'User not found' });
        }

        bcrypt.compare(password, user.password, (err, result) => {
            if (err) {
                return res.status(500).send('Error checking password');
            }

            if (!result) {
                return res.render('index', { error: 'Incorrect password' });
            }

            const connectionRequestsPromise = new Promise((resolve, reject) => {
                db.all('SELECT u.username FROM users u JOIN connection_requests cr ON u.username = cr.connection_request_came_from WHERE cr.username = ?', [user.name], (err, rows) => {
                    if (err) {
                        console.error('Error fetching connection requests', err);
                        reject(err);
                    } else {
                        connectionRequestsUsernames = rows.map(row => row.username);
                        resolve(connectionRequestsUsernames);
                    }
                });
            });

            const connectionsPromise = new Promise((resolve, reject) => {
                db.all('SELECT u.username FROM users u JOIN connections cr ON u.username = cr.connection_with WHERE cr.username = ?', [user.name1], (err1, rows1) => {
                    if (err1) {
                        console.error('Error fetching connections', err1);
                        reject(err1);
                    } else {
                        connectionsUsernames = rows1.map(row => row.username);
                        resolve(connectionsUsernames);
                    }
                });
            });

            Promise.all([connectionRequestsPromise, connectionsPromise])
                .then(() => {
                    req.session.userName = user.name;
                    req.session.location = user.location;
                    req.session.title = user.title;
                    req.session.certificate = user.certificate;
                    req.session.connectionRequestsUsernames = connectionRequestsUsernames;
                    req.session.connectionsUsernames = connectionsUsernames;

                    res.redirect('/main');
                    checkConnections(connectionRequestsUsernames, connectionRequestsUsernames.length, connectionsUsernames, connectionsUsernames.length); // Call your function
                })
                .catch(err => {
                    return res.status(500).send('Error fetching data');
                });
        });
    });
});

app.post('/signout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send('Error signing out');
        }
        res.clearCookie('connect.sid');
        res.sendStatus(200);
    });
});

app.get('/success', (req, res) => {
    res.sendFile(path.join(__dirname, 'success.html'));
});


app.get('/main', (req, res) => {
    if (!req.session.userName) {
        return res.redirect('/');
    }
    let connectionRequestsCount;
    const connectionRequests = req.session.connectionRequests || "none";
    let connectionsCount;
    const connectionsUsernames = req.session.connectionsUsernames || "none";
    if (connectionRequests === "none") {
        connectionRequestsCount = 0;
    } else {
        connectionRequestsCount = connectionRequests.length;
    }
    if (connectionsUsernames === "none") {
        connectionsCount = 0;
    } else {
        connectionsCount = connectionsUsernames.length;
    }
    res.render('main', { 
        userName: req.session.userName, 
        location: req.session.location, 
        title: req.session.title, 
        certificate: req.session.certificate, 
        connectionRequestsCount,
        connectionRequests,
        connectionsCount,
        connectionsUsernames
    });
});
app.get('/', (req, res) => {
    res.render('index', { userName: req.session.userName });
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
function checkConnections(connectionRequests, connectionRequestsCount, connections, connectionsCount) {
    let noRequestsLabel = mainDocument.querySelector("#no-requests-label");
    if (connectionRequests.length === 0) {
        noRequestsLabel.style.display = "inline-block";
    } else {
        noRequestsLabel.style.display = "none";
    }

    let noConnectionsLabel = mainDocument.querySelector("#no-connections-label");
    let viewmoreLabel = mainDocument.querySelector("#viewmore");
    if (connections.length === 0) {
        noConnectionsLabel.style.display = "none";
        viewmoreLabel.style.display = "none";
    } else {
        noConnectionsLabel.style.display = "none";
        viewmoreLabel.style.display = "none";
    }
}