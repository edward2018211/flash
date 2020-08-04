// Flash
// Copyright Edward Huang 2019

import {Pocket} from "./common.mjs";

chrome.runtime.onInstalled.addListener(() => {
    //load some test data pockets
    loadTestPockets();
});

function loadTestPockets() {
    let pockets = [];
    for (let i = 0; i < 3; i++) {
        let pocket = new Pocket();
        pocket.name = "pocket " + i;
        pocket.addSetOfURL([
            "google.com",
            "youtube.com"
        ])
        pockets.push(pocket);
    }
    chrome.storage.sync.set({pockets: pockets})
}

// Runs when Chrome Extension clicked on
chrome.browserAction.onClicked.addListener(function (tab) {
    // chrome.tabs.create({'url': 'chrome-extension://ahleapljgblfjbadnmihppmnoeddejac/options.html'});

    //message('Hello');

    // Initialize Garage
    /**
     var garage = new Garage();

     if (garage.firstTime) {
        // Ask user for their name
        garage.setUserName("Edward");

        // Save in local storage
        chrome.storage.sync.set({ 'username': garage.userName }, function () {
            // Notify that we saved.
            message('Settings saved');
        });
    }
     */
  /*  var links = ["https://mail.google.com/mail/u/0/#inbox", "https://www.instagram.com",
        "https://www.facebook.com/", "https://www.reddit.com/r/uofm/new/", "https://www.google.com/search?q=michigan+football+recruiting",
        "https://www.google.com/search?q=michigan+basketball"];
    var pocket = new Pocket();
    pocket.setName("Social");
    pocket.addSetOfURL(links);*/

    /**
    // Get from local storage with key
    chrome.storage.sync.get(['username'], function (result) {
        // console.log('Value currently is ' + result.key);

        if (result.username == "Edward") {
            pocket.addURL("https://github.com/Avik-Jain/100-Days-Of-ML-Code");
        }
    });
    */

    // pocket.flashPocket();
    
    // pocket.dullPocket();
    //$("#body").css('background-image', url('assets/wallpapers/aerial - clouds.jpg'));
});
