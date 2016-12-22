"use strict";
var http = require('http');
var immutable_1 = require("immutable");
var models_1 = require('../models/models');
var server = http.createServer();
var port = process.env.port || 1337;
var io = require('socket.io').listen(port);
var users = immutable_1.List();
console.log('Сервер стартовал');
io.on("connection", function (socket) {
    console.log("Client connected");
    socket.on('disconnect', function () {
    });
    socket.on('setNickname', function (nickname) {
        users = users.push({
            id: socket.id,
            nickname: nickname
        });
    });
    socket.on('getRooms', function () {
        new models_1.Room().fetchAll().then(function (rows) {
            var rooms = [];
            rows.each(function (row) {
                rooms.push(row.attributes);
            });
            socket.emit('setRooms', rooms);
        });
    });
    socket.on('joinRoom', function (room) {
        var user = getUser();
        var listKey = getUserKey();
        users = users.set(listKey, {
            id: user.id,
            nickname: user.nickname,
            currentRoom: room
        });
        leaveRoom();
        socket.join('room' + getCurrentRoom());
        setMessages(models_1.SendType.self);
    });
    socket.on('getMessages', function () {
        setMessages(models_1.SendType.self);
    });
    socket.on('getUsers', function () {
        io.emit('setUsers', users);
    });
    socket.on('sendMessage', function (message) {
        new models_1.Message(message).save().then(function (model) {
            setMessages(models_1.SendType.room);
        });
    });
    function setMessages(sendType) {
        models_1.Message.query().where({ 'room_id': getCurrentRoom() }).then(function (rows) {
            if (sendType == models_1.SendType.room) {
                io.in('room' + getCurrentRoom()).emit("setMessages", rows);
            }
            if (sendType == models_1.SendType.self) {
                socket.emit("setMessages", rows);
            }
        });
    }
    function getUser() {
        return users.find(function (user) { return user.id == socket.id; });
    }
    function getUserKey() {
        return users.findKey(function (user) { return user.id == socket.id; });
    }
    function getCurrentRoom() {
        var user = getUser();
        return user.currentRoom.id;
    }
    function leaveRoom() {
        var rooms = io.sockets.adapter.sids[socket.id];
        for (var room in rooms) {
            socket.leave(room);
        }
    }
});
