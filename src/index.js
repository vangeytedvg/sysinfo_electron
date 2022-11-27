const { app, BrowserWindow, ipcMain } = require('electron');
const { cp } = require('fs');
const os = require('os');
const path = require('path');
const { currentLoad, cpu, cpuCurrentSpeed } = require('systeminformation');

let window;
let maxiwin = false;

/* Specific system information 
    const si = require('systeminformation');
    si.cpu().then(data => console.log(data.brand));
    si.mem().then(data => console.log(data.free))
    si.osInfo().then(data => console.log(data.distro))
    //si.usb().then(data => console.log(data))
    si.wifiNetworks().then(data => console.log(data))
    si.audio().then(data => console.log(data))
*/

app.whenReady().then(main);

/**
 * Create the main window, this function also looks in the current
 * directory for the app's icon.
 */
async function main() {
    window = new BrowserWindow({
        transparent: true,
        width: 600,
        height: 500,
        icon: path.join(__dirname, 'icon.ico'),
        resizable: true,
        show: false,
        autoHideMenuBar: false,
        frame: false,
        webPreferences: {
            devTools: true,
            sandbox: false,
            nodeIntegration: true,
            preload: path.join(__dirname, '/backend/preload.js')
        }
    })

    window.on('ready-to-show', window.show);
    // Load the html ui
    //window.loadURL('https://www.google.be')
    window.loadFile(path.join(__dirname, '/app/ui/index.html'));
}

/* Handle messages from the renderer process */

/** renderer ==> main with return value from main */
ipcMain.handle("cpu-get", async (_, data) => {
    const usage = await currentLoad();
    //const speed = await cpuCurrentSpeed();
    //const celcius = await cpuCurrentSpeed();
    return usage;
})

ipcMain.handle("cpu-speed", async (_, data) => {
    const speed = await cpuCurrentSpeed();
    return speed;
})

ipcMain.handle('cpu-type', async (_, data) => {
    const cpu_info = await cpu();
    return cpu_info;
})

/** Window events (renderer process ==> main process), no return value from main*/
ipcMain.on("app-close", () => {
    app.quit();
});

ipcMain.on("app-minimize", () => {
    window.minimize();
});

