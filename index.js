"use strict"; //ES5
   
const TOTAL_NUMBER_OF_SEATS = 41;
const MINIMUM_RESERVED_SEATS = Math.round((TOTAL_NUMBER_OF_SEATS * 20) / 100);
const MAXIMUM_RESERVED_SEATS = TOTAL_NUMBER_OF_SEATS; 
const MINIMUM_NUMBER_OF_VISITORS = 1;
const MAXIMUM_NUMBER_OF_VISITORS = 4;

const HIGHER = 'HIGHER';
const LOWER = 'LOWER';
const SAME = 'SAME';

//constructor function
function Seat(nr,row, tier) {
    this.nr = nr;
    this.row = row;
    this.tier = tier;
}

const seats = [
    new Seat(1,'AUDITORIUM_A',1),
    new Seat(2,'AUDITORIUM_A',1),
    new Seat(3,'AUDITORIUM_A',1),
    new Seat(4,'AUDITORIUM_A',1),
    new Seat(5,'AUDITORIUM_A',1),
    new Seat(6,'AUDITORIUM_A',1),
    new Seat(1,'AUDITORIUM_B',2),
    new Seat(2,'AUDITORIUM_B',1),
    new Seat(3,'AUDITORIUM_B',1),
    new Seat(4,'AUDITORIUM_B',1),
    new Seat(5,'AUDITORIUM_B',1),
    new Seat(6,'AUDITORIUM_B',1),
    new Seat(7,'AUDITORIUM_B',2),
    new Seat(1,'AUDITORIUM_C',2),
    new Seat(2,'AUDITORIUM_C',2),
    new Seat(3,'AUDITORIUM_C',1),
    new Seat(4,'AUDITORIUM_C',1),
    new Seat(5,'AUDITORIUM_C',2),
    new Seat(6,'AUDITORIUM_C',2),
    new Seat(1,'AUDITORIUM_D',3),
    new Seat(2,'AUDITORIUM_D',2),
    new Seat(3,'AUDITORIUM_D',2),
    new Seat(4,'AUDITORIUM_D',2),
    new Seat(5,'AUDITORIUM_D',3),
    new Seat(1,'AUDITORIUM_E',3),
    new Seat(2,'AUDITORIUM_E',3),
    new Seat(3,'AUDITORIUM_E',3),
    new Seat(4,'AUDITORIUM_E',3),
    new Seat(1,'BALCONY_A',2),
    new Seat(2,'BALCONY_A',2),
    new Seat(3,'BALCONY_A',1),
    new Seat(4,'BALCONY_A',1),
    new Seat(5,'BALCONY_A',1),
    new Seat(6,'BALCONY_A',2),
    new Seat(7,'BALCONY_A',2),
    new Seat(1,'BALCONY_B',3),
    new Seat(2,'BALCONY_B',2),
    new Seat(3,'BALCONY_B',2),
    new Seat(4,'BALCONY_B',2),
    new Seat(5,'BALCONY_B',2),
    new Seat(6,'BALCONY_B',3),
];

let freeSeats = structuredClone(seats);

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); 
}

const calcSeatNumberInRow = () => {
    return (seats.filter((seat, index) => index + 1 < seats.length && seat.row !== seats[index+1].row))
}

/**
 *  reserve the seats randomly based on the entered value 
 */ 
function randomSeatReservation(reservedSeats) {
    if (reservedSeats < MINIMUM_RESERVED_SEATS)
        return "Wrong input parameter. The minimum reserved seats : " + MINIMUM_RESERVED_SEATS;
    if (reservedSeats > MAXIMUM_RESERVED_SEATS)
        return "Wrong input parameter. The maximum reserved seats : " + MAXIMUM_RESERVED_SEATS;


    while (reservedSeats > TOTAL_NUMBER_OF_SEATS - freeSeats.length) {
        let randomValue =  getRandomInt(0, freeSeats.length-1);
        
        freeSeats.splice(randomValue,1);
    }
    console.log( freeSeats);
    return 'ok';
}

function sumPrice(currentSeats) {
    return currentSeats.reduce(
        (acc, currentSeat) =>   acc + currentSeat.tier, 
        0
    );
}

/**
 * 
 * @param {*} bestSeats the currently best seats
 * @param {*} currentSeats the current seats
 * @returns if the current seats price is higher than the previous one
 */
function comparePrices(bestSeats, currentSeats) {
    let currentSeatsPrice = sumPrice(currentSeats);
    if(bestSeats.price >  currentSeatsPrice)
        return HIGHER; //logic: tier 1 is the most expensive, tier 3 is the most cheaper
    if (bestSeats.price <  currentSeatsPrice)
        return LOWER;
    return SAME;

}

function makeItBest(currentSeats) {
    return {
        ...currentSeats,
        price : sumPrice(currentSeats)
    }
}

let seatNumberInRow = calcSeatNumberInRow();
    console.log(seatNumberInRow);

function isMoreInTheMiddle(currentSeatsfrom, bestSeatsfrom, nrOfVisitors) {
    const indexOfRow = seatNumberInRow.findIndex((item) => item.row == freeSeats[currentSeatsfrom].row);
    const seatNumberInCurrentRow = seatNumberInRow[indexOfRow].nr;
    const middle = (1+seatNumberInCurrentRow) / 2;
    const currentSeatMiddle = (currentSeatsfrom + currentSeatsfrom + nrOfVisitors) / 2;
    const bestSeatMiddle = (bestSeatsfrom + bestSeatsfrom + nrOfVisitors) / 2;
    return Math.abs(middle - currentSeatMiddle) < Math.abs(middle - bestSeatsfrom);
}

function findNextToEachOther (from, to) {
    const freeSeatsNr = freeSeats.length;
    while (to <= freeSeatsNr){
        while (freeSeats[from].row !== freeSeats[to-1].row && to < freeSeatsNr) { 
            from++;
            to++;
        }
        let nextToEachOther = true;
        for (let i = from; i < to-1; i++){
            if (freeSeats[i].nr + 1 != freeSeats[i + 1].nr){
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

function isFartherfromTheStage(seat, bestSeat){
    return seat.row != bestSeat.row;
}

function reserveSeats(nrOfVisitors) {
    if (nrOfVisitors <  MINIMUM_NUMBER_OF_VISITORS || nrOfVisitors > MAXIMUM_NUMBER_OF_VISITORS )
        return "Wrong input parameter. The number of visitors must be between " + MINIMUM_NUMBER_OF_VISITORS + " and " + MAXIMUM_NUMBER_OF_VISITORS + "!";
    
    let from = 0;
    let to = nrOfVisitors;
    const freeSeatsNr = freeSeats.length;
    let bestSeats = null;
    while ( to < freeSeatsNr-1) {

        const seatIndexes =  findNextToEachOther(from, to);
        if (seatIndexes == null)
            return bestSeats;

        [from, to] = seatIndexes;

        console.log('from = ' + from + 'to = '+  to);

        if (bestSeats === null) {
            bestSeats = makeItBest(freeSeats.slice(from, to));
            from++;
            to++;
            continue;
        }

        switch (comparePrices(bestSeats, freeSeats.slice(from, to))){
            case HIGHER :
                bestSeats = makeItBest(freeSeats.slice(from, to));
                break;
            case SAME :
                if (!isFartherfromTheStage(freeSeats[from], bestSeats[0]) && isMoreInTheMiddle(freeSeats[from].nr, bestSeats[0].nr, nrOfVisitors )) {
                    bestSeats = makeItBest(freeSeats.slice(from, to));
                    break;
                }
            default:
                break;
        }

        from++;
        to++;
    }
    return bestSeats;
}


randomSeatReservation(20);
console.log('The best seats are',reserveSeats(3));