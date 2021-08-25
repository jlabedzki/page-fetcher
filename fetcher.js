const fs = require('fs');
const request = require('request');
const readline = require('readline');
const isValid = require('is-valid-path');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const url = process.argv[2];
const dest = process.argv[3];

const isValidUrl = string => {
  const matchpattern = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/gm;
  return matchpattern.test(string);
};

const fetcher = (url, dest) => {

  if (!isValidUrl(url)) {
    process.stdout.write('The URL you have entered is invalid. \n');
    process.exit();
  }

  if (!isValid(dest)) {
    process.stdout.write('The file path you have specified is invalid. \n');
    process.exit();
  }

  if (fs.existsSync(dest)) {

    rl.question(`Warning! File already exists.
    Do you wish to continue? Y/N: `, answer => {

      if (answer === 'y' || answer === 'Y') {
        request(url, (error, response, body) => {
          console.log('error:', error); // Print the error if one occurred
          console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received

          const content = body;

          fs.writeFile(dest, content, { flag: 'a+' }, err => { });
          console.log(`Downloaded and saved ${content.length} bytes to ${dest}`);
        });
        rl.close();
      }

      if (answer === 'n' || answer === 'N') {
        process.exit();
      }
    });
  } else {
    request(url, (error, response, body) => {
      console.log('error:', error); // Print the error if one occurred
      console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received

      const content = body;

      fs.writeFile(dest, content, { flag: 'a+' }, err => { });
      console.log(`Downloaded and saved ${content.length} bytes to ${dest}`);
      process.exit();
    });
  }
};

fetcher(url, dest);

