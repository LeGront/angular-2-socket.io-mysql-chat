import {bookshelf} from "./db";

export interface IRoom {
    id: number;
    name: string;
}

export interface IMessage {
    id?: number;
    room_id: number;
    user_id: number;
    nickname: string;
    type: number;
    message: string;
    created?: string;
}

export class Room extends bookshelf.Model<Room> implements IRoom {
    id: number;
    name: string;

    get tableName() {
        return 'chat_dialogs';
    }
}

export class Message extends bookshelf.Model<Message> implements IMessage {
    id: number;
    room_id: number;
    user_id: number;
    nickname: string;
    type: number;
    message: string;
    created: string;

    get tableName() {
        return 'chat_messages';
    }
}

export enum SendType {
    self, room, all
}