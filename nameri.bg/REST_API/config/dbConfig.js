const mongoose = require("mongoose")

module.exports = app => {
    return new Promise((resolve, reject) => {
        // runValidators tells mongoose to run validations on update operations, which are off by default:
        // findOneAndUpdate(), updateOne(), etc.
        mongoose.set("runValidators", true)

        // connect to the connection string in the environment variables. this is async of course but we wont resolve it.
        // Instead, we have a built-in reference to the result of this async function which is
        // mongoose.connection, which we can take as a variable.
        mongoose.connect("process.env.ATLAS_CONNECTION_STR_NAMERIBG")

        //here
        const db = mongoose.connection

        // the connection object we took now has various states. It is a push collection, which means it is an equivalent to
        // the EventEmitter. Or a RxJS observable. Kinda.. It emits (pushes) on various events, on which we can hook.
        // all events on the docs: https://mongoosejs.com/docs/connections.html#connection-events
        db.on("disconnected", msg => {
            console.log(`Connection terminated. Reason: (${msg})`)
        })

        // the 2 main we want here are error and open, in both cases we return from the promise.
        // the reason for this is that we will take the promise and use it in other functions.
        // In general the idea is to handle the errors on 1 place somewhere else. Not on 12 places.
        db.on("error", err => {
            console.log(`Database error: ${err.message}`)
            reject(err.message)
        })
        db.on("open", () => {
            console.log(`Database connected`)
            resolve()
        })
    })
}
