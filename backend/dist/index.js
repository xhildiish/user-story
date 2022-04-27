"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
require("./services/passport");
const app = (0, express_1.default)();
const port = 3006; // default port to listen
const CLIENT_URL = "http://localhost:3000/profile"; //We'll redirect the user to this page after login
// define a route handler for the default home page
app.get("/", (req, res) => {
    res.send("Hello world!");
});
//Authentication with GitHub
app.get("/auth/github", (req, res, next) => {
    const authenticationFunction = passport_1.default.authenticate("github", { scope: ["profile"] });
    authenticationFunction(req, res, next);
});
//Called by Github after the user has completed the authentication process
app.get("/auth/github/callback", passport_1.default.authenticate("github", (req, res) => {
    res.redirect(CLIENT_URL);
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
// start the Express server
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map