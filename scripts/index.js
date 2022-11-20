'use strict'

import * as constant from './constans.js';
import { Theatre } from './theatre.js';

function main() {
    let reservedSeatsNr = 27;
    let nrOfVisitors = 2; 
    const bestSeats =  new Theatre(reservedSeatsNr, nrOfVisitors).getTheBestSeats();
    console.log('best seats = ' , bestSeats);
}

/**
 * Checks if the currently reserved seats number is a correct input parameter.
 * @param {number} reservedSeatsNr - Must be an integer
 * @returns {string}
 */
function checkInputReservedSeat(reservedSeatsNr) {
    if (reservedSeatsNr < constant.MINIMUM_RESERVED_SEATS)
        return "Wrong input parameter. The minimum reserved seats : " + MINIMUM_RESERVED_SEATS;
    if (reservedSeatsNr > constant.MAXIMUM_RESERVED_SEATS)
        return "Wrong input parameter. The maximum reserved seats : " + MAXIMUM_RESERVED_SEATS;
    return constant.OK;
}

/**
 * Checks if the number of visitors is a correct input parameter.
 * @param {number} nrOfVisitors - Must be an integer
 * @returns {string}
 */
function checkInputNrOfVisitors(nrOfVisitors) {
    if (nrOfVisitors <  constant.MINIMUM_NUMBER_OF_VISITORS || nrOfVisitors > constant.MAXIMUM_NUMBER_OF_VISITORS )
        return "Wrong input parameter. The number of visitors must be between " + MINIMUM_NUMBER_OF_VISITORS + " and " + MAXIMUM_NUMBER_OF_VISITORS + "!";
    return constant.OK;
}

main();
