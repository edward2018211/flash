// MARK: - Data Structure Implementations
class Queue { 
    constructor() { 
        this.items = []; 
    } 
                  
    enqueue(element) {     
        this.items.push(element); 
    } 

    dequeue(element) {
        return this.items.shift(); 
    }

    front() { 
        return this.items[0]; 
    } 
} 

class Pocket {
    constructor() {
        this.items = new Queue();
        this.numURL = 0;
        this.pocketName = "";
    }

    constructor(name) {
        this.items = new Queue();
        this.numURL = 0;
        this.pocketName = name;
    }

    addURL(URL) {
        this.items.enqueue(URL);
        ++this.numURL; 
    }

    removeURL(URL) {
        this.items.dequeue(URL);
        --this.numURL;
    }

    flashPocket() {

    }

    dullPocket() {

    }
}

// MARK: - Global Variables


chrome.browserAction.onClicked.addListener(function(tab) {
    for (var i = 0; i < links.length; ++i) {
        chrome.tabs.create({"url": links[i]});
    }
    // Add an element: 
    // if (!extra.isEmpty()) {
    //    links[extra.front()] = URL;
    //    dequeue(extra.front());
    // } else {
    //    links.push(URL);
    // }


    // Delete an element: 
    // links[links.indexOf(URL)] = "";
    // extra.enqueue(i);
});