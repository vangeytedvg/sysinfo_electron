/**
 * renderer.js
 * Link between the HTML and main process (index.js in this case)
 * created : 26/11/2022
 * lm      : 27/11/2022 Added cpu usage coloring
 */

/**
 * Get references to ui elements
 */
//const CPU_USAGE_TEXT = document.getElementById("used-cpu");
//const PROGRESS_BAR_VALUE = document.getElementById("inner-bar");
//const PROGRESS_BAR_VALUE_LABEL = document.getElementById("inner-pct");
const CPU_SPEED_LABEL = document.getElementById("speed")
const CPU_MINIMUM_SPEED_LABEL = document.getElementById("minspeed")
const CPU_MAXIMUM_SPEED_LABEL = document.getElementById("maxspeed")
const CPU_CORES_LABEL = document.getElementById("cores")


updateUI()

/**
 * Get cpu speed
 */
async function getCpuSpeed() {
    const speed = await app.cpuSpeed("ee");
    const ghz = speed.speed;
    console.log("SPEED", speed);
    CPU_SPEED_LABEL.innerText = `${speed.avg}`
    CPU_MAXIMUM_SPEED_LABEL.innerText = `${speed.max}`
    CPU_MINIMUM_SPEED_LABEL.innerText = `${speed.min}`
    CPU_CORES_LABEL.innerText = `${speed.cores.length}`
}

/**
 * Update ui
 * This method updates the ui and also colorizes the progress bar
 * based on the usage percentage
 * @param {*} percentage 
 */
async function updateUI() {    
    await getCpuSpeed()
}
