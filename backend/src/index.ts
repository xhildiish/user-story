import express from "express"
import passport from "passport"
import cookieSession from "cookie-session"
import cors from "cors"
import mongoose from 'mongoose'
import keys from "./config/keys"

import "./services/passport"
const User = mongoose.model('user');


const app = express();
const port = process.env.PORT || 3006; // default port to listen
//const CLIENT_URL = "http://localhost:3000/profile"; // LINUX - We'll redirect the user to this page after login
const CLIENT_URL = "http://127.0.0.1:3000/profile"; // WINDOWS
//const CLIENT_URL = "http://userstory-frontend-react:3000/profile"; // DOCKER

mongoose.connect(keys.mongoURI);

app.use(
  cors({
    origin: [ 
      "http://localhost:3000", 
      "http://127.0.0.1:3000", 
      "http://userstory-frontend-react:3000" 
    ], // DEV
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use(cookieSession({
    name: 'github-auth-session',
    keys: ['key1', 'key2']
 }))

app.use(passport.initialize());
app.use(passport.session());

// define a route handler for the default home page
app.get( "/", ( req, res ) => {
    res.send( "Hello world!" );
} );


//login successful
app.get("/login/success", (req, res) => {
    if (req.user) {
      res.status(200).json({
        success: true,
        message: "successfull",
        user: req.user,
        cookies: req.cookies
      });
    }
  });


  //login failed
  app.get("/login/failed", (req, res) => {
    res.status(401).json({
      success: false,
      message: "failure",
    });
  });


  //For unkown errors
  app.get('/auth/error', (req, res) => res.send('Unknown Error'))


//Authentication with GitHub

app.get("/auth/github", (req, res, next) =>{
    const authenticationFunction = passport.authenticate("github", {scope: [ "profile"]})
   authenticationFunction(req,res, next)
    
})

//Called by Github after the user has completed the authentication process
app.get("/auth/github/callback", passport.authenticate("github"), (req, res) =>{
    res.redirect(CLIENT_URL)
})

//logout api call
app.get("/api/logout", (req, res) => {
    res.session = null;
    req.logOut();
    //res.redirect('http://localhost:3000/login'); // LINUX
    res.redirect('http://127.0.0.1:3000/login'); // WINDOWS
    //res.redirect('http://userstory-frontend-react:3000/login'); // DOCKER
});



app.get("/user/profile/api", async (req, res) => {
    try {
      const user = await User.findOne(req.user)
      res.send(user)
    } catch (error) {
      console.log(error)
    }
  })


// start the Express server
app.listen( port, () => {
    console.log( `server started on port ${ port }` );
} );
