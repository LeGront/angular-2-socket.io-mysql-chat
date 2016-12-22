"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var db_1 = require("./db");
var Room = (function (_super) {
    __extends(Room, _super);
    function Room() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(Room.prototype, "tableName", {
        get: function () {
            return 'rooms';
        },
        enumerable: true,
        configurable: true
    });
    return Room;
}(db_1.bookshelf.Model));
exports.Room = Room;
var Message = (function (_super) {
    __extends(Message, _super);
    function Message() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(Message.prototype, "tableName", {
        get: function () {
            return 'messages';
        },
        enumerable: true,
        configurable: true
    });
    return Message;
}(db_1.bookshelf.Model));
exports.Message = Message;
var User = (function (_super) {
    __extends(User, _super);
    function User() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(User.prototype, "tableName", {
        get: function () {
            return 'users';
        },
        enumerable: true,
        configurable: true
    });
    return User;
}(db_1.bookshelf.Model));
exports.User = User;
(function (SendType) {
    SendType[SendType["self"] = 0] = "self";
    SendType[SendType["room"] = 1] = "room";
    SendType[SendType["all"] = 2] = "all";
})(exports.SendType || (exports.SendType = {}));
var SendType = exports.SendType;
