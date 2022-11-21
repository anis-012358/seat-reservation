'use strict'
import * as constant from './constans.js';

/** The class is an implementation of the best available adjacent seats reservation algorithm. */
export class SeatReservationAlgoritm {
    /**
     * @param {array} freeSeats - Contains Seat objects
     * @param {number} nrOfVisitors - Must be an integer
     * @param {array} maxSeatNumberInRow - Contains the seat object with the max nr in each row
     */
    constructor(freeSeats, nrOfVisitors, maxNumberInRow) {
        this.freeSeats = freeSeats;
        this.nrOfVisitors = nrOfVisitors;
        this.maxNumberInRow = maxNumberInRow;
        this.bestSeats = null;
    }

    /**
     * Looking for the best available adjacent seats.
     * @returns {object}  The best available adjacent seats and its price category
     */
    reserveSeats() {
        let from = 0;
        let to = this.nrOfVisitors;
        const freeSeatsNr = this.freeSeats.length;

        while ( to < freeSeatsNr-1) {
            const seatIndexes =  this.findNextToEachOther(from, to);

            if (seatIndexes == null)
                return this.bestSeats;

            [from, to] = seatIndexes;

            if (this.bestSeats === null) {
                this.bestSeats = this.makeItBest(this.freeSeats.slice(from, to));
                from++;
                to++;
                continue;
            }

            switch (this.comparePrices(this.bestSeats, this.freeSeats.slice(from, to))){
                case constant.Comparation.HIGHER :
                    this.bestSeats = this.makeItBest(this.freeSeats.slice(from, to));
                    break;
                case constant.Comparation.SAME :
                    if (!this.isFartherfromTheStage(this.freeSeats[from], this.bestSeats.bestSeats[0]) && this.isMoreInTheMiddle(this.freeSeats[from].nr, this.bestSeats.bestSeats[0].nr)) {
                        this.bestSeats = this.makeItBest(this.freeSeats.slice(from, to));
                        break;
                    }
                default:
                    break;
            }
            from++;
            to++;
        }
        return this.bestSeats;
    }

    /**
     * Locating the next seats that are next to each other
     * @param {number} from - Must be an integer
     * @param {number} to - Must be an integer
     * @returns {array} two integer values. The values represent the seat indexes. There are free seats available from the first to the last
     */
    findNextToEachOther (from, to) {
        const freeSeatsNr = this.freeSeats.length;

        while (to <= freeSeatsNr){
            while (this.freeSeats[from].row !== this.freeSeats[to-1].row && to < freeSeatsNr) { 
                from++;
                to++;
            }
            let nextToEachOther = true;
            for (let i = from; i < to-1; i++){
                if (this.freeSeats[i].nr + 1 != this.freeSeats[i + 1].nr){
                    nextToEachOther = false;
                }    
            }
            if(nextToEachOther)
                return [from,to];
            from++;
            to++;
        }
        return null;
    }

    /**
     * Creates an object with the list of seats and their  pricing category
     * @param {array} currentSeats - Contains Seat objects
     * @returns {object}
     * @see {@link sumPrice}
     */
    makeItBest(currentSeats) {
        return {
            bestSeats : [...currentSeats],
            priceCategory : this.sumPrice(currentSeats)
        }
    }

    /**
     * Calculates the pricing category based on the seat's tier
     * @param {array} currentSeats - Contains Seat objects
     * @returns {number} sum
     */
    sumPrice(currentSeats) {
        return currentSeats.reduce(
            (acc, currentSeat) =>   acc + currentSeat.tier, 
            0
        );
    }

    /**
     * Compares the pricing category of the two seats
     * @param {object} bestSeats - Contains the currently best seats and the pricing category.
     * @param {array} currentSeats - Contains Seat object
     * @returns {Comparation} if the current seats price is higher/lower/same than the previous one
     */
    comparePrices(bestSeats, currentSeats) {
        let currentSeatsPrice = this.sumPrice(currentSeats);

        if(this.bestSeats.priceCategory >  currentSeatsPrice)
            return constant.Comparation.HIGHER; //logic: tier 1 is the most expensive, tier 3 is the most cheaper

        if (this.bestSeats.priceCategory <  currentSeatsPrice)
            return constant.Comparation.LOWER;
        return constant.Comparation.SAME;

    }

    /**
     * Returns if the seats are farther from the stage than the currently best seats.
     * @param {Seat} seat - The possible adjacent seats
     * @param {Seat} bestSeat - The currently best seats
     * @returns {boolean}
     */
    isFartherfromTheStage(seat, bestSeat){
        return seat.row != bestSeat.row; 
    }

    /**
     * Returns if the seats are more in the middle of the row than the currently best seats.
     * @param {number} currentSeatsfrom - Must be an integer. The index of the first seat from the possible adjacent seats
     * @param {number} bestSeatsfrom - Must be an integer. The index of the first seat from the currently best seats
     * @returns {boolean}
     */
    isMoreInTheMiddle(currentSeatsfrom, bestSeatsfrom) {
        const indexOfRow = this.maxNumberInRow.findIndex((item) => item.row == this.freeSeats[currentSeatsfrom].row);
        const seatNumberInCurrentRow = this.maxNumberInRow[indexOfRow].nr;
        const middle = (1+seatNumberInCurrentRow) / 2;
        const currentSeatMiddle = (currentSeatsfrom + currentSeatsfrom + this.nrOfVisitors) / 2;
        const bestSeatMiddle = (bestSeatsfrom + bestSeatsfrom + this.nrOfVisitors) / 2;

        return Math.abs(middle - currentSeatMiddle) < Math.abs(middle - bestSeatsfrom);
    }
}

