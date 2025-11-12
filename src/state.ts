import { db as rtdb, ref, onValue } from './rtdb.ts';
import map from "lodash/map"


const port = process.env.PORT || 3000;

const API_BASE_URL = `http://localhost:${port}`;
// const API_BASE_URL = "https://server-chat-production-811b.up.railway.app";

export const state = {
    data: {
        roomIdShort: "",
        roomIdLong: "",
        name: "",
        messages: []
    },
    listeners: [],

    init(roomId: string) {
        const chatroomsRef = ref(rtdb, `/rooms/${roomId}`);
        const currentState = this.getData();
        onValue(chatroomsRef, (snapshot) => {
            const resul = snapshot.val();
            const messagesList = map(resul.messages, (msg, id) => ({ id, ...msg }));
            currentState.messages = messagesList
            this.setState(currentState);
        });

    },

    async createRoom(userId: string) {
        const res = fetch(API_BASE_URL + "/room", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                userId
            })
        });

        const roomIds = await (await res).json()
        return (roomIds);

    },

    async joinRoom(roomId: string) {
        const roomIdLong = await fetch(`${API_BASE_URL}/room/${roomId}`, {
            method: "get",
            headers: { "Content-Text": "application/json" }
        });

        return (await roomIdLong.json());
    },

    async authUser(registerValue: string, name: string, email: string) {

        if (registerValue == "singup") {
            const res = await fetch(API_BASE_URL + "/singup", {
                method: "post",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name,
                    email
                })
            });

            const idUser = await res.json();
            return (idUser.id);

        } else if (registerValue == "singin") {
            const res = await fetch(API_BASE_URL + "/singin", {
                method: "post",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email
                })
            });

            const idUser = await res.json();
            return (idUser.id);
        }
    },

    async processAction(registerValue: string, roomValue: string, name: string, email: string, roomId: string) {

        const userId = await this.authUser(registerValue, name, email);

        let newState = {};

        if (roomValue == "nuevoRoom") {
            const roomIds = await this.createRoom(userId);
            newState = {
                roomIdShort: roomIds.roomIdShort,
                roomIdLong: roomIds.roomIdLong,
                name,
                messages: []
            };

        } else if (roomValue == "roomExistente") {
            const roomIdLong = await this.joinRoom(roomId);
            newState = {
                roomIdShort: roomId,
                roomIdLong: roomIdLong.rtdbRoomId,
                name,
                messages: []
            };
        }

        state.setState(newState);
        state.init(state.data.roomIdLong);
    },

    getData() {
        const currentData = this.data;
        return currentData;
    },

    setName(name: string) {
        const currentState = this.getData();
        currentState.name = name;
        this.setState(currentState);
        console.log(this.getData());
    },

    setState(newState: any) {
        this.data = newState;
        for (const cb of this.listeners) {
            cb();
        };
    },

    pushMessage(message: string) {
        const nameState = this.data.name;
        fetch(API_BASE_URL + "/messages", {
            method: "post",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: nameState,
                message: message,
                roomId: this.data.roomIdLong
            })
        });
    },

    subscribe(callback: (any) => any) {
        this.listeners.push(callback);
    }

    
};
