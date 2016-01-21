var readline = require('readline');
var fs       = require('fs');

var fuelMixPath   = './doc/fuel_mix.csv';
var emissionsPath = './doc/emissions.csv';

fs.accessSync(fuelMixPath, fs.F_OK);
fs.accessSync(emissionsPath, fs.F_OK);

process.argv.shift();
process.argv.shift();

var nameSize = 'long';
if (process.argv.length > 0 && process.argv[0][0] === '-') {
  nameSize = process.argv[0].substring(1).toLowerCase();
  process.argv.shift();
}
if (nameSize != 'short' && nameSize != 'long') {
  console.error('Invalid Name Size: ' + nameSize);
  process.exit();
}

var fuelMix = {};
var emissions = {};

readFuelMix(function() {
  readEmissions(done);
});

function readFuelMix(cb) {
  readPath(fuelMixPath, fuelMix, function(parts) {
    return {
        "netGeneration": parseFloat(parts[1]), 
        "coal":          parseFloat(parts[2]),
        "oil":           parseFloat(parts[3]),
        "gas":           parseFloat(parts[4]),
        "otherFossil":   parseFloat(parts[5]),
        "nuclear":       parseFloat(parts[6]),
        "hydro":         parseFloat(parts[7]),
        "biomass":       parseFloat(parts[8]),
        "wind":          parseFloat(parts[9]),
        "solar":         parseFloat(parts[10]),
        "geoThermal":    parseFloat(parts[11]),
        "other":         parseFloat(parts[12]) 
      }; 
  }, cb);
}

function readEmissions(cb) {
  readPath(emissionsPath, emissions, function(parts) {
    return {
        "nitrogenOxide": parseFloat(parts[1]), 
        "sulfurDioxide": parseFloat(parts[2]),
        "carbonDioxide": parseFloat(parts[3]),
        "methane": parseFloat(parts[4]),
        "nitrousOxide":   parseFloat(parts[5])
      }; 
  }, cb);
}

function readPath(path, dest, partsHandler, cb) {
  var lineReader = readline.createInterface({
    input: fs.createReadStream(path)
  });
  lineReader.on('line', function(line) {
    var parts = line.split(',');
    var state = parts[0];
    if (state !== 'U.S.' && state !== 'State') {
      dest[state] = partsHandler(parts);
    }
  });   
  lineReader.on('close', function(){
    cb();
  })
}

var fullStateName = {
    "AL": "Alabama",
    "AK": "Alaska",
    "AS": "American Samoa",
    "AZ": "Arizona",
    "AR": "Arkansas",
    "CA": "California",
    "CO": "Colorado",
    "CT": "Connecticut",
    "DE": "Delaware",
    "DC": "District Of Columbia",
    "FM": "Federated States Of Micronesia",
    "FL": "Florida",
    "GA": "Georgia",
    "GU": "Guam",
    "HI": "Hawaii",
    "ID": "Idaho",
    "IL": "Illinois",
    "IN": "Indiana",
    "IA": "Iowa",
    "KS": "Kansas",
    "KY": "Kentucky",
    "LA": "Louisiana",
    "ME": "Maine",
    "MH": "Marshall Islands",
    "MD": "Maryland",
    "MA": "Massachusetts",
    "MI": "Michigan",
    "MN": "Minnesota",
    "MS": "Mississippi",
    "MO": "Missouri",
    "MT": "Montana",
    "NE": "Nebraska",
    "NV": "Nevada",
    "NH": "New Hampshire",
    "NJ": "New Jersey",
    "NM": "New Mexico",
    "NY": "New York",
    "NC": "North Carolina",
    "ND": "North Dakota",
    "MP": "Northern Mariana Islands",
    "OH": "Ohio",
    "OK": "Oklahoma",
    "OR": "Oregon",
    "PW": "Palau",
    "PA": "Pennsylvania",
    "PR": "Puerto Rico",
    "RI": "Rhode Island",
    "SC": "South Carolina",
    "SD": "South Dakota",
    "TN": "Tennessee",
    "TX": "Texas",
    "UT": "Utah",
    "VT": "Vermont",
    "VI": "Virgin Islands",
    "VA": "Virginia",
    "WA": "Washington",
    "WV": "West Virginia",
    "WI": "Wisconsin",
    "WY": "Wyoming"
};

function done() {
  var finalResult = {};
  for (state in fuelMix) {
    if (process.argv.length > 0 &&
        process.argv.indexOf(state) < 0 &&
        process.argv.indexOf(fullStateName[state]) < 0) {
      continue;
    }
    var stateFuelMix = fuelMix[state];
    var netGeneration = stateFuelMix.netGeneration;
    delete stateFuelMix.netGeneration;
    var stateEmissions = emissions[state];
    var stateName = state;
    if (nameSize === 'long') {
      stateName = fullStateName[state];
    }
    finalResult[stateName] = {
      "netGeneration": netGeneration,
      "fuelMix": stateFuelMix, 
      "emissions": stateEmissions
    }
  }
  console.log(finalResult);
}
