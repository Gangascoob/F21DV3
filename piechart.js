const xSizepie  = 200;   const ySizepie  = 200; 


// Append SVG Object to the Page 
const svgpie = d3.select("#child_div3") 
              .append("svg") 
              .attr('width',  "100%"  ) 
              .attr('height', "90%"  ) 
              .append("g") 
              .attr("transform","translate(" + xSizepie/2 + "," + ySizepie/2 + ")"); 
const radius = Math.min(xSizepie, ySizepie) / 2; 
//var color = d3.scaleOrdinal(['#4daf4a','#377eb8','#ff7f00','#984ea3','#e41a1c']); 



let date = "2021-10-25";
let filteredDataPie = [];	

const xSizepie = 200;
const ySizepie = 200;

var datastart = [1, 1, 1];
var pie = d3.pie(); 
 
// Generate the arcs 
var arc = d3.arc() 
      .innerRadius(0) 
      .outerRadius(radius); 
      
var arcs = svgpie.selectAll("arc") 
      .data(pie(datastart)) 
      .enter() 
      .append("path")
      .attr("fill", function(d, i) { 
    if(i == 0){
	    return "blue";
    }
    if(i == 1){
            return "red";    
    }
    if(i == 2){
	    return "yellow";
    }})
    	.attr("d", arc)
      .each(function(d){ this._current =d; });
      
      
arcs.append("path") 
  .attr("fill", function(d, i) { 
    if(i == 0){
	    return "blue";
    }
    if(i == 1){
            return "red";    
    }
    if(i == 2){
	    return "yellow";
    }
    
  }) 
  .attr("d", arc); 



function piechart(name){

          
     let piecsv = "https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/vaccinations/vaccinations.csv";
      let data = []; //more data added
 
     
 d3.csv(piecsv, function(csv){
             data.push({location: csv.location, date: csv.date, vaccinated:
              + csv.people_vaccinated, 
              fullvaccinated: + csv.people_fully_vaccinated,
               booster: + csv.total_boosters});			
            }).then(function filter(){
                  filteredData = data.filter(function(d){return d.location == name && d.date == date});
           
            filteredDataPie = [filteredData[0].booster, (filteredData[0].fullvaccinated - filteredData[0].booster), (filteredData[0].vaccinated - filteredData[0].booster - filteredData[0].fullvaccinated) ];
            
            //console.log(data[5].location);
            console.log(filteredDataPie);
            //console.log(filteredVaccNumbers);
            });
     
     
     
     
};     

function piegenerator(data){	
      svgpie.selectAll("path")
      .data(pie(data))
      .transition()
.attr("d", arc);

svgpie.selectAll("path") 
.data(pie(data)) 
.enter() 
.append("path")
.attr("fill", function(d, i) { 
if(i == 0){
return "blue";
}
if(i == 1){
return "red";    
}
if(i == 2){
return "yellow";
}})
.attr("d", arc)
.each(function(d){ this._current =d; });

svgpie.selectAll("path")
      .data(pie(data))
.exit()
.remove();
};
