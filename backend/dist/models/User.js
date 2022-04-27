"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const userSchema = new Schema({
    githubId: {
        type: String,
    },
    name: {
        type: String
    },
    img: {
        type: String
    },
    bio: {
        type: String
    },
    repos: {
        type: Array
    }
});
module.exports = mongoose_1.default.model('user', userSchema);
//# sourceMappingURL=User.js.map