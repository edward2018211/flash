// MARK: - Data Structure Implementations

// Class utilized to effectively reuse memory in both Pocket and Garage objects
class Queue { 
    constructor() { 
        this.items = [];
    } 
                  
    enqueue(element) {     
        this.items.push(element); 
    } 

    dequeue() {
        return this.items.shift(); 
    }

    isEmpty() {
        return this.items.length == 0;
    }
} 

// Class defining a pocket – a set of URLS that can be flashed or dulled
class Pocket {
    constructor() {
        this.items = [];
        this.itemsID =[];
        this.emptySpace = new Queue();
        this.numURL = 0;
        this.pocketName = "";
    }

    setName(name) {
        this.pocketName = name;
    }

    getName() {
        return this.pocketName;
    }

    addURL(URL) {
        if (!this.emptySpace.isEmpty()) {
            this.items[this.emptySpace.dequeue()] = URL;
        } else {
            this.items.push(URL);
        }
        ++this.numURL; 
    }

    addSetOfURL(URL) {
        for (var i = 0; i < URL.length; ++i) {
            this.addURL(URL[i]);
        }
        this.numURL += URL.length;
    }

    removeURL(URL) {
        for (var i = 0; i < URL.length; ++i) {
            if (URL == this.items[i]) {
                this.items[i] = "";
                this.emptySpace.enqueue(i);
            }
        }
        --this.numURL;
    }

    existID(ID) {
        for (var i = 0; i < this.id.length; ++i) {
            if (ID == this.id[i]) {
                return true
            }
        }
        return false
    }

    flashPocket() {
        for (var i = 0; i < this.items.length; ++i) {
            // Make sure we are not creating a tab for empty spot
            if (this.items[i] != "") {
                chrome.tabs.create({"url": this.items[i]});
                this.itemsID.push();
            }
        }
    }

    dullPocket() {
        chrome.tabs.query({},function(tabs){     
            tabs.forEach(function(tab){
              if (this.existID(tab.id)) {
                  chrome.tabs.remove(tab.id);
              }
            });
        });
        this.itemsID = [];
    }
}

// Class that holds all of a user's pockets
class Garage {
    constructor() {
        this.items = [];
        this.numPockets = 0;
        this.emptySpace = new Queue();
    }

    addPocket(pocket) {
        if (!this.emptySpace.isEmpty()) {
            this.items[this.emptySpace.dequeue()] = pocket;
        } else {
            this.items.push(pocket);
        }
        ++this.numPockets; 
    }

    removePocket(pocket) {
        var space = this.items.indexOf(pocket);
        this.items[space] = "";
        this.emptySpace.enqueue(space);
        --this.numPockets;
    }
}

// Function runs when Chrome Extension clicked on
chrome.browserAction.onClicked.addListener(function(tab) {
    var links = ["https://mail.google.com/mail/u/0/#inbox", "https://www.instagram.com", 
    "https://www.facebook.com/", "https://www.reddit.com/r/uofm/new/", "https://www.google.com/search?q=michigan+football+recruiting", 
    "https://www.google.com/search?q=michigan+basketball"];
    var pocket = new Pocket();
    pocket.setName = "Social Pocket";
    pocket.addSetOfURL(links);
    pocket.flashPocket();
    setTimeout(pocket.dullPocket(), 500)
});