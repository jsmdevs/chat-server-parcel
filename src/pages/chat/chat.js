"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var state_1 = require("../../state");
var Chat = /** @class */ (function (_super) {
    __extends(Chat, _super);
    function Chat() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.messages = [];
        return _this;
    }
    Chat.prototype.connectedCallback = function () {
        var _this = this;
        if (localStorage.getItem("state")) {
            var stateLocalStorage = JSON.parse(localStorage.getItem("state"));
            state_1.state.setState(stateLocalStorage);
            state_1.state.init(state_1.state.data.roomIdLong);
        }
        this.shadow = this.attachShadow({ mode: "open" });
        state_1.state.subscribe(function () {
            var currentState = state_1.state.getData();
            _this.messages = currentState.messages;
            localStorage.setItem("state", JSON.stringify(currentState));
            _this.render();
        });
        this.render();
    };
    ;
    Chat.prototype.scrollToBottom = function () {
        var container = this.shadowRoot.querySelector(".messages-list-container");
        if (container) {
            container.scrollTop = container.scrollHeight;
        }
        ;
    };
    ;
    Chat.prototype.render = function () {
        this.shadow.innerHTML = '';
        var div = document.createElement("div");
        div.classList.add("chat-container");
        var style = document.createElement("style");
        style.textContent = "\n\n            .chat-container{\n                height: 100%;\n                margin-inline: 2rem;\n            }\n\n            .form{\n                display: flex;\n                flex-direction: column;\n                gap: 1rem;\n            }\n            .strong{\n                font-weight: 600;\n            }\n\n            .btn{\n                background-color: var(--color-btn);\n                border: none;\n                height: 50px;\n                border-radius: 5px;\n                font-size: 16px;\n                font-weight: 600;\n                transition: background .1s;\n            }\n\n            .input{\n                height: 50px;\n                font-size: 20px;\n                border-radius: 5px;\n                padding: .8rem;\n                box-sizing: border-box;\n            }\n\n            .messages-list-container{\n                overflow-y: auto;\n                height: calc(100% - 210px);\n            }\n\n            \n            .messages-list{\n                display:flex;\n                flex-direction:column;\n                gap: 1rem;\n            }\n\n            .message-container{\n                display:flex;\n                justify-content: start;\n                \n            }\n                \n            .message-container-".concat(state_1.state.data.name, "{\n                display:flex;\n                justify-content: end;\n            }\n\n            .message-container-").concat(state_1.state.data.name, " .message-name{\n                display: none;\n            }\n                \n            .message{\n                display: flex;\n                flex-direction: column;\n                min-with: 100px;\n                background-color: #D8D8D8;\n            }\n                    \n            .message-").concat(state_1.state.data.name, "{\n                background-color: #B9E97C;\n            }\n\n            .message p{\n                margin: 0;\n            }\n                \n            .message-name{\n                font-size: 13px;\n                color: #A5A5A5;\n                margin: .5rem 0rem;\n            }\n\n            .message{\n                padding: 1rem;\n                border-radius: 3px;\n            }\n        ");
        div.innerHTML = "\n            <h1>Chat</h1>\n            <p>room id: ".concat(state_1.state.data.roomIdShort, "</p>\n            <div class=\"messages-list-container\" id=\"messages\">\n            <div class=\"messages-list\">").concat(this.messages.map(function (e) {
            return "\n            \n            <div class=\"message-container message-container-".concat(e.name, "\">\n                <div>\n                    <p class=\"message-name\">").concat(e.name, "</p>\n                    <div class=\"message message-").concat(e.name, "\">\n                    <p>").concat(e.message, "</p>\n                </div>\n                </div>\n            </div>");
        }).join(""), "</div>\n            </div>\n            <form class=\"form\">\n                <input class=\"input\" type=\"text\" name=\"new-message\">\n                <button class=\"btn\">Enviar</button>\n            </form>\n        ");
        var form = div.querySelector('.form');
        form.addEventListener("submit", function (e) {
            e.preventDefault();
            var message = e.target["new-message"].value;
            state_1.state.pushMessage(message);
        });
        this.shadow.appendChild(div);
        this.shadow.appendChild(style);
        this.scrollToBottom();
    };
    ;
    return Chat;
}(HTMLElement));
;
if (!customElements.get('manos-component')) {
    customElements.define("chat-el", Chat);
}
;
