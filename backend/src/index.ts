import express from "express"
import passport from "passport"

import "./services/passport"


const app = express();
const port = 3006; // default port to listen
const CLIENT_URL = "http://localhost:3000/profile"; //We'll redirect the user to this page after login

// define a route handler for the default home page
app.get( "/", ( req, res ) => {
    res.send( "Hello world!" );
} );


//Authentication with GitHub

app.get("/auth/github", (req, res, next) =>{
    const authenticationFunction = passport.authenticate("github", {scope: [ "profile"]})
   authenticationFunction(req,res, next)
    
})

//Called by Github after the user has completed the authentication process
app.get("/auth/github/callback", passport.authenticate("github", (req, res) =>{
    res.redirect(CLIENT_URL)
}))


app.use(passport.initialize());
app.use(passport.session());

// start the Express server
app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );
