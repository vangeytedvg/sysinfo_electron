const { fail } = require('assert');
const { app, BrowserWindow, ipcMain, dialog, shell} = require('electron');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { currentLoad, cpu, cpuCurrentSpeed, mem, memLayout } = require('systeminformation');

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


/***************************** PRINTING SUPPORT */
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

/**
 * Normal print
 */
ipcMain.handle("print-page", async (_, data) => {
    let win = BrowserWindow.getFocusedWindow();
    win.webContents.print(options, (success, failureReason) => {
        if (!success) console.log(failureReason);
        console.log("Done")
    })
})

/**
 * PDF print
 * This method will first as the path to the new file, then save it at
 * the selected location.
 */
ipcMain.handle("print-page-pdf", async (_, data) => {
    let win = BrowserWindow.getFocusedWindow();
    let options = {
        title: "Select where the PDF file should be saved",
        //defaultPath: "c:/users/absolute/path",
        buttonLabel: "Generate PDF",
        filters: [
            { name: 'PDF Files', extensions: ['pdf'] }
        ]
    }
    await dialog.showSaveDialog(options).then(filename => {        
        const { canceled, filePath } = filename;
        if (!canceled) {            
            // Anonymous method with promise        
            win.webContents.printToPDF({}).then(data => {
                fs.writeFile(filePath, data, (error) => {
                  if (error) throw error
                  console.log(`Wrote PDF successfully to ${filePath}`)
                  // Show the created file.
                  shell.openExternal(filePath)
                  return filePath
                })
              }).catch(error => {                                            
                console.log(`Failed to write PDF to ${filePath}: `, error)
                return error
              })
        }
    })
})


/***************************** SYSINFO SUPPORT */
/**** CPU */
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

/**** MEMORY */
ipcMain.handle("mem-system-info", async(_, data) => {
    const mem_info = await mem();
    return mem_info;
})

ipcMain.handle("mem-layout", async(_, data) => {
    const mem_info = await mem();
    return mem_info;
})

/***************************** WINDOW SUPPORT */
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
