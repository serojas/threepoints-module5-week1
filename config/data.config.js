const fs = require('fs'); /* Put it where other modules included */
const data = JSON.parse(fs.readFileSync('data/employees.json', 'utf8')); /* Inside the get function */

module.exports = data;
