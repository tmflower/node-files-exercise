const fs = require('fs');
const axios = require('axios');
const process = require('process'); 

function cat(path) {
    fs.readFile(path, 'utf8', function(err, data) {
        if (err) {
            console.log("Error reading file", err);
            process.exit(1);
        }
        else if (process.argv[2] === '--out') {
            write(data);
        }
        else {
            console.log(`Here is your data: ${data}`); 
        }
    })
}   

async function webCat(path) {
    try {
        let res = await axios.get(path);
        data = res.data;

        if (process.argv[2] === '--out') {
            write(data);
        }
        else {
            console.log(data);
        }
    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }
}


if (process.argv[2] === '--out') {
    let path = process.argv[4];
    if (path.includes("http")) {
        webCat(path);
        }
    else {
        cat(path);
    }
}
else {
    let path = process.argv[2];
    if (path.includes("http")) {
        webCat(path);
        }
    else {
        cat(path);
    }
}


function write(data) { 
    path = process.argv[3];
    fs.writeFile(path, data, 'utf8', function(err) {
        if (err) {
            console.log("Error writing to file", err);
            process.exit(1);
        }
        console.log('Wrote to file successfully!')
    })
}
