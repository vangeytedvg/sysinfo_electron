/**
 * CPUrenderer.js
 * Link between the HTML and main process (index.js in this case)
 * created : 26/11/2022
 * lm      : 27/11/2022 Added cpu usage coloring
 */

/**
 * Get references to ui elements
 */
//const CPU_USAGE_TEXT = document.getElementById("used-cpu");
const PROGRESS_BAR_VALUE = document.getElementById("inner-bar");
const PROGRESS_BAR_VALUE_LABEL = document.getElementById("inner-pct");
const CPU_SPEED_LABEL = document.getElementById("speed-cpu");
const DROP_DOWN_MENU = document.getElementById("dropper")

/**
 * Get the cpu usage percentage
 */
async function getCpuUsage() {
    const usage = await app.cpuUsage("dd").then();    
    const usedOverall = usage.currentLoad; 
    updateUI(usedOverall);
}

/**
 * Get cpu speed
 */
async function getCpuSpeed() {
    const speed = await app.cpuSpeed("ee");
    const ghz = speed.speed;
    console.log("SPEED", speed);
    CPU_SPEED_LABEL.innerText = `${speed.max}Ghz`; 
}

/**
 * Update ui
 * This method updates the ui and also colorizes the progress bar
 * based on the usage percentage
 * @param {*} percentage 
 */
function updateUI(percentage = 0) {
    const perText = `${percentage.toFixed(1)}%`;
    let barcolor;
    // Get percentage value, put it in the val variable to avoid
    // multiple calls
    let val = percentage.toFixed(1)
    //  Adapt the bar color to the percentage
    if (val < 20) {
        barcolor ='rgba(95, 238, 29, 0.904)';
    } else if (val > 20 && val < 40 )  {    
        barcolor ='rgba(67, 187, 20, 0.466)';
    } else if (val > 40 && val < 60) {
        barcolor ='rgba(38, 231, 38, 0.589)';
    } else if (val > 60) {
        barcolor = 'rgba(226, 34, 21, 0.904)';
    }
    PROGRESS_BAR_VALUE.style.backgroundColor = barcolor;           // added by dvg
    if (percentage > 0) {
        PROGRESS_BAR_VALUE.style.width = `${percentage.toFixed(1)}%`;    
    } else {
        PROGRESS_BAR_VALUE.style.width = `${0}%`;    
    }
    PROGRESS_BAR_VALUE_LABEL.innerText = perText;                  // added by dvg
}

/**
 * Helper function 
 */
async function getAll() {
    await getCpuUsage().then(await getCpuSpeed());    
}

setInterval(getAll, 2000);