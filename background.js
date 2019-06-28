// Flash
// Copyright Edward Huang 2019

// MARK: - Data Structure Implementations

// Flash's memory allocator and deallocator with a Queue implementation for Pocket and Garage objects
class Queue {
    constructor() {
        this.items = [];
    }

    // REQUIRES: None
    // MODIFIES: this.items
    // EFFECTS: Add an empty spot index to queue
    enqueue(element) {
        this.items.push(element);
    }

    // REQUIRES: None
    // MODIFIES: this.items
    // EFFECTS: Remove an empty spot index from queue and returns it
    dequeue() {
        return this.items.shift();
    }

    // REQUIRES: None
    // MODIFIES: None
    // EFFECTS: Returns a true or false value on whether the queue is empty
    isEmpty() {
        return this.items.length == 0;
    }
}

// Class defining a pocket – a set of URLS that can be flashed or dulled
class Pocket {
    constructor() {
        this.items = new Array();
        this.itemsID = new Array();
        this.emptySpace = new Queue();
        this.numURL = 0;
        this.pocketName = "";
    }

    // REQUIRES: None
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

    // Add specified URL to pocket
    addURL(URL) {
        if (!this.emptySpace.isEmpty()) {
            this.items[this.emptySpace.dequeue()] = URL;
        } else {
            this.items.push(URL);
        }
        ++this.numURL;
    }

    // Add a set of URLs in the form of an array to the pocket
    addSetOfURL(URL) {
        for (var i = 0; i < URL.length; ++i) {
            this.addURL(URL[i]);
        }
        this.numURL += URL.length;
    }

    // Remove specified URL from pocket
    removeURL(URL) {
        for (var i = 0; i < URL.length; ++i) {
            if (URL == this.items[i]) {
                this.items[i] = "";
                this.emptySpace.enqueue(i);
            }
        }
        --this.numURL;
    }

    // Returns a boolean value on whether a session ID (the ID of a particular tab) exists
    existID(ID) {
        for (var i = 0; i < this.itemsID.length; ++i) {
            if (ID == this.itemsID[i]) {
                return true
            }
        }
        return false
    }

    // Open all URLs in pocket
    flashPocket() {
        for (var i = 0; i < this.items.length; ++i) {
            // Make sure we are not creating a tab for empty spot
            if (this.items[i] != "") {
                chrome.tabs.create({ "url": this.items[i] });
                var me = this;
                chrome.tabs.onCreated.addListener(function (tab) {
                    me.itemsID.push(tab.id);
                });
            }
        }
    }

    // Close all URLs in pocket
    dullPocket() {
        var me = this;
        chrome.tabs.query({}, function (tabs) {
            tabs.forEach(function (tab) {
                if (me.existID(tab.id)) {
                    chrome.tabs.remove(tab.id);
                }
            });
        });
        this.itemsID = [];
    }

    // REQUIRES: None
    // MODIFIES: None
    // EFFECTS: Returns the number of URLs the pocket contains
    numURLS() {
        return this.numURL;
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
        } else {
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
        } else {
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
        return this.numPockets;
    }
}


// MARK: - Google Chrome Functions

// Runs when Chrome Extension clicked on
chrome.browserAction.onClicked.addListener(function (tab) {

    //message('Hello');

    // Initialize Garage
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

    var links = ["https://mail.google.com/mail/u/0/#inbox", "https://www.instagram.com",
        "https://www.facebook.com/", "https://www.reddit.com/r/uofm/new/", "https://www.google.com/search?q=michigan+football+recruiting",
        "https://www.google.com/search?q=michigan+basketball"];
    var pocket = new Pocket();
    pocket.setName = "Social";
    pocket.addSetOfURL(links);

    // Get from local storage with key
    chrome.storage.sync.get(['username'], function (result) {
        // console.log('Value currently is ' + result.key);

        if (result.username == "Edward") {
            pocket.addURL("https://github.com/Avik-Jain/100-Days-Of-ML-Code");
        }
    });

    pocket.flashPocket();

    //$("#body").css('background-image', url('../wallpapers/aerial - clouds.jpg'));
});