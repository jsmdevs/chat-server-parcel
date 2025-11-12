import { state } from "../../state";

type Message = {
    name: string,
    message: string
}


class Chat extends HTMLElement {
    private shadow: ShadowRoot; // Para almacenar la referencia al Shadow Root

    connectedCallback() {

        if (localStorage.getItem("state")) {
            const stateLocalStorage = JSON.parse(localStorage.getItem("state"));
            state.setState(stateLocalStorage);
            state.init(state.data.roomIdLong);
        }

        this.shadow = this.attachShadow({ mode: "open" });
        state.subscribe(() => {
            const currentState = state.getData();
            this.messages = currentState.messages;
            localStorage.setItem("state", JSON.stringify(currentState));
            this.render();
        });

        this.render();
    };

    scrollToBottom() {
        const container = this.shadowRoot.querySelector(`.messages-list-container`);
        if (container) {
            container.scrollTop = container.scrollHeight;
        };
    };

    messages: Message[] = [];

    render() {


        this.shadow.innerHTML = '';
        const div = document.createElement("div");
        div.classList.add("chat-container");
        const style = document.createElement("style");

        style.textContent = `

            .chat-container{
                height: 100%;
                margin-inline: 2rem;
            }

            .form{
                display: flex;
                flex-direction: column;
                gap: 1rem;
            }
            .strong{
                font-weight: 600;
            }

            .btn{
                background-color: var(--color-btn);
                border: none;
                height: 50px;
                border-radius: 5px;
                font-size: 16px;
                font-weight: 600;
                transition: background .1s;
            }

            .input{
                height: 50px;
                font-size: 20px;
                border-radius: 5px;
                padding: .8rem;
                box-sizing: border-box;
            }

            .messages-list-container{
                overflow-y: auto;
                height: calc(100% - 210px);
            }

            
            .messages-list{
                display:flex;
                flex-direction:column;
                gap: 1rem;
            }

            .message-container{
                display:flex;
                justify-content: start;
                
            }
                
            .message-container-${state.data.name}{
                display:flex;
                justify-content: end;
            }

            .message-container-${state.data.name} .message-name{
                display: none;
            }
                
            .message{
                display: flex;
                flex-direction: column;
                min-with: 100px;
                background-color: #D8D8D8;
            }
                    
            .message-${state.data.name}{
                background-color: #B9E97C;
            }

            .message p{
                margin: 0;
            }
                
            .message-name{
                font-size: 13px;
                color: #A5A5A5;
                margin: .5rem 0rem;
            }

            .message{
                padding: 1rem;
                border-radius: 3px;
            }
        `

        div.innerHTML = `
            <h1>Chat</h1>
            <p>room id: ${state.data.roomIdShort}</p>
            <div class="messages-list-container" id="messages">
            <div class="messages-list">${this.messages.map((e) => {
            return `
            
            <div class="message-container message-container-${e.name}">
                <div>
                    <p class="message-name">${e.name}</p>
                    <div class="message message-${e.name}">
                    <p>${e.message}</p>
                </div>
                </div>
            </div>`;
        }).join("")}</div>
            </div>
            <form class="form">
                <input class="input" type="text" name="new-message">
                <button class="btn">Enviar</button>
            </form>
        `;

        const form = div.querySelector('.form');
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const message = e.target["new-message"].value;
            state.pushMessage(message);
        });

        this.shadow.appendChild(div);
        this.shadow.appendChild(style);
        this.scrollToBottom();
    };
};


if (!customElements.get('manos-component')) {
    customElements.define("chat-el", Chat);
};