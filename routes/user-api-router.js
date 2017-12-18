const express = require('express');
const bcrypt = require('bcrypt');

const User = require('../models/user-model');

const router = express.Router();

// -------------- Admin --------------------------

router.post('/signup', (req, res, next) => {
  if ( req.body.password.length < 8 ||
       req.body.password.match(/[^a-z0-9]/i) === null
  ) {
    res.status(400).json({ error: 'Password invalid' });
    return;
  }

  User.findOne({ email: req.body.email })
  .then((userFromdb) => {
      if(userFromdb !== null){
        res.status(400).json({ error: 'Email is taken' });
        return;
      }

      const salt = bcrypt.genSaltSync(10);
      const scrambledPassword = bcrypt.hashSync(req.body.password, salt);
      console.log(req.body.password);
      console.log(scrambledPassword);

      const theUser = new User({
        placeName: req.body.placeName,
        email: req.body.email,
        encryptedPassword: scrambledPassword,
        phone: req.body.phone,
        location: req.body.location,
        fields: req.body.fields,
        admin: true
      });

      return theUser.save();
  })
  .then((userFromdb) => {
    // log the user in automatically if sign up works
    req.login(userFromdb, (err) => {
      // clear the encryptedPassword before sending the user info
      // (otherwise it's a security risk)
      userFromdb.encryptedPassword = undefined;

        res.status(200).json({
          isLoggedIn: true,
          userInfo: userFromdb
        });
    });
  })
  .catch((err) => {
    if(err.errors) {
      res.status(400).json(err.errors);
    }
    else {
      res.status(500).json({ error: 'Sign up database error' });
      console.log(err);
    }
  });
}); //POST /api/signup


router.post('/login', (req, res, next) => {
  User.findOne({ email: req.body.email })
      .then((userFromdb) => {
        if (userFromdb === null) {
          res.status(400).json({ error: 'Email is invalid' });
          return;
      }
      console.log(userFromdb.encryptedPassword);
      console.log(req.body.password);

    const isPasswordGood =
    bcrypt.compareSync(req.body.password, userFromdb.encryptedPassword);

    if (isPasswordGood === false) {
      res.status(400).json({ error: 'Password is invalid' });
      return;
    }

    req.login(userFromdb, (err) => {
      // clear the encryptedPassword before sending the user info
      // (otherwise it's a security risk)
      userFromdb.encryptedPassword = undefined;

        res.status(200).json({
          isLoggedIn: true,
          userInfo: userFromdb
        });
    });

  })
  .catch((err) => {
    console.log("Post /login ERROR!");
    console.log(err);

    res.status(500).json({ error: 'Login database error' });
  });
}); //POST /api/login



//----------------- Player -------------------------------


router.post('/signup/player', (req, res, next) => {
  if ( req.body.password.length < 8 ||
       req.body.password.match(/[^a-z0-9]/i) === null
  ) {
    res.status(400).json({ error: 'Password invalid' });
    return;
  }

  User.findOne({ email: req.body.email })
  .then((userFromdDb) => {
      if(userFromdDb !== null){
        res.status(400).json({ error: 'Email is taken' });
        return;
      }

      const salt = bcrypt.genSaltSync(10);
      const scrambledPassword = bcrypt.hashSync(req.body.password, salt);
      console.log(req.body.password);
      console.log(scrambledPassword);

      const theUser = new User({
        fullName: req.body.fullName,
        username: req.body.username,
        email: req.body.email,
        encryptedPassword: scrambledPassword,
        phone: req.body.phone,
        nationality: req.body.nationality,
        position: req.body.position
      });

      return theUser.save();
  })
  .then((userFromdDb) => {
    // log the player in automatically if sign up works
    req.login(userFromdDb, (err) => {
      // clear the encryptedPassword before sending the user info
      // (otherwise it's a security risk)
      userFromdDb.encryptedPassword = undefined;

        res.status(200).json({
          isLoggedIn: true,
          userInfo: userFromdDb
        });
    });
  })
  .catch((err) => {
    if(err.errors) {
      res.status(400).json(err.errors);
    }
    else {
      res.status(500).json({ error: 'Sign up database error' });
      console.log(err);
    }
  });
}); //POST /api/signup



router.post('/login/player', (req, res, next) => {
  User.findOne({ email: req.body.email })
  .then((userFromdDb) => {
    if (userFromdDb === null) {
      res.status(400).json({ error: 'Email is invalid' });
      return;
    }
        console.log(userFromdDb.encryptedPassword);
        console.log(req.body.password);

    const isPasswordGood =
    bcrypt.compareSync(req.body.password, userFromdDb.encryptedPassword);

    if (isPasswordGood === false) {
      res.status(400).json({ error: 'Password is invalid' });
      return;
    }

    req.login(userFromdDb, (err) => {
      // clear the encryptedPassword before sending the user info
      // (otherwise it's a security risk)
      userFromdDb.encryptedPassword = undefined;

        res.status(200).json({
          isLoggedIn: true,
          userInfo: userFromdDb
        });
    });
  })
  .catch((err) => {
    console.log("Post /login ERROR!");
    console.log(err);

    res.status(500).json({ error: 'Login database error' });
  });
}); //POST /api/login


router.delete('/logout', (req, res, next) => {
    req.logout();

    res.status(200).json({
        isLoggedIn: false,
        userInfo: null
    });
}); // DELETE /logout



router.get('/checklogin', (req, res, next) => {
    if (req.user) {
        // clear the "encryptedPassword" before sending the user info
        // (otherwise it's a security risk)
        req.user.encryptedPassword = undefined;

        res.status(200).json({
            isLoggedIn: true,
            userInfo: req.user
        });
    }
    else {
        res.status(200).json({
            isLoggedIn: false,
            userInfo: null
        });
    }
}); // GET /checklogin

module.exports = router;
