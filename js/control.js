/**
 * Array to store the IDs of the intervals
 * @type {number[]}
 */
let intervalIDs = [];

/**
 * Array to store the function and interval options associated with each interval
 * @type {Object[]}
 */
let intervalFN = [];

/**
 * Sets up a stoppable interval.
 * @param {Function} fn - The function to execute at each interval.
 * @param {number} time - The interval time in milliseconds.
 */
function setStoppableInterval(fn, time) {
    let options = {
        fnName: fn,
        interval: time
    };
    let id = setInterval(fn, time);
    intervalIDs.push(id);
    intervalFN.push(options);
}

/**
 * Stops all running intervals.
 */
function stopGame() {
    intervalIDs.forEach(clearInterval);
}

/**
 * Restarts all intervals that were previously stopped.
 */
function restartGame() {
    let count = intervalIDs.length;
    intervalIDs.forEach(index => {
        setStoppableInterval(intervalFN[index - 1].fnName, intervalFN[index - 1].interval);
        intervalIDs.splice()
    });
    intervalIDs.splice(0, count);
}