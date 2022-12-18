const { fail } = require('assert');
const { app, BrowserWindow, ipcMain } = require('electron');
const { cp } = require('fs');
const os = require('os');
const path = require('path');
const { currentLoad, cpu, cpuCurrentSpeed } = require('systeminformation');

let window;
let maxiwin = true;  // Tracks the state of the window

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
        width: 1024,
        height: 864,
        minWidth: 500,
        icon: path.join(__dirname, 'icon.ico'),
        resizable: true,
        show: false,
        autoHideMenuBar: false,
        frame: false,
        webPreferences: {
            devTools: true,
            sandbox: false,
            nodeIntegration: true,
            /* The preload script lets us commincate between the main process and the renderer*/
            preload: path.join(__dirname, './backend/preload.js')
        }
    })

    window.on('ready-to-show', window.show);
    // Load the html ui
    //window.loadURL('https://www.google.be')
    window.loadFile(path.join(__dirname, '/app/ui/index.html'));
}

/* Handle messages from the renderer process */

var options = {
     silent: false,
     printBackground: false,
     color: true,
     margin: {
         marginType: 'printableArea'
     },
     landscape: false,
     pagesPerSheet: 1,
     collate: false,
     copies: 1,
     header: "DenkaTech System Information",
     footer: "Copyright (2022-2023)"
}

ipcMain.handle("print-page", async(_,data) => {
    let win = BrowserWindow.getFocusedWindow();
    console.log("DDDDDDD")
    win.webContents.print(options, (success, failureReason) => {
        if (!success) console.log(failureReason);
        console.log("Done")
    })
})
// current.addEventListener('click', (event) => {
//     let win = BrowserWindow.getFocusedWindow();
//     win.webContents.printToPDF(options, (success, failureReason) => {
//         if (!success) console.log(failureReason);
//     })
// })
/** CPU RELATED METHODS ********************************************************************/
 
/** 
 * Get the current load of the cpu
 */ 
ipcMain.handle("cpu-get-load", async (_, data) => {
    const usage = await currentLoad();
    return usage;
})

/**
 * Get the total speed of the CPU 
 */
ipcMain.handle("cpu-speed", async (_, data) => {
    const speed = await cpuCurrentSpeed();
    return speed;
})

/**
 * CPU Generic information
 */
ipcMain.handle('cpu-type', async (_, data) => {
    const cpu_info = await cpu();    
    return cpu_info;
})

/** Window events (renderer process ==> main process), no return value from main*/
ipcMain.on("app-close", () => {
    app.quit();
});

/**
 * Minimize window
 */
ipcMain.on("app-minimize", () => {
    window.minimize();
});

/**
 * Maximize en restore main window 
 */
ipcMain.on("app-maximize", () => {
    if (maxiwin) {
        maxiwin = false;
        window.maximize();
    } else if (!maxiwin) {
        maxiwin = true;
        window.unmaximize();
    }
});
