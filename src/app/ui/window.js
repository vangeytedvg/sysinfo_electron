/**
 * window.js
 * Window specific operations (minimize, maximize, close)
 * created : 26/11/2022
 */


const MINIMIZE_WINDOW = document.getElementById("minimize");
const MAXIMIZE_WINDOW = document.getElementById("maximize");
const CLOSE_WINDOW = document.getElementById("close-app");

MINIMIZE_WINDOW.addEventListener("click", minimizeWindow);
MAXIMIZE_WINDOW.addEventListener("click", maximizeWindow);
CLOSE_WINDOW.addEventListener("click", closeWindow);

/**
 * Implementation of the event handlers
 */
function minimizeWindow() {
    app.window.minimize_window();
}

function closeWindow() {
    app.window.close_window();
}

function maximizeWindow() {
    console.log("PWAAAKAKAK")
    app.window.maximize_window();
}