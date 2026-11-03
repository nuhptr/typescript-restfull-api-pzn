"use strict";
/**
 * User Model
 * This is a validate user type model
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.toUserResponse = void 0;
function toUserResponse(user) {
    return {
        name: user.name,
        username: user.username,
    };
}
exports.toUserResponse = toUserResponse;
