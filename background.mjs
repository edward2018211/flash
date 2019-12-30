// Flash
// Copyright Edward Huang 2019

// MARK: Data Structure Implementations

// Class defining a pocket – a set of URLS that can be flashed or dulled
class Pocket {
    constructor() {
        // this.items uses the URL as its key and the itemsID as its value
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
        var me = this;
        for (const key of this.items.keys()) {
            chrome.tabs.create({ "url": key }, function(tab) {
                console.log(tab.id);
                me.items.set(key, tab.id);
            });
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
                    console.log("Removed");
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
    // REQUIRES: Use only after a pocket has been flashed and before it is dulled
    // MODIFIES: None
    // EFFECTS: Determines if every value of each key-value pair contains a session ID
    allHasIDAssigned() {
        for (const value of this.items.values()) {
            if (value == "") {
                return false;
            }
        }
        return true;
    }
}

// Class that holds all user pockets
class Garage {
    constructor() {
        this.items = [];
        this.numPockets = 0;
        this.emptySpace = new Queue();
        this.backgroundImage = "";
        this.userName = "";
        this.firstTime = true;
    }
    // REQUIRES: Flash to be opened for the first time
    // MODIFIES: this.firstTime
    // EFFECTS: Reads all current tabs that are open and displays them for the user to organize them into pockets
    readCurrentTabsOpen() {
        if (this.firstTime) {
            // Reads and displays current tabs on home page
            this.firstTime = false;
        }
    }
    // REQUIRES: None
    // MODIFIES: None
    // EFFECTS: Returns the welcome message to be displayed when home opened
    welcomeMessage() {
        if (this.userName == "") {
            return "" + this.determineTimeOfDay();
        }
        else {
            return "" + this.determineTimeOfDay() + ", " + this.userName;
        }
    }
    // REQUIRES: Access to user clock
    // MODIFIES: None
    // EFFECTS: Determines the time of day and returns a phrase for the welcome message
    determineTimeOfDay() {
        // If morning, return good morning
        // If afternoon, return afternoon (Inclusive of noon)
    }
    // REQUIRES: None
    // MODIFIES: this.backgroundImage
    // EFFECTS: Set the path of chosen background image
    setBackgroundImage(path) {
        this.backgroundImage = path;
        // Actually change the image in options.html
    }
    // REQUIRES: None
    // MODIFIES: None
    // EFFECTS: Get the path of the current background image
    getBackgroundImage() {
        return this.backgroundImage;
    }
    // REQUIRES: None
    // MODIFIES: this.backgroundImage
    // Uses default background 
    restoreDefaultBackground() {
        // Check that this.backgroundImage is not already blur-breathtaking-clouds.jpg
        // Set background to blur-breathtaking-clouds.jpg
    }
    // REQUIRES: None
    // MODIFIES: this.userName
    // EFFECTS: Sets the name of the user
    setUserName(name) {
        this.userName = name;
    }
    // REQUIRES: None
    // MODIFIES: None
    // EFFECTS: Get the name of the user
    getUserName() {
        return this.userName;
    }
    // REQUIRES: None
    // MODIFIES: this.items
    // EFFECTS: Add a pocket to the Garage
    addPocket(pocket) {
        if (!this.emptySpace.isEmpty()) {
            this.items[this.emptySpace.dequeue()] = pocket;
        }
        else {
            this.items.push(pocket);
        }
        ++this.numPockets;
    }
    // REQUIRES: None
    // MODIFIES: this.items
    // EFFECTS: Remove a pocket from the Garage
    removePocket(pocket) {
        var space = this.items.indexOf(pocket);
        // Check if pocket exists
        this.items[space] = "";
        this.emptySpace.enqueue(space);
        --this.numPockets;
    }
    // REQUIRES: None
    // MODIFIES: None
    // EFFECTS: Returns the number of pockets the Garage contains
    numPockets() {
        return this.numPockets.size();
    }
}

// MARK: - Google Chrome Functions

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
    var links = ["https://mail.google.com/mail/u/0/#inbox", "https://www.instagram.com",
        "https://www.facebook.com/", "https://www.reddit.com/r/uofm/new/", "https://www.google.com/search?q=michigan+football+recruiting",
        "https://www.google.com/search?q=michigan+basketball"];
    var pocket = new Pocket();
    pocket.setName("Social");
    pocket.addSetOfURL(links);

    /**
    // Get from local storage with key
    chrome.storage.sync.get(['username'], function (result) {
        // console.log('Value currently is ' + result.key);

        if (result.username == "Edward") {
            pocket.addURL("https://github.com/Avik-Jain/100-Days-Of-ML-Code");
        }
    });
    */

    pocket.flashPocket();
    
    // pocket.dullPocket();
    //$("#body").css('background-image', url('../wallpapers/aerial - clouds.jpg'));
});