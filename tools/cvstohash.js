var readline = require('readline');
var fs       = require('fs');

var fuelMixPath = process.argv[2];
var emissionsPath = process.argv[3];

var fuelMix = {};
var emissions = {};

readFuelMix(function() {
  readEmissions(done);
});

function readFuelMix(cb) {
  readPath(fuelMixPath, fuelMix, function(parts) {
    return {
        "netGeneration": parts[1], 
        "coal":          parts[2],
        "oil":           parts[3],
        "gas":           parts[4],
        "otherFossil":   parts[5],
        "nuclear":       parts[6],
        "hydro":         parts[7],
        "biomass":       parts[8],
        "wind":          parts[9],
        "solar":         parts[10],
        "geoThermal":    parts[11],
        "other":         parts[12] 
      }; 
  }, cb);
}

function readEmissions(cb) {
  readPath(emissionsPath, emissions, function(parts) {
    return {
        "nitrogenOxide": parts[1], 
        "sulfurDioxide": parts[2],
        "carbonDioxide": parts[3],
        "methane": parts[4],
        "nitrousOxide":   parts[5]
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
    var stateFuelMix = fuelMix[state];
    var netGeneration = stateFuelMix.netGeneration;
    delete stateFuelMix.netGeneration;
    var stateEmissions = emissions[state];
    finalResult[fullStateName[state]] = {
      "netGeneration": netGeneration,
      "fuelMix": stateFuelMix, 
      "emissions": stateEmissions
    }
  }
  console.log(finalResult);
}
