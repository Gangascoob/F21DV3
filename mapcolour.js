
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
    
    console.log(filteredDataMap);
    filteredDataMap2 = [{value: parseInt(filteredDataMap[0].value, 10), location: filteredDataMap[0].location}];
    
    //console.log(data[5].location);
    
    mapelements.transition()
                .attr("fill", function(d){
                    if("id" == name){
                    return myColor2(filteredDataMap2[0].value);
                    }
                    else return "rgba(8, 81, 156, 0.6)";
                });
            

    });
    };