// Flash
// Copyright Edward Huang 2019

// Class defining a pocket – a set of URLS that can be flashed or dulled
export default class Pocket {
    constructor() {
        // this.items uses the  URL as its key and the itemsID as its value
        // If no itemsID is assigned yet, the value is an empty string
        this.items = new Map();
        this.pocketName = "";
    }
    // REQUIRES: input name must be a string
    // MODIFIES: this.pocketName
    // EFFECTS: Sets the pocket name to input name
    setName(name) {
        this.pocketName = name;
    }
    // REQUIRES: None
    // MODIFIES: None
    // EFFECTS: Returns the pocket name
    getName() {
        return this.pocketName;
    }
    // REQUIRES: URL must be a string
    // MODIFIES: this.items
    // EFFECTS: Adds input URL to pocket if it doesn't already exist
    addURL(URL) {
        // There is no need to check if the URL already exists because it will replaced anyways
        this.items.set(URL, "");
    }
    // REQUIRES: URL must be an array of strings
    // MODIFIES: this.items
    // EFFECTS: Add a set of URLs to pocket
    addSetOfURL(URL) {
        for (var i = 0; i < URL.length; ++i) {
            this.addURL(URL[i]);
        }
    }
    // REQUIRES: URL must be a string
    // MODIFIES: this.items
    // EFFECTS: Remove specified URL from pocket
    removeURL(URL) {
        if (this.existURL(URL)) {
            this.items.delete(URL);
        }
    }
    // REQUIRES: None
    // MODIFIES: None
    // EFFECTS: Returns a boolean value on whether a URL exists
    existURL(URL) {
        for (const key of this.items.keys()) {
            if (key == URL) {
                return true;
            }
        }
        return false;
    }
    // REQUIRES: None
    // MODIFIES: None
    // EFFECTS: Returns a boolean value on whether a session ID (the ID of a particular tab) exists
    existID(ID) {
        for (const value of this.items.values()) {
            if (value == ID) {
                return true;
            }
        }
        return false;
    }
    // REQUIRES: None
    // MODIFIES: None
    // EFFECTS: Flash all URLs in pocket
    flashPocket() {
        for (const key of this.items.keys()) {
            chrome.tabs.create({ "url": key });
            //this.items.set(key, chrome.tabs.onCreated.addListener(function (tab) { return tab.id }));
        }
    }
    // REQUIRES: None
    // MODIFIES: None
    // EFFECTS: Dull all URLs in pocket
    dullPocket() {
        var me = this;
        chrome.tabs.query({}, function (tabs) {
            tabs.forEach(function (tab) {
                if (me.existID(tab.id)) {
                    chrome.tabs.remove(tab.id);
                }
            });
        });
    }
    // REQUIRES: None
    // MODIFIES: None
    // EFFECTS: Returns the number of URLs the pocket contains
    numURLS() {
        return this.items.size();
    }
}