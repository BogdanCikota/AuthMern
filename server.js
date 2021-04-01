require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const passport = require('passport');
const passportLocal = require("passport-local").Strategy;
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const session = require('cookie-session');
const bodyParser = require('body-parser');
const User = require('./user');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const cors = require('cors');


//-------------------------END OF IMPORTS------------------------

const app = express();
const PORT = process.env.PORT || 4000;
app.use(cors(
    {
        origin: 'http://localhost:3000',
        credentials: true
    }
));

mongoose.connect(`${process.env.START_MONGODB}${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}${process.env.END_MONGODB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {
    !err && console.log('Successfully connected to mongoDB');
});

//MIDDELWARE
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('trust proxy', 1);

app.use(session({
    secret: 'secretcode',
    resave: true,
    saveUninitialized: true,
    cookie: {
        sameSite: 'none',
        secure: true,
        maxAge: 1000 * 60 * 60 * 24 * 7 //One Week
    }
}));

app.use(cookieParser('secretcode'));
app.use(passport.initialize());
app.use(passport.session());
require('./passportConfig')(passport);

app.use(cookieParser('secretcode'));

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
},

    function (accessToken, refreshToken, profile, cb) {
        console.log(profile);
        User.findOrCreate({ googleId: profile.id }, { username: profile.name.givenName }, function (err, user) {
            return cb(err, user);
        });
    }
));


//-------------------------END OF MIDDELWARE------------------------

//ROUTES

app.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) throw err;
        if (!user) {
            res.send('No User Exists')
        } else {
            req.logIn(user, err => {
                if (err) throw err;
                res.send('Successfully Authenticated');
            });
        }
    })(req, res, next);
});

app.post('/sign-up', (req, res) => {
    User.findOne({ username: req.body.username }, async (err, doc) => {
        if (err) throw err;
        if (doc) {
            res.send('User Already Exists');
        } else {
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            const newUser = new User({
                username: req.body.username,
                password: hashedPassword
            });

            await newUser.save();
            res.send('User created');
        }
    });
});

app.get('/users/authUser', (req, res) => {
    res.send(req.user);
});

app.patch('/users/:userID/edit', async (req, res) => {
    let id = req.params.userID;
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    if (req.body.username === '') {

        User.updateOne({ _id: id }, {
            password: hashedPassword
        }, (err, writeOpResult) => {
            if (err) throw err;
            res.send('Successfully updated');
        });
    } else {

        User.updateOne({ _id: id }, {
            username: req.body.username,
            password: hashedPassword
        }, (err, writeOpResult) => {
            if (err) throw err;
            res.send('Successfully updated');
        });

    }

});

app.delete('/users/:userID/delete', (req, res) => {
    let id = req.params.userID;
    User.deleteOne({_id: id}, (err) => {
        if(err) throw err;
        res.send('Successfully deleted user');
    });
});

app.get('/users', (req, res) => {
    User.find({}, (err, users) => {
        if (err) throw err;
        res.send(users);
    });
});


app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile'] }));

app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    function (req, res) {
        // Successful authentication, redirect home.
        // res.redirect('http://localhost:3000');
        res.redirect('/');
    });


app.get('/logout', function (req, res) {
    req.logout();
    res.send('user logged out');
});


//-------------------------END OF ROUTES------------------------

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
}

app.listen(PORT, () => {
    console.log(`Server has started on port: ${PORT}`);
});
