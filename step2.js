const fs = require('fs');
const axios = require('axios');
const process = require('process');

function cat(path) {
    fs.readFile(path, 'utf8', function(err, data) {
        if (err) {
            console.log(err);
            process.exit(1);
        }
        console.log(`Here is your data: ${data}`);
    })
}   

async function webCat(path) {
    try {
        let res = await axios.get(path);
        console.log(res.data)
    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }
}

// webCat('https://www.google.com/')


let path = process.argv[2];

console.log (typeof(path))

if (path.includes("http")) {
    webCat(path);
    }
else {
    cat(path);
}