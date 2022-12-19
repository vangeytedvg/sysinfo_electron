/**
 * memory.js
 * Renderer process for the memory details page
 * Created : 19/12/2022 by DVG
 */

console.log("Memory Renderer Loaded")

const MEM_AVAILABLE_MEMORY = document.getElementById("totalmemory")
const MEM_USED_MEMORY = document.getElementById("usedmemory")
const MEM_FREE_MEMORY = document.getElementById("freememory")
const MEM_SWAP_TOTAL = document.getElementById("swaptotal")
const MEM_SWAP_USED = document.getElementById("swapused")
const MEM_SWAP_FREE = document.getElementById("swapfree")


updateUI()

async function getMemoryInformation() {
    const memo = await app.memSystemMemory()
    toggleSpinner()
    console.log(memo)
    MEM_AVAILABLE_MEMORY.innerText = `${Math.round((memo.total / 1000000)/1000)} Gb`
    MEM_USED_MEMORY.innerText = `${Math.round(memo.used / 1000000000)} Gb`
    MEM_FREE_MEMORY.innerText = `${Math.floor(memo.free / 1000000000)} Gb`
    MEM_SWAP_TOTAL.innerText = `${memo.swaptotal / 1000000000} Gb`
    MEM_SWAP_USED.innerText = `${memo.swapused / 1000000000} Gb`
    MEM_SWAP_FREE.innerText = `${memo.swapfree / 1000000000} Gb`
}

async function updateUI() {
    //await getCpuSpeed()
    await getMemoryInformation()
}

function toggleSpinner() {
    MEM_AVAILABLE_MEMORY.classList.toggle("spin")
    MEM_USED_MEMORY.classList.toggle("spin")
    MEM_FREE_MEMORY.classList.toggle("spin")
    MEM_SWAP_TOTAL.classList.toggle("spin")
    MEM_SWAP_USED.classList.toggle("spin")
    MEM_SWAP_FREE.classList.toggle("spin")
}