"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const cookie_session_1 = __importDefault(require("cookie-session"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const keys_1 = __importDefault(require("./config/keys"));
require("./services/passport");
const User = mongoose_1.default.model('user');
const app = (0, express_1.default)();
const port = process.env.PORT || 3006; // default port to listen
//const CLIENT_URL = "http://localhost:3000/profile"; // LINUX - We'll redirect the user to this page after login
const CLIENT_URL = "http://127.0.0.1:3000/profile"; // WINDOWS
//const CLIENT_URL = "http://userstory-frontend-react:3000/profile"; // DOCKER
mongoose_1.default.connect(keys_1.default.mongoURI);
app.use((0, cors_1.default)({
    origin: [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://userstory-frontend-react:3000"
    ],
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
}));
app.use((0, cookie_session_1.default)({
    name: 'github-auth-session',
    keys: ['key1', 'key2']
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
// define a route handler for the default home page
app.get("/", (req, res) => {
    res.send("Hello world!");
});
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
app.get('/auth/error', (req, res) => res.send('Unknown Error'));
//Authentication with GitHub
app.get("/auth/github", (req, res, next) => {
    const authenticationFunction = passport_1.default.authenticate("github", { scope: ["profile"] });
    authenticationFunction(req, res, next);
});
//Called by Github after the user has completed the authentication process
app.get("/auth/github/callback", passport_1.default.authenticate("github"), (req, res) => {
    res.redirect(CLIENT_URL);
});
//logout api call
app.get("/api/logout", (req, res) => {
    res.session = null;
    req.logOut();
    //res.redirect('http://localhost:3000/login'); // LINUX
    res.redirect('http://127.0.0.1:3000/login'); // WINDOWS
    //res.redirect('http://userstory-frontend-react:3000/login'); // DOCKER
});
app.get("/user/profile/api", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User.findOne(req.user);
        res.send(user);
    }
    catch (error) {
        console.log(error);
    }
}));
// start the Express server
app.listen(port, () => {
    console.log(`server started on port ${port}`);
});
//# sourceMappingURL=index.js.map