import './pages/welcome/welcome.ts';
import './components/navbar.ts';
import './pages/chat/chat.ts';
import { initRouter } from './router.ts';

function main() {
    initRouter();

    // function conectarAlChatroom() {

    //     const rootEl = document.querySelector(".root");
    //     fetch(API_BASE_URL + "/chatroom", {
    //         method: "post"
    //     }).then((res) => {
    //         return res.json().
    //             then((data) => {
    //                 console.log(data.id.toLocaleUpperCase())
    //                 const chattoomsRef = ref(db, '/chatrooms/' + data.id);
    //                 onValue(chattoomsRef, (snapshot) => {
    //                     const result = snapshot.val();
    //                     console.log(result)
    //                     if (rootEl) {
    //                         const div = document.createElement('div');
    //                         div.innerHTML = `<p>${result.contection}</p>`
    //                         rootEl.appendChild(div);
    //                     }
    //                 })
    //             });
    //     });
    // };

    // function crearUsuario() {

    //     const inputName = document.querySelector(".input-name") as HTMLInputElement;
    //     const datos = {
    //         nombre: inputName.value
    //     };

    //     console.log(JSON.stringify(datos))

    //     // fetch(API_BASE_URL + "/users", {
    //     //     method: "post",
    //     //     headers: {
    //     //         'Content-Type': 'application/json', // Indica que el cuerpo es JSON
    //     //         // Puedes agregar otros encabezados si es necesario, como autorización
    //    //     },
    //     //     body: JSON.stringify(datos)
    //     // })
    //         .then(res => {
    //             res.json()
    //                 .then((data) => {
    //                     const id = data.id;
    //                     console.log(`Sos el usuario numero ${id}`)
    //                 });
    //         });
    // }

    // const btn = document.querySelector(".btn-conectar");
    // const btnCrearUsuario = document.querySelector(".create-user");

    // btn?.addEventListener('click', () => {

    // });
    // btnCrearUsuario?.addEventListener('click', () => {
    //     crearUsuario();
    // });

};

main();