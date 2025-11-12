const express = require("express");
const cors = require("cors");
const { nanoid } = require("nanoid");
const { db, rtdb } = require('./firebase.js');

const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 3000;

function main() {

    const usersCollection = db.collection("users");
    const roomsCollection = db.collection("rooms");

    app.post("/messages", (req:any, res:any) => {
        const chatroomRef = rtdb.ref(`/rooms/${req.body.roomId}/messages`);
        chatroomRef.push({
            name: req.body.name,
            message: req.body.message
        }, () => {
            res.json("Todo ok")
        });
    });



    app.post("/singup", (req:any, res:any) => {
        const email = req.body.email;
        const name = req.body.name;

        
        usersCollection
        .where("email", "==", email)
        .get()
        .then((searchRes:any) => {
            if (searchRes.empty) {
                usersCollection
                .add({
                    email,
                    name
                })
                .then((newUserRef:any) => {
                            console.log(newUserRef)
                            res.json({
                                id: newUserRef.id,
                                new: true
                            });
                        });
                } else {
                    res.json({
                        id: searchRes.docs[0].id
                    });
                };
            });

    });

    app.post("/singin", (req:any, res:any) => {
        const { email } = req.body;
        usersCollection
            .where("email", "==", email)
            .get()
            .then((searchRes:any) => {
                if (searchRes.empty) {
                    res.status(404).json({
                        message: `No se ha encontrado el mail "${email}" en el registro`
                    })
                } else {
                    res.json({
                        id: searchRes.docs[0].id
                    });
                };
            });
    });

    app.post("/room", (req:any, res:any) => {
        const { userId } = req.body;
        const roomIdLong = nanoid();
        usersCollection
            .doc(userId.toString())
            .get()
            .then((doc:any) => {
                if (doc.exists) {
                    const roomRef = rtdb.ref("rooms/" + roomIdLong);

                    roomRef
                        .set({
                            messages: [],
                            owner: userId
                        })
                        .then(() => {
                            const roomLongId = roomRef.key;
                            const roomId = 1000 + Math.floor(Math.random() * 999);
                            roomsCollection.doc(roomId.toString()).set({
                                rtdbRoomId: roomLongId
                            }).then(() => {
                                res.json({
                                    roomIdShort: roomId.toString(),
                                    roomIdLong
                                })
                            })
                        });
                } else {
                    res.status(401).json({
                        message: "no existís"
                    });
                };
            });
    })

    app.get("/room/:id", (req:any, res:any) => {
        const roomId = req.params.id;

        roomsCollection
        .doc(roomId)
        .get()
        .then((doc:any) => {
            if(doc.exists){
                const rtdbRoomId = doc.data().rtdbRoomId;
                res.json({
                    error: false,
                    rtdbRoomId
                });
            }else{
                res.json({
                    error: true,
                    message: `La room Nro '${roomId}' no existe.`
                });
            };
        });
    });
};

app.use(express.static("./dist"));
app.get('/{*splat}', (_req:any, res:any) => {
    res.sendFile(`${__dirname}/dist/index.html`);
})

app.listen(port, () => {
    console.log(`Running server in http://localhost:${port}`);
});

main();
