/**
 * cpurenderer.js
 * Link between the HTML and main process (index.js in this case)
 * created : 26/11/2022
 */

/**
 * Get references to ui elements
 */
const CPU_SPEED_LABEL = document.getElementById("speed")
const CPU_MINIMUM_SPEED_LABEL = document.getElementById("minspeed")
const CPU_MAXIMUM_SPEED_LABEL = document.getElementById("maxspeed")
const CPU_CORES_LABEL = document.getElementById("cores")

const CPU_MANUFACTURER = document.getElementById("manufacturer")
const CPU_BRAND = document.getElementById("brand")
const CPU_PROCESSORS = document.getElementById("processors")
const CPU_STEPPING = document.getElementById("stepping")
const CPU_VIRTUALIZATION = document.getElementById("virtualization")
const CPU_PERFORMANCECORES = document.getElementById("performancecores")
const CPU_VOLTAGE = document.getElementById("voltage")
const CPU_MODEL = document.getElementById("model")

updateUI()

/**
 * Get cpu speed
 */
async function getCpuSpeed() {
    const speed = await app.cpuSpeed("ee");
    const ghz = speed.speed;
    CPU_SPEED_LABEL.innerText = `${speed.avg}`
    CPU_MAXIMUM_SPEED_LABEL.innerText = `${speed.max}`
    CPU_MINIMUM_SPEED_LABEL.innerText = `${speed.min}`
    CPU_CORES_LABEL.innerText = `${speed.cores.length}`
}

/**
 * Get CPU Manufacturor details
 */
async function getCpuManuFacturer() {
    console.log("Fetching Data")

    /* Get the information */
    /* app.cpuManufacturer calls preload.js */
    const manu = await app.cpuManufacturer()
    console.log(manu);
    toggleSpinner();
    CPU_MANUFACTURER.innerText = `${manu.manufacturer}`
    CPU_BRAND.innerText = `${manu.brand}`
    CPU_SPEED_LABEL.innerText = `${manu.speed}`
    CPU_MAXIMUM_SPEED_LABEL.innerText = `${manu.speedMax}`
    CPU_MINIMUM_SPEED_LABEL.innerText = `${manu.speedMin}`
    CPU_CORES_LABEL.innerText = `${manu.physicalCores}`
    CPU_PROCESSORS.innerText = `${manu.processors}`
    CPU_STEPPING.innerText = `${manu.stepping}`
    CPU_VIRTUALIZATION.innerText = `${manu.virtualization}`
    CPU_VOLTAGE.innerText = `${manu.voltage}`
    CPU_PERFORMANCECORES.innerText = `${manu.performanceCores}`
    CPU_MODEL.innerText = `${manu.model}`
}

function toggleSpinner() {
    CPU_MANUFACTURER.classList.toggle("spin")
    CPU_BRAND.classList.toggle("spin")
    CPU_SPEED_LABEL.classList.toggle("spin")
    CPU_MAXIMUM_SPEED_LABEL.classList.toggle("spin")
    CPU_MINIMUM_SPEED_LABEL.classList.toggle("spin")
    CPU_CORES_LABEL.classList.toggle("spin")
    CPU_PROCESSORS.classList.toggle("spin")
    CPU_STEPPING.classList.toggle("spin")
    CPU_VIRTUALIZATION.classList.toggle("spin")
    CPU_PERFORMANCECORES.classList.toggle("spin")
    CPU_VOLTAGE.classList.toggle("spin")
    CPU_MODEL.classList.toggle("spin")
}

/**
 * Update ui
 */
async function updateUI() {
    //await getCpuSpeed()
    await getCpuManuFacturer();
}