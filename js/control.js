let intervalIDs = [];

function setStoppableInterval(fn, time) {
    let id = setInterval(fn, time);
    intervalIDs.push(id);
}