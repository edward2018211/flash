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


var links = ["https://google.com", "https://espn.com", "https://nytimes.com"];
var extra = new Queue();

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