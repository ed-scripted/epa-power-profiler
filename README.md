# EPA Power Profiler

## Background

This is a  project that will build upon your knowledge of hashes, so make sure you've gone over the material in the ScriptEd hashes lesson, [here](https://github.com/ScriptEdcurriculum/curriculum2015/tree/master/units/14-javascript2_2).  We will also be using a little bit of JQuery, though it will be very limited and only a passing familarity is required.  For more JQuery background look [here](https://github.com/ScriptEdcurriculum/curriculum2015).

## Goal

To create a page that displays tables showing data from the EPA Power Profiler Charts, linked in the reference.  These tables should show the National average fuel mix of sources of electricity and the National average emissions rates.  In addtion two more tables should show Regional fuel mix and emission rates for at least 10 (or more) regions in the United States, specified by a Zip Code.  These regions must span at least 3 (or more) different states.

## Instructions

The starter code is provided in this project with the `index.html` file.  Be sure to fork this repository and then specify your github repo when creating the Cloud9 workspace.

### Part 1 - National Averages - Basic Hash
The base tables for the National Averages are provided for you in the html, you will be filling in the table using a hash and JQuery.

1) Add a style to `main.css` that adds borders around the table cell.  Make the border a solid black between 1-5 pixels wide (whichever you prefer).  Also add padding to the table cells.

2) Create a hash of the National Average fuel mix and emission rates data on the EPA site.

3) Use JQuery `append` function to add a row to the fuel mix and emission rates table, filling in all the needed columns from the hash map you made in the previous step.

### Part 2 - State Averages - Nested Hashes
You will now add state averages to your table.  Pick at least 5 different states
from the provided emissions tables.

1) Create the base state tables, they will be very similar to the National Average tables.  The most important difference is you must add an extra column to store the State.

2) Make a hash that list **only TWO** states at first.  We want to make sure your project is working before adding more states.  Your Hash must be organized as follows:

```
var states  = {
  "New York":
    {
      "netGeneration": 3905323.35
      "fuelMix": {
        "hydro":   8.3,
        "nuclear": 2.3,
        ...
      },
      "emissions": {
        "nitrogenOxides": 92.2,
        "sulfur":       1.3,
        "carbon": 2941,
        "methane": 93,
        "nitrousOxide": 128
      }
    },
  "Florida": {
  ...
  },
  ...
}
```

3) Use JQuery `append` to add these states epa data to the tables you made in the previous steps.  You *must* use for loops to fill in these tables. Note that you must loop over a hash of states, not an array. The easiest way to loop over this hash would be to use a `for in` loop, which goes through each key in the hash.  For Example:

```javascript
var states = {
  "New York": 1,
  "Florida":  2,
  "California": 3
}

for (key in states) {
  console.log(key + ": " + states[key]);
}
```

Will print the following:

```
New York: 1
Florida: 2
California: 3
```

Again, note that the hash of states and emissions is *nested*, you will need to
loop through the states and then extract the `fuelMix` and `emissions`.
Below is an example:

```javascript
var states = { California: 
   { netGeneration: 199189655.8,
     fuelMix: 
      { coal: 0.6317,
        oil: 0.8499,
        gas: 60.0661,
        otherFossil: 0.0908,
        nuclear: 9.2913,
        hydro: 13.7605,
        biomass: 3.1494,
        wind: 4.8624,
        solar: 0.6829,
        geoThermal: 6.285,
        other: 0.3299 },
     emissions: 
      { nitrogenOxide: 18268.77,
        sulfurDioxide: 17622.66,
        carbonDioxide: 57165609.7,
        methane: 6596594.8,
        nitrousOxide: 894245.8 } },
  Florida: 
   { netGeneration: 221099929.6,
     fuelMix: 
      { coal: 20.03,
        oil: 0.6223,
        gas: 67.7068,
        otherFossil: 0.6277,
        nuclear: 8.0823,
        hydro: 0.0681,
        biomass: 1.9807,
        wind: 0,
        solar: 0.0876,
        geoThermal: 0,
        other: 0.7946 },
     emissions: 
      { nitrogenOxide: 72573.66,
        sulfurDioxide: 142273.76,
        carbonDioxide: 125651562,
        methane: 8748624,
        nitrousOxide: 2690783.8 } },
  'New York': 
   { netGeneration: 135662526.5,
     fuelMix: 
      { coal: 3.3547,
        oil: 0.4277,
        gas: 43.831,
        otherFossil: 0.6904,
        nuclear: 30.0559,
        hydro: 17.8021,
        biomass: 1.6067,
        wind: 2.1927,
        solar: 0.0389,
        geoThermal: 0,
        other: 0 },
     emissions: 
      { nitrogenOxide: 23118.18,
        sulfurDioxide: 34220.3,
        carbonDioxide: 38169117.1,
        methane: 3324160.7,
        nitrousOxide: 561770 } } }

//Create fuel mix row
for (var stateName in states) {
  var state = states[stateName];
  var stateFuelMix = state['fuelMix'];
  $('#stateFuelMix').append(
    '<tr>' +
      '<td>' + stateFuelMix['coal'] + '</td>' +
      '<td>' + stateFuelMix['oil'] + '</td>' +
      ...
    '</tr>');
}

//Use a similar pattern to fill in emission rows.
```

## csvtohash.js

Writing in all the data to the hash by hand can be tedious.  To help you with that I wrote a tool, `csvtohash.js` that will make this much easier.  You can download it in the cloud9 command prompt with this command `wget -O csvtohash.js https://git.io/vzzGs` (make sure you are in the root of your workspace).  Then you can run the script with `node csvtohash.js`.  By default it will list all 50 states hashes, with the full state name as the key.  If you run `node csvtohash.js -short` it will print all 50 states with abbrevated state names (i.e. NY, FL, CA, etc.).  Finally, you can easily filter out which states to print by providing a list of abbrevated state names as arguments.  For example, `node csvtohash.js -short NY FL CA` will only print out the hashes for the states of New York, Florida, and California; which are the states we used in the example in Part 2.

## References
- [EPA Tables](doc/tables.md)
- [EPA Power Profiler](http://oaspub.epa.gov/powpro/ept_pack.charts)
