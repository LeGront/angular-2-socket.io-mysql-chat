import {bookshelf} from "./db";

export interface IRoom {
    id?: number;
    name: string;
    type: number;
}

export interface IMessage {
    id?: number;
    room_id: number;
    user_id: number;
    nickname: string;
    type: number;
    message: string;
    date_created?: string;
}

export interface IUser {
    id?: number;
    nickname: string;
    password: string;
    session_id: string;
    date_created?: string;
    date_login?: string;
}

export class Room extends bookshelf.Model<Room> implements IRoom {
    id: number;
    name: string;
    type: number;

    get tableName() {
        return 'rooms';
    }
}

export class Message extends bookshelf.Model<Message> implements IMessage {
    id: number;
    room_id: number;
    user_id: number;
    nickname: string;
    type: number;
    message: string;
    date_created: string;

    get tableName() {
        return 'messages';
    }
}

export class User extends bookshelf.Model<User> implements IUser {
    id: number;
    nickname: string;
    password: string;
    session_id: string;
    date_created: string;
    date_login: string;

    get tableName() {
        return 'users';
    }
}

export enum SendType {
    self, room, all
}