const fs = require('fs');
const dotenv = require('dotenv');

dotenv.config();

const path = './src/environments/environment.ts';
const envConfigFile = `

export const environment = {
        apiURL_Search : 'http://api.weatherapi.com/v1/search.json',
        apiURL_Forecast : 'http://api.weatherapi.com/v1/forecast.json',
        apiURL_Current : 'http://api.weatherapi.com/v1/current.json',
        apiKEY : '61dab060f224404b838130524230903'
}
`;

fs.writeFile(path, envConfigFile, function (err) {
    console.log(`env created at ${path}`);
    if (err) {
        console.log(err)
    }
});