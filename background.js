// Copyright Edward Huang 2019

// MARK: - Data Structure Implementations

// Class utilized to reuse memory in Pocket and Garage objects
class Queue { 
    constructor() { 
        this.items = [];
    } 
    
    // Add empty spot to queue
    enqueue(element) {     
        this.items.push(element); 
    } 

    // Remove empty spot from queue
    dequeue() {
        return this.items.shift(); 
    }

    // Returns a true or false value on whether the queue is empty
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

    // Set pocket name
    setName(name) {
        this.pocketName = name;
    }

    // Get pocket name
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

    // Returns a boolean value on whether an ID exists
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
                chrome.tabs.create({"url": this.items[i]});
                var me = this;
                chrome.tabs.onCreated.addListener(function(tab) {
                    me.itemsID.push(tab.id);
                });
            }
        }
    }

    // Close all URLs in pocket
    dullPocket() {
        var me = this;
        chrome.tabs.query({},function(tabs){     
            tabs.forEach(function(tab){
              if (me.existID(tab.id)) {
                  chrome.tabs.remove(tab.id);
              }
            });
        });
        this.itemsID = [];
    }
}

// Class that holds all user pockets
class Garage {
    constructor() {
        this.items = [];
        this.numPockets = 0;
        this.emptySpace = new Queue();
    }

    // Add a pocket to the Garage
    addPocket(pocket) {
        if (!this.emptySpace.isEmpty()) {
            this.items[this.emptySpace.dequeue()] = pocket;
        } else {
            this.items.push(pocket);
        }
        ++this.numPockets; 
    }

    // Remove a pocket from the Garage
    removePocket(pocket) {
        var space = this.items.indexOf(pocket);
        this.items[space] = "";
        this.emptySpace.enqueue(space);
        --this.numPockets;
    }
}


// MARK: - Google Chrome Functions

// Runs when Chrome Extension clicked on
chrome.browserAction.onClicked.addListener(function(tab) {
    var links = ["https://mail.google.com/mail/u/0/#inbox", "https://www.instagram.com", 
    "https://www.facebook.com/", "https://www.reddit.com/r/uofm/new/", "https://www.google.com/search?q=michigan+football+recruiting", 
    "https://www.google.com/search?q=michigan+basketball"];
    var pocket = new Pocket();
    pocket.setName = "Social";
    pocket.addSetOfURL(links);
    pocket.flashPocket();
    //pocket.dullPocket();
});