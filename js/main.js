
// hydro 6.7%
// nuclear 19%
// oil 0.7%
// gas 30.3%
// coal 37.4%
// nonHydroRenewables 5.4%
var nationalAverageFuelMix = {
    "hydro": 6.7,
    "nuclear": 19.0,
    "oil": 0.7,
    "gas": 30.3,
    "coal": 37.4,
    "nonHydroRenewables": 5.4
};

$("#nationalAverageFuelMix").append(
    "<tr>" +
        "<td>" + nationalAverageFuelMix["hydro"] + " %</td>" +
        "<td>" + nationalAverageFuelMix["oil"] + " %</td>" +
    "</tr>");