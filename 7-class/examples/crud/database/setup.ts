import { User } from "../models/user";
import Database from "../config/db"

async function reset() {
    console.log("Write the SQLite dummy database,")
    console.log("Adding some dummy data ...")

    await User.sync();
    await User.bulkCreate([
        { username: 'jack-sparrow' },
        { username: 'white-beard' },
        { username: 'black-bear' },
        { username: 'brown-beard' }
    ])
    console.log("Done");
}

reset().then(console.log).catch(console.error)