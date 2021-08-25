const fs = require('fs');
const request = require('request');

const url = process.argv[2];
const dest = process.argv[3];

const fetcher = (url, dest) => {

  request(url, (error, response, body) => {
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received

    const content = body;

    fs.writeFile(dest, content, { flag: 'a+' }, err => { });
    console.log(`Downloaded and saved ${content.length} bytes to ${dest}`);
  });
};

fetcher(url, dest);
