// Flash
// Copyright Edward Huang 2021

// Class that holds all user pockets
export default class Garage {
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