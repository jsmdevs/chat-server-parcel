
export class NavBar extends HTMLElement {
    constructor() {
        super();
        this.render();
    };

    render() {
        const shadow = this.attachShadow({ mode: "open" });
        const div = document.createElement("div");
        const style = document.createElement("style");

        div.innerHTML = `
                <div class="navbar"></div>
            `;

        style.textContent = `
                .navbar{
                    height: 50px;
                    background-color: #FF8282;
                }
            `;

        shadow.appendChild(style);
        shadow.appendChild(div);
    };
};

customElements.define("navbar-element", NavBar);
