
let filteredDataMap = [];
let filteredDataMap2 = [];
var myColor2 = d3.scaleSequential().domain([1, 750]).interpolator(d3.interpolateViridis);


function mapcolour(name){

    let csvmap = "https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/hospitalizations/covid-hospitalizations.csv";
    let datamap = []; 
    
    
    
    
    d3.csv(csvmap, function(csv){
    datamap.push({location: csv.entity, date: csv.date, indicator: csv.indicator, value: csv.value});			
    }).then(function filter(){
    filteredDataMap = datamap.filter(function(d){return d.date == date && d.indicator == "Daily hospital occupancy per million"});
    
    
    filteredDataMap2 = [{value: parseInt(filteredDataMap.value, 10), location: filteredDataMap.location}];
    
    //console.log(data[5].location);
    console.log(filteredDataMap2);
    mapelements.transition()
                .attr("fill", function(d){
                    return myColor2(filteredDataMap2.value);
                });
            

    });
    };