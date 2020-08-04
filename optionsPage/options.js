import {loadPockets} from "/src/common.mjs";

// loaded as array of pockets
let pockets;

document.addEventListener('DOMContentLoaded', () => {
    loadPockets(loadedPockets => {
        pockets = loadedPockets;
        showPockets()
    })
})


function showPockets() {
    const pocketContainer = document.getElementById("pocket-container");
    const template = document.getElementById("pocket-template");
    pockets.forEach((pocket) => {
        console.log(pocket);
        const pocketCard = template.content.cloneNode(true);
        pocketCard.querySelector(".pocket-name").innerText = pocket.getName();
        pocketCard.querySelector(".pocket-message").innerText = "" + pocket.numURLs() + " items stored";
        pocketContainer.appendChild(pocketCard);
    })
}
