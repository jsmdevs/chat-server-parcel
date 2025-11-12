import { Router } from "@vaadin/router";

export function initRouter() {
    const rootEl = document.querySelector(".root");
    if (rootEl) {
        const router = new Router(rootEl);
        router.setRoutes([
            { path: '/', component: 'welcome-el' },
            { path: '/chat', component: 'chat-el' },
            { path: '(.*)', component: 'welcome-el' }
        ]);
    } else {
        console.error("Elemento .root no encontrado");
    }
}
