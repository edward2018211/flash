// Flash
// Copyright Edward Huang 2021

import Pocket from './pocket.js';
import retrieveUserGarage from './garage.js';

// Retrieves from storage and adds pockets
document.addEventListener('DOMContentLoaded', function() {
    // Get from local storage with key
    chrome.storage.sync.get(['pocket_request'], function (pocket_result) {
        var pocket_generator = document.getElementById('pocket_generator');
        var edit_title = document.getElementById('edit_name');
        var pocket_request = pocket_result.pocket_request;

        var garage = retrieveUserGarage();
        var pocket = garage.getPocketByUID(pocket_request)
        var card = card_builder(pocket);
        pocket_generator.appendChild(card);
        edit_title.appendChild(document.createTextNode('Edit ' + pocket.getName()));
    });
});