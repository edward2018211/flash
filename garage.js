// Flash
// Copyright Edward Huang 2021

import Pocket from './pocket.js';

// Class that holds all user pockets
class Garage {
    constructor() {
        this.pockets = [];
        this.backgroundImage = "";
        this.uid_generator = 0;
    }

    getPocketByUID(uid) {
        for (let pocket of this.pockets) {
            if (pocket.getUID() == uid) {
                return pocket;
            }
        }

        return 'empty';
    }

    getPocket() {
        return this.pockets;
    }

    addPocket(pocket) {
        pocket.setUID(this.uid_generator);
        this.pockets.push(pocket);
        this.uid_generator = this.uid_generator + 1;
    }

    removePocket(id) {
        this.pockets.splice(id, 1);
    }

    numPockets() {
        return this.pockets.length;
    }
}

export default function retrieveUserGarage() {
    chrome.storage.sync.get(['user_garage'], function (garage_result) {
        if (!garage_result.user_garage) {
            return null;
        }

        var garage = Object.assign(new Garage, JSON.parse(garage_result.user_garage));

        for (var i = 0; i < garage.getPocket().length; ++i) {
            garage.getPocket()[i] = Object.assign(new Pocket, garage.getPocket()[i]);
        }

        return garage;
    });
}