'use strict'

import * as constant from './constans.js';
import { Theatre } from './theatre.js';


function main(nrOfReservedSeats, nrOfVisitors) {
    if (isNaN(Number(process.argv[2])) || isNaN(Number(process.argv[3]))){
        console.log('The input parameters should be numbers');
        return;
    }
    reserveSeats(Number(process.argv[2]), Number(process.argv[3]));
}

/**
 * Make the seat reservation based on the input parameters
 * @param {number} nrOfreservedSeats 
 * @param {number} nrOfVisitors 
 */
function reserveSeats(nrOfreservedSeats, nrOfVisitors){
    if (checkInputReservedSeat(nrOfreservedSeats, nrOfVisitors) !== constant.OK)
        return;

    if (checkInputNrOfVisitors(nrOfVisitors) !== constant.OK)
        return;

    const bestSeats =  new Theatre(nrOfreservedSeats, nrOfVisitors).getTheBestSeats();
    if (bestSeats == null)
        console.log('The reservation is not possible');
    else {
        console.log('The best available adjacent seats are in ')
        bestSeats.bestSeats.map(seat => console.log(seat.row.replace('_', ' row:') + " nr:" + seat.nr ));
    }
}

/**
 * Checks if the currently reserved seats number is a correct input parameter.
 * @param {number} nrOfReservedSeats - Must be an integer
 * @returns {string}
 */
function checkInputReservedSeat(nrOfReservedSeatsNr) {
    if (nrOfReservedSeatsNr < constant.MINIMUM_RESERVED_SEATS) {
        console.log("Wrong input parameter. The minimum reserved seats : " + constant.MINIMUM_RESERVED_SEATS);
        return null;
    }
    if (nrOfReservedSeatsNr > constant.MAXIMUM_RESERVED_SEATS) {
        console.log("Wrong input parameter. The maximum reserved seats : " + constant.MAXIMUM_RESERVED_SEATS);
        return null;
    }
    return constant.OK;
}

/**
 * Checks if the number of visitors is a correct input parameter.
 * @param {number} nrOfVisitors - Must be an integer
 * @returns {string}
 */
function checkInputNrOfVisitors(nrOfVisitors) {
    if (nrOfVisitors <  constant.MINIMUM_NUMBER_OF_VISITORS || nrOfVisitors > constant.MAXIMUM_NUMBER_OF_VISITORS ) {
        console.log("Wrong input parameter. The number of visitors must be between " + constant.MINIMUM_NUMBER_OF_VISITORS 
                    + " and " + constant.MAXIMUM_NUMBER_OF_VISITORS + "!");
        return null;
    }
    return constant.OK;
}

main();
