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
exports.NavBar = void 0;
var NavBar = /** @class */ (function (_super) {
    __extends(NavBar, _super);
    function NavBar() {
        var _this = _super.call(this) || this;
        _this.render();
        return _this;
    }
    ;
    NavBar.prototype.render = function () {
        var shadow = this.attachShadow({ mode: "open" });
        var div = document.createElement("div");
        var style = document.createElement("style");
        div.innerHTML = "\n                <div class=\"navbar\"></div>\n            ";
        style.textContent = "\n                .navbar{\n                    height: 50px;\n                    background-color: #FF8282;\n                }\n            ";
        shadow.appendChild(style);
        shadow.appendChild(div);
    };
    ;
    return NavBar;
}(HTMLElement));
exports.NavBar = NavBar;
;
customElements.define("navbar-element", NavBar);
