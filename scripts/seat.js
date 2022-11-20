/**
 * @typedef {Object} Seat
 * @property {number} nr  - Must be an integer
 * @property {string} row 
 * @property {number} tier- Must be an integer
 */
/** The class represents a seat */
export default class Seat {
    /**
     * 
     * @param {number} nr - Must be an integer
     * @param {string} row 
     * @param {number} tier - Must be an integer
     */
    constructor(nr, row, tier) {
        this.nr = nr;
        this.row = row;
        this.tier = tier;
    }
}