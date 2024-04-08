const EventEmitter = require ("events");

const event = new EventEmitter();

const handlerFunction = () => {
    console.log("helloooo")
}

const byeEventhandlerFunction = () => {
    console.log("Byeeeeee")
}

// Create Event
event.on("byeEvent", byeEventhandlerFunction);

// Emit(call) Event
event.emit("ByeEvent");

// Create Event
event.on("HelloEvent", handlerFunction);

// Emit(Call) Event
event.emit("HelloEvent");