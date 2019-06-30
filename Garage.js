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
        return this.numPockets;
    }
}
