
let filteredDataMap = [];
let filteredDataMap2 = [];
var myColor2 = d3.scaleSequential().domain([1, 750]).interpolator(d3.interpolateViridis);


function mapcolour(name, iso){

    let csvmap = "https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/hospitalizations/covid-hospitalizations.csv";
    let datamap = []; 
    
    console.log("#"+ iso);
    
    
    d3.csv(csvmap, function(csv){
    datamap.push({location: csv.entity, date: csv.date, indicator: csv.indicator, value: csv.value});			
    }).then(function filter(){
    filteredDataMap = datamap.filter(function(d){return d.location == name && d.date == date && d.indicator == "Daily hospital occupancy per million"});
    
    console.log(filteredDataMap);
    filteredDataMap2 = [{value: parseInt(filteredDataMap[0].value, 10), location: filteredDataMap[0].location}];
    
    d3.selectAll("#"+iso).transition().attr("fill", function(d){
        return myColor2(filteredDataMap2[0].value);
    });

    d3.select("#hospitaladmissions").style("display","block").text("Daily hospital occupancy per million:" + filteredDataMap2[0].value);
    d3.select("#showdate").style("display","block").text("Date:" + date);

    });
    

}


