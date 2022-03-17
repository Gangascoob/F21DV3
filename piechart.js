const xSizepie  = 200;   const ySizepie  = 200; 


// Append SVG Object to the Page 
const svgpie = d3.select("#child_div3") 
              .append("svg") 
              .attr('width',  "100%"  ) 
              .attr('height', "90%"  ) 
              .append("g") 
              .attr("transform","translate(" + xSizepie/2 + "," + ySizepie/2 + ")"); 
const radius = Math.min(xSizepie, ySizepie) / 2; 
var color = d3.scaleOrdinal(['#4daf4a','#377eb8','#ff7f00','#984ea3','#e41a1c']); 



function piechart(name){
	
var data = []; //more data added

d3.csv("https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/vaccinations/vaccinations-by-age-group.csv"), function(csv){

if(name == csv.location && csv.date == "2021-07-23"){
	data.push(csv.people_vaccinated_per_hundred);
	console.log("yes");
}
	else{
		console.log(name);
		console.log(csv.location);}

});
 
// Generate the pie 
var pie = d3.pie(); 
 
// Generate the arcs 
var arc = d3.arc() 
      .innerRadius(0) 
      .outerRadius(radius); 
 
//Generate groups 
var arcs = svgpie.selectAll("arc") 
      .data(pie(data)) 
      .enter() 
      .append("g") 
      .attr("class", "arc") 
 
//Draw arc paths 
arcs.append("path") 
  .attr("fill", function(d, i) { 
    return color(i); 
  }) 
  .attr("d", arc); 


//appends text to each arc of the chart and returns value. Centroid function calculates best position in the arc for text.
var arctext = svgpie.selectAll("arc")
	.data(pie(data))
      .enter()
      .append("text")
      .text(function(d){
      return d.value;
      })
      .attr("transform", function(d){
      return "translate(" + arc.centroid(d) +")";
      })
      .style("text-anchor", "middle")
      .style("font-size", 20);
};
