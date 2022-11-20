import {seatsData} from './data.js';
import * as constant from './constans.js';
import Seat from './seat.js'
import { SeatReservationAlgoritm } from './seat-reservation-algorithm.js';
   

export class Theatre {
    /**
     * Class represents a Theater
     * @param {number} reservedSeatsNr - Must be an integer
     * @param {number} nrOfVisitors - Must be an integer
     */
    constructor(reservedSeatsNr, nrOfVisitors) {
        this.reservedSeatsNr = reservedSeatsNr;
        this.nrOfVisitors = nrOfVisitors;
        this.seats = seatsData.map(seat => new Seat(seat.nr, seat.row, seat.tier));
        this.freeSeats = structuredClone(this.seats);
        this.reserveSeatsRandomly();
        
    }

    /**
     * Calls the seat reservation algorithm
     * @returns the best available adjacent seats
     */
    getTheBestSeats(){
        const seatNumberInRow = this.calcSeatNumberInRow();
        return new SeatReservationAlgoritm(this.freeSeats, this.nrOfVisitors, seatNumberInRow).reserveSeats();
    }
    
    /**
     * @returns {array} contains seat object with the max number in each row
     */
    calcSeatNumberInRow = () => {
        return (this.seats.filter((seat, index) => index + 1 < this.seats.length && seat.row !== this.seats[index+1].row))
    }
    
    /**
     * Reserve the seats randomly based on the entered value
     */
    reserveSeatsRandomly() {
        while (this.reservedSeatsNr > constant.TOTAL_NUMBER_OF_SEATS - this.freeSeats.length) {
            let randomValue =  this.getRandomInt(0, this.freeSeats.length-1);
            this.freeSeats.splice(randomValue,1);
        }
        console.log(this.freeSeats);
    }
    
    /**
     * Generates a random integer.
     * @param {number} min - The minimum possible value
     * @param {number} max - The maximum possible value
     * @returns {number} An integer
     */
    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min); 
    }
}
