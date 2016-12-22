import * as http from 'http';
import {List} from "immutable";
import {IRoom, IMessage, Room, Message, SendType} from '../models/models';


let server = http.createServer();

let port = process.env.port || 1337;
let io = require('socket.io').listen(port);

let users: List<any> = List();

console.log('Сервер стартовал');

io.on("connection", (socket: any) => {
    console.log("Client connected");

    socket.on('disconnect', () => {

    });

    socket.on('setNickname', (nickname: string) => {
        users = users.push({
            id: socket.id,
            nickname: nickname
        });
    });

    socket.on('getRooms', () => {
        new Room().fetchAll().then((rows) => {
            let rooms = [];
            rows.each((row) => {
                rooms.push(row.attributes);
            });
            socket.emit('setRooms', rooms);
        });
    });

    socket.on('joinRoom', (room: IRoom) => {
        let user = getUser();
        let listKey = getUserKey();


        users = users.set(listKey, {
            id: user.id,
            nickname: user.nickname,
            currentRoom: room
        });

        leaveRoom();
        socket.join('room' + getCurrentRoom());
        setMessages(SendType.self);
    });

    socket.on('getMessages', () => {
        setMessages(SendType.self);
    });

    socket.on('getUsers', () => {
        io.emit('setUsers', users);
    });

    socket.on('sendMessage', (message: IMessage) => {
        new Message(message).save().then((model: IMessage) => {
            setMessages(SendType.room);
        });
    });

    function setMessages(sendType: SendType) {
        Message.query().where({'room_id': getCurrentRoom()}).then((rows) => {
            if (sendType == SendType.room) {
                io.in('room' + getCurrentRoom()).emit("setMessages", rows);
            }
            if (sendType == SendType.self) {
                socket.emit("setMessages", rows);
            }
        });
    }

    function getUser() {
        return users.find((user) => { return user.id == socket.id });
    }

    function getUserKey() {
        return users.findKey((user) => { return user.id == socket.id });
    }

    function getCurrentRoom() {
        let user = getUser();
        return user.currentRoom.id;
    }

    function leaveRoom() {
        let rooms: number[] = io.sockets.adapter.sids[socket.id];
        for(let room in rooms) { socket.leave(room); }
    }

});