"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var io = require("socket.io-client");
var HomeComponent = (function () {
    function HomeComponent() {
        this.title = 'Лучший чат: Выберите тему';
        this.messages = [];
        this.host = window.location.protocol + "//" + window.location.hostname + ":1337";
        var socketUrl = this.host;
        this.socket = io.connect(socketUrl);
    }
    HomeComponent.prototype.setNickname = function (nickname) {
        this.nickname = nickname;
        this.socket.emit('setNickname', this.nickname);
        this.getRooms();
        this.getUsers();
    };
    HomeComponent.prototype.setCurrentRoom = function (room) {
        this.currentRoom = room;
        this.title = 'Лучший чат: ' + this.currentRoom.name;
        this.socket.emit('joinRoom', this.currentRoom);
        this.getMessages();
    };
    HomeComponent.prototype.sendMessage = function () {
        var message = {
            room_id: this.currentRoom.id,
            user_id: 1,
            nickname: this.nickname,
            type: 1,
            message: this.message
        };
        this.socket.emit('sendMessage', message);
        this.message = '';
    };
    HomeComponent.prototype.getMessages = function () {
        var _this = this;
        this.socket.emit('getMessages');
        this.socket.on('setMessages', function (messages) {
            _this.messages = messages;
        });
    };
    HomeComponent.prototype.getRooms = function () {
        var _this = this;
        this.socket.emit('getRooms');
        this.socket.on('setRooms', function (rooms) {
            _this.rooms = rooms;
        });
    };
    HomeComponent.prototype.getUsers = function () {
        var _this = this;
        this.socket.emit('getUsers');
        this.socket.on('setUsers', function (users) {
            _this.chatUsers = users;
        });
    };
    HomeComponent = __decorate([
        core_1.Component({
            selector: 'home',
            templateUrl: './home.component.html',
            styleUrls: ['./home.component.less']
        })
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
//    "start": "ng serve --host 0.0.0.0", 
//# sourceMappingURL=home.component.js.map