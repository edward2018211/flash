// Class defining a pocket – a set of URLS that can be flashed or dulled
export class Pocket {
    items;
    name;

    constructor() {
        // this.items uses the URL as its key and the itemsID as its value
        // If no itemsID is assigned yet, the value is an empty string
        this.items = new Map();
        this.name = "";
    }

    setName(name) {
        this.name = name;
    }

    getName() {
        return this.name;
    }

    addURL(URL) {
        // There is no need to check if the URL already exists because it will replaced anyways
        this.items.set(URL, "");
    }

    addSetOfURL(URL) {
        for (var i = 0; i < URL.length; ++i) {
            this.addURL(URL[i]);
        }
    }

    removeURL(URL) {
        if (this.existURL(URL)) {
            this.items.delete(URL);
        }
    }

    existURL(URL) {
        for (const key of this.items.keys()) {
            if (key == URL) {
                return true;
            }
        }
        return false;
    }

    existID(ID) {
        for (const value of this.items.values()) {
            if (value == ID) {
                return true;
            }
        }
        return false;
    }

    flashPocket() {
        var me = this;
        for (const key of this.items.keys()) {
            chrome.tabs.create({"url": key}, function (tab) {
                console.log(tab.id);
                me.items.set(key, tab.id);
            });
        }
    }

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

    numURLS() {
        return this.items.size();
    }

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
export class Garage {
    constructor() {
        this.items = [];

        this.backgroundImage = "";
        this.userName = "";
        this.firstTime = true;
    }

    readCurrentTabsOpen() {
        if (this.firstTime) {
            // Reads and displays current tabs on home page
            this.firstTime = false;
        }
    }

    welcomeMessage() {
        if (this.userName == "") {
            return "" + this.determineTimeOfDay();
        } else {
            return "" + this.determineTimeOfDay() + ", " + this.userName;
        }
    }

    determineTimeOfDay() {
        // If morning, return good morning
        // If afternoon, return afternoon (Inclusive of noon)
    }

    setBackgroundImage(path) {
        this.backgroundImage = path;
        // Actually change the image in options.html
    }

    getBackgroundImage() {
        return this.backgroundImage;
    }

    restoreDefaultBackground() {
        // Check that this.backgroundImage is not already blur-breathtaking-clouds.jpg
        // Set background to blur-breathtaking-clouds.jpg
    }

    setUserName(name) {
        this.userName = name;
    }

    getUserName() {
        return this.userName;
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
        // Check if pocket exists
        this.items[space] = "";
        this.emptySpace.enqueue(space);
        --this.numPockets;
    }

    numPockets() {
        return this.numPockets.size();
    }
}

/**
 * Loads the stored array of pockets.
 * @param callback callback when pockets are loaded
 */
export function loadPockets(callback) {
    chrome.storage.sync.get(["pockets"], (result) => {
        let pockets;
        if (result.pockets === undefined) pockets = [];
        else pockets = result.pockets.map(p => Object.assign(new Pocket(), p));
        callback(pockets);
    })
}
