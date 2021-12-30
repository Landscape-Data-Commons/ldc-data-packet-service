import {connect} from './app/db/database'
import Files from './app/models/files'
import fs from 'fs'
// const connect = require('./app/db/database.ts');
// const Files = require('./app/models/files');
// const fs = require('fs');

connect();

async function fetchData() {
    const files = await Files.find({ createdAt : { $lt: new Date(Date.now() - 1000)} })
    if(files.length) {
        for (const file of files) {
            try {
                fs.unlinkSync(file.path);
                await file.remove();
                console.log(`successfully deleted ${file.filename}`);
            } catch(err) {
                console.log(`error while deleting file ${err} `);
            }
        }
    }
    console.log('Job done!');
}

fetchData()
.then( process.exit)
