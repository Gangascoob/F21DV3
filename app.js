const selectedCountries = ["GBR", "ITA", "DEU", "NOR", "RUS", "LTU", "HUN"];
var mapelements;
var iso;

			
			

			//Define map projection, values are just for centering it on europe - would be better to be dynamic.
			var projection = d3.geoMercator() 
								   .center([ -50, 65 ]) 
								   .translate([ 0, 0 ]) 
								   .scale([350]); 

			//Define path generator
			var path = d3.geoPath()
					.projection(projection);



//mouseClick function - selects paragraph ids and displays appropriate country information.
//Also calls barchart function with name as the parameter.
//setTimeout function is for attaching a slight delay before calling updatebar() function - allows barchart() to 
//process data before using filteredDataBar (it was trying to call too early and throwing errors).
function mouseClick(e, d){
	
d3.select("#countryname").text(d.properties.name);
d3.select("#countrypopulation").text("Population: " + d.properties.pop_est);
					
iso = d.properties.iso_a3;
d3.select("#countryincome").style("display", "block").text("Income bracket: " + d.properties.income_grp);
d3.select("#countryeconomy").style("display", "block").text("Economy: " + d.properties.economy); 

barchart(d.properties.name);
setTimeout(function(){
	updatebar(filteredDataBar);
},200);

}

//Create SVG
var svg = d3.select("#child_div1")
	.append("svg")
	.attr("width", "100%")
	.attr("height", "90%");

//Load in GeoJSON data, then binds the data and creates a singular path per GeoJSON feature, adds id and class to each country feature,
//and adds an "on click" function.
//Maybe add on-mouseover too?
d3.json("https://raw.githubusercontent.com/markuslerner/travelscope/master/public/map/2.0.0/ne_50m_admin_0_countries_simplified.json").then (function(json) {

				
//Binds the data and creates a singular path per GeoJSON feature, adds id and class to each country feature,
//and adds an "on click" function.
//Maybe add on-mouseover too?
mapelements = svg.selectAll("path")
	   .data(json.features)
	   .enter()
	   .append("path")
	   .attr("d", path)
	   .attr("stroke", "rgba(8, 81, 156, 0.2)")
           .attr("fill", function(d, i){
           if(selectedCountries.includes(d.properties.iso_a3)){
           return "rgba(255, 81, 156, 0.6)";
           }
           else return "rgba(8, 81, 156, 0.6)";
           })
           .attr("id", function(d, i){
           return d.properties.iso_a3;
           })
           .attr("class", "country")
	   .on("click", mouseClick);

		
			});
