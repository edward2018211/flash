// Flash
// Copyright Edward Huang 2021

// Class defining a pocket – a set of URLS that can be flashed
export class Pocket {
    constructor() {
        this.items = []; // Stores the links that the pocket holds
        this.name = '';
        this.uid = ''; // Unique ID
    }

    setUID(uid) {
        this.uid = uid;
    }

    getUID() {
        return this.uid;
    }

    setName(name) {
        this.name = name;
    }

    getName() {
        return this.name;
    }

    addURL(URL) {
        this.items.push(URL);
    }

    // REQUIRES: URL is an array of strings
    // MODIFIES: this.items
    // EFFECTS: Add a set of URLs to pocket
    addSetOfURL(URL) {
        for (var i = 0; i < URL.length; ++i) {
            this.addURL(URL[i]);
        }
    }

    removeURL(id) {
        this.items.splice(id, 1);
    }

    existURL(URL) {
        return this.items.has(URL);
    }

    flashPocket() {
        for (let url of this.items) {
            chrome.tabs.create({ "url": url }, function(tab) {
                console.log(tab.id);
            });
        }
    }

    numURLs() {
        return this.items.length;
    }
}