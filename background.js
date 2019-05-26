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


var links = ["https://mail.google.com/mail/u/0/#inbox",
            "https://www.instagram.com/", "https://www.facebook.com/", "https://www.reddit.com/r/uofm/new/",
            "https://www.google.com/search?q=michigan+football+recruiting", "https://www.google.com/search?q=michigan+basketball"];
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