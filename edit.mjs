// Flash
// Copyright Edward Huang 2021

// Retrieves from storage and adds pockets
document.addEventListener('DOMContentLoaded', function() {
    // Get from local storage with key
    chrome.storage.sync.get(['pocket_request'], function (pocket_result) {
        var pocket_generator = document.getElementById('pocket_generator');
        var pocket_request = pocket_result.pocket_request;
        pocket_generator.appendChild(document.createTextNode('UID: ' + pocket_request));

        chrome.storage.sync.get(['user_garage'], function (garage_result) {
            var garage = Object.assign(new Garage, JSON.parse(garage_result.user_garage));
            var pocket = Object.assign(new Pocket, garage.getPocketByUID(pocket_request));
            var card = card_builder(pocket);
            pocket_generator.appendChild(card);
        });
    });
});