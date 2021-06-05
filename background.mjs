// Flash
// Copyright Edward Huang 2021

// Class defining a pocket – a set of URLS that can be flashed
class Pocket {
    constructor() {
        this.items = [];
        this.name = '';
    }

    // REQUIRES: input name must be a string
    // MODIFIES: this.pocketName
    // EFFECTS: Sets the pocket name to input name
    setName(name) {
        this.name = name;
    }

    // REQUIRES: None
    // MODIFIES: None
    // EFFECTS: Returns the pocket name
    getName() {
        return this.name;
    }

    // REQUIRES: URL must be a string
    // MODIFIES: this.items
    // EFFECTS: Adds input URL to pocket if it doesn't already exist
    addURL(URL) {
        this.items.push(URL);
    }

    // REQUIRES: URL is an array of strings
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
    removeURL(id) {
        this.items.splice(id, 1);
    }

    // REQUIRES: None
    // MODIFIES: None
    // EFFECTS: Returns a boolean value on whether a URL exists
    existURL(URL) {
        return this.items.has(URL);
    }

    // REQUIRES: None
    // MODIFIES: None
    // EFFECTS: Flash all URLs in pocket
    flashPocket() {
        for (let url of this.items) {
            chrome.tabs.create({ "url": url }, function(tab) {
                console.log(tab.id);
            });
        }
    }

    // REQUIRES: None
    // MODIFIES: None
    // EFFECTS: Returns the number of URLs the pocket contains
    numURLs() {
        return this.items.length;
    }
}

// Class that holds all user pockets
class Garage {
    constructor() {
        this.pockets = [];
        this.backgroundImage = "";
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

    getPocket() {
        return this.pockets;
    }

    // REQUIRES: None
    // MODIFIES: this.items
    // EFFECTS: Add a pocket to the Garage
    addPocket(pocket) {
        this.pockets.push(pocket);
    }

    // REQUIRES: None
    // MODIFIES: this.items
    // EFFECTS: Remove a pocket from the Garage
    removePocket(id) {
        this.pockets.splice(id, 1);
    }

    // REQUIRES: None
    // MODIFIES: None
    // EFFECTS: Returns the number of pockets the Garage contains
    numPockets() {
        return this.pockets.length;
    }
}



// Retrieves from storage and adds pockets
document.addEventListener('DOMContentLoaded', function() {
    // Get from local storage with key
    chrome.storage.sync.get(['user_garage'], function (result) {
        var pocket_generator = document.getElementById("pocket_generator");
        var no_pocket_message = "You currently don't have any pockets.";

        if (!result.user_garage) {
            pocket_generator.appendChild(document.createElement('b').appendChild(document.createTextNode(no_pocket_message)));
            return;
        }

        var garage = Object.assign(new Garage, JSON.parse(result.user_garage));

        for (let val of garage.getPocket()) {
            var pocket = Object.assign(new Pocket, val);
            var card = card_builder(pocket);
            pocket_generator.appendChild(card);
        }
    });
});

function card_builder(pocket) {
    var card_outer = document.createElement("div");
    card_outer.classList.add("card");
    card_outer.style.width = '15rem';
    card_outer.style.margin = '20px';
    
    var card_header = document.createElement("div");
    card_header.classList.add("card-header");

    var card_title = document.createElement('h5');
    card_title.classList.add('card-title');
    card_title.appendChild(document.createTextNode(pocket.getName()));

    card_header.appendChild(card_title);

    var card_body = document.createElement('div');
    card_body.classList.add('card-body');

    var card_text = document.createElement('p');
    card_text.classList.add('card-text');
    card_body.appendChild(card_text.appendChild(document.createTextNode(pocket.numURLs().toString() + ' links')));

    var container = document.createElement('div')
    container.classList.add('container', 'text-center');
    var edit_button = document.createElement('button');
    edit_button.classList.add('btn', 'btn-sm', 'btn-block', 'btn-outline-dark');
    edit_button.type = 'button';
    edit_button.appendChild(document.createTextNode('Edit'));

    var launch_button = document.createElement('button');
    launch_button.classList.add('btn', 'btn-sm', 'btn-block', 'btn-dark');
    launch_button.type = 'button';
    launch_button.appendChild(document.createTextNode('Launch'));
    launch_button.addEventListener("click", function() { pocket.flashPocket(); });

    container.appendChild(edit_button);
    container.appendChild(launch_button);

    card_body.appendChild(card_text);
    card_body.appendChild(container);

    card_outer.appendChild(card_header);
    card_outer.appendChild(card_body);
    return card_outer;
}

{/* <div class="card" style="width: 15rem; margin: 20px">
    <div class="card-header">
        <h5 class="card-title">CHEM 130</h5>
    </div>
    <div class="card-body">
        <p class="card-text">3 tabs open</p>

        <div class="container text-center">
            <button href="#" type="button" class="btn btn-sm btn-block btn-outline-dark">Edit</button>
            <button href="#" type="button" class="btn btn-sm btn-block btn-dark">Pocket</button>
        </div>
    </div>
</div> */}

// // Runs when Chrome Extension clicked on
// chrome.browserAction.onClicked.addListener(function (tab) {
//     //chrome.tabs.create({'url': 'chrome-extension://ahleapljgblfjbadnmihppmnoeddejac/options.html'});

//     //message('Hello');

//     // Initialize Garage
//     var garage = new Garage();
//     var links = ["https://mail.google.com/mail/u/0/#inbox", "https://www.instagram.com",
//         "https://www.facebook.com/", "https://www.reddit.com/r/uofm/new/", "https://www.google.com/search?q=michigan+football+recruiting",
//         "https://www.google.com/search?q=michigan+basketball"];
//     var pocket = new Pocket();
//     pocket.setName("Social");
//     pocket.addSetOfURL(links);
//     garage.addPocket(pocket);
    
//     // Store user's garage to local storage
//     // chrome.storage.sync.set({'user_garage': JSON.stringify(garage)}, function() {
//     //     console.log('Value is set to ' + JSON.stringify(garage));
//     // });

//     // Get from local storage with key
//     chrome.storage.sync.get(['user_garage'], function (result) {
//         console.log(result.user_garage);
//         var garage = Object.assign(new Garage, JSON.parse(result.user_garage));

//         for (let val of garage.getPocket()) {
//             console.log(val);
//             var pocket = Object.assign(new Pocket, val);
//             pocket.flashPocket();
//         }
//     });
    
//     //$("#body").css('background-image', url('../wallpapers/aerial - clouds.jpg'));
// });