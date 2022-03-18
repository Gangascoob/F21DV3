
let filteredDataMap = [];
let filteredDataMap2 = [];
var myColor2 = d3.scaleSequential().domain([1, 750]).interpolator(d3.interpolateViridis);


function mapcolour(name){

    let csvmap = "https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/hospitalizations/covid-hospitalizations.csv";
    let datamap = []; 
    
    
    
    
    d3.csv(csvmap, function(csv){
    datamap.push({location: csv.entity, date: csv.date, indicator: csv.indicator, value: csv.value});			
    }).then(function filter(){
    filteredDataMap = datamap.filter(function(d){return d.location == name && d.date == date && d.indicator == "Daily hospital occupancy per million"});
    
    
    filteredDataMap2 = [parseInt(filteredDataMap[0].value, 10)];
    
    //console.log(data[5].location);
    console.log(filteredDataMap2);
    //console.log(filteredVaccNumbers);
        d3.selectAll("#country" + name)
            .attr("fill", function(d){
                return myColor2(filteredDataMap2[0]);
            });

    });
    };