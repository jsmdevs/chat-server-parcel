import { Router } from "@vaadin/router";
import { state } from "../../state";

export class Welcome extends HTMLElement {
    
    constructor() {
        super();
        this.render();
    }

    render() {

        const shadow = this.attachShadow({ mode: 'open' });
        const div = document.createElement('div');
        const style = document.createElement('style');
        
        div.innerHTML = `
                <h1 class="welcome__title">Bienvenido</h1>
                <form class="fieldset">
                    <div class="fieldset">
                        <label class="fieldset__name">email</label>
                        <input class="input input-email" type="email" required>
                    </div>
                    <div class="fieldset">
                        <label class="fieldset__name">nombre</label>
                        <input class="input input-name" type="name" required>
                    </div>
                    <div class="fieldset">
                        <label class="fieldset__name">acción</label>
                        <select class="selectAccion" name="select">
                        <option value="singin">Iniciar sesión</option>
                          <option value="singup">Resgistrarse</option>
                        </select>
                    </div>
                    </div>
                    <div class="fieldset">
                        <label class="fieldset__name">room</label>
                        <select class="selectRoom" name="select">
                          <option value="nuevoRoom">Nuevo room</option>
                          <option value="roomExistente">Room existente</option>
                        </select>
                    </div>
                    <div class="fieldset roomIdEl">
                <label class="fieldset__name">room id</label>
                <input class="input input-room_id" type="number" placeholder="AXFTR1">
            </div>
            <button class="btn">Comenzar</button>
                </form>
            `;

        style.textContent = `
            @import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&display=swap');

            .welcome{
                display: flex;
                flex-direction: column;
                font-family: "Roboto", sans-serif;
                margin-inline: 30px ;
                gap: 1rem;
            }

            .welcome__title{
                font-size: 28px;
                font-weight: 600;
            }

            .fieldset{
                display: flex;
                flex-direction: column;
                justify-content: center;
                gap: .8rem;
            }

            .btn{
                background-color: var(--color-btn);
                border: none;
                height: 50px;
                border-radius: 5px;
                font-size: 16px;
                font-weight: 600;
                transition: background .1s;
                width: 100%;
            }

            .btn:active{
                background-color: #84a6d4;
            }

            .input, select{
                height: 50px;
                font-size: 20px;
                border-radius: 5px;
                padding: .8rem;
                box-sizing: border-box;
            }

            .roomIdEl{
                display: none;
            }

            .active{
                display: inherit;
            }
        `;

        div.classList.add('welcome');
        shadow.appendChild(div);
        shadow.appendChild(style)
        const btn = div.querySelector(".btn");
        const inputName = div.querySelector(".input-name") as HTMLInputElement;
        const inputEmail = div.querySelector(".input-email") as HTMLInputElement;
        const roomIdEl = div.querySelector(".roomIdEl") as HTMLElement

        const selectRoom = div.querySelector(".selectRoom") as HTMLSelectElement;

        selectRoom.addEventListener('change', (e: Event) => {
            const target = e.target as HTMLSelectElement;
            const valueSelect = target.value;
            if (valueSelect == "roomExistente") {
                roomIdEl.classList.add("active")
            } else {
                roomIdEl.classList.remove("active");
            }

        });


        btn?.addEventListener('click', () => {
            const accionEl = div.querySelector(".selectAccion") as HTMLSelectElement;
            const roomIdEl = div.querySelector(".input-room_id") as HTMLInputElement;
            const roomId = roomIdEl.value;
            const roomValue = selectRoom.value;
            const registerValue = accionEl.value;
            const name = inputName.value;
            const email = inputEmail.value;
            state.processAction(registerValue, roomValue, name, email, roomId);
            localStorage.removeItem("state");

            Router.go("/chat");
            // state.processAction()
            // if (accionEl.value == "singup") {
            //     state.createRoom();
            // } else if (accionEl.value == "singin") {
            //     state.joinRoom();
            // }


            // if (name.length > 0) {
            //     state.setName(name);
            //     Router.go('/chat');
            // } else {
            //     alert('No se ingresó ningún nombre')
            // };
        });
    };
};

customElements.define('welcome-el', Welcome);