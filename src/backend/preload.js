/**
 * preload.js
 * This file is executed before the index.html is rendered.
 * Created : 26/11/2022
 */
const os = require("os")
const { ipcRenderer, contextBridge } = require('electron')
const { cp } = require("fs")

/**
 * These are the functions that are exposed to the main process.
 *      - cpu-get (returns the cpu info)
 */
const API = {
    window: {
        close_window: () => ipcRenderer.send("app-close"),
        minimize_window: () => ipcRenderer.send("app-minimize"),
        maximize_window: () => ipcRenderer.send("app-maximize"),
    },
    cpuUsage: (data) => ipcRenderer.invoke("cpu-get-load", "get usage"),
    cpuSpeed: (data) => ipcRenderer.invoke("cpu-speed", "get speed"),
}

/**
 * Expose the API
 */
contextBridge.exposeInMainWorld("app", API) 