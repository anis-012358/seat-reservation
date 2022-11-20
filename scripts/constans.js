"use strict";

export const TOTAL_NUMBER_OF_SEATS = 41;
export const MINIMUM_RESERVED_SEATS = Math.round((TOTAL_NUMBER_OF_SEATS * 20) / 100);
export const MAXIMUM_RESERVED_SEATS = TOTAL_NUMBER_OF_SEATS; 
export const MINIMUM_NUMBER_OF_VISITORS = 1;
export const MAXIMUM_NUMBER_OF_VISITORS = 4;

/**
 * Enum for string values comparation.
 * @enum {string}
 */
export const Comparation = {
    HIGHER: 'HIGHER',
    LOWER:  'LOWER',
    SAME: 'SAME'
};

export const OK = 'OK';