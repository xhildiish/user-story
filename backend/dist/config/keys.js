"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    githubClientID: '98ca361010dcb1a7f2d2',
    // 98ca361010dcb1a7f2d2 - This is the app I thought you were using. Apparently you are not.
    // Let's change the registered callback URL in the other app.
    // a889508fd653ef067191 - Notice that I copy/pasted the other one here to double check that it exactly matched.
    // We are thinking it would match, but IT IS WORTH THE EXTRA WORK/TIME to check now so that wee can be sure...
    // ... and save the time of debugging if we were wrong. They do exactly match.
    // So let's change its registered callback URL.
    githubClientSecret: '659b00a07a42085f8f7b1be29c9e9b7bb19457a7',
    //mongoURI:'mongodb://localhost:27017/user-story' // LINUX
    mongoURI: 'mongodb://userstory-mongo:27017/user-story' // DOCKER
    //mongoURI:'mongodb://127.0.0.1:27017/user-story' // WINDOWS
};
//# sourceMappingURL=keys.js.map