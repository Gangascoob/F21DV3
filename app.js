const selectedCountries = ["GBR", "ITA", "DEU", "NOR", "RUS", "LTU", "HUN"];

			//Width and height
			var w = 800;
			var h = 300;

			//Define map projection


			var projection = d3.geoMercator() //utiliser une projection standard pour aplatir les pôles, voir D3 projection plugin
								   .center([ 15, 55 ]) //comment centrer la carte, longitude, latitude
								   .translate([ w/2, h/2 ]) // centrer l'image obtenue dans le svg
								   .scale([ w/1.5 ]); // zoom, plus la valeur est petit plus le zoom est gros 

			//Define path generator
			var path = d3.geoPath()
					.projection(projection);


			//Create SVG
			var svg = d3.select("#child_div1")
						.append("svg")
						.attr("width", "100%")
						.attr("height", "90%");

			//Load in GeoJSON data
			d3.json("https://raw.githubusercontent.com/markuslerner/travelscope/master/public/map/2.0.0/ne_50m_admin_0_countries_simplified.json").then (function(json) {
				
	var name = json.features.properties.name;
	var population = json.features.properties.pop_est;
	var lastcensus = json.features.properties.lastcensus;
	var income = json.features.properties.income_grp;
	var economy = json.features.properties.economy;
				
	//Bind data and create one path per GeoJSON feature
	svg.selectAll("path")
	   .data(json.features)
	   .enter()
	   .append("path")
	   .attr("d", path)
	   .attr("stroke", "rgba(8, 81, 156, 0.2)")
           .attr("fill", function(d){
           if(selectedCountries.includes(d.properties.iso_a3)){
           return "rgba(255, 81, 156, 0.6)";
           }
           else return "rgba(8, 81, 156, 0.6)";
           })
           .attr("id", function(d, i){
           return "country" + d.properties.iso_a3;
           })
           .attr("class", "country")
           .on("mouseover", function(d){
					
					d3.select("#countryname").style("display", "block").text(name);
					d3.select("#countrypopulation").style("display", "block").text("Population: " + population);
					
					if(lastcensus == "-99"){
						d3.select("#countrycensus").style("display", "block").text("Census data unavailable");
					}
					else {		  
					d3.select("#countrycensus").style("display", "block").text("Census data from:" + lastcensus);
					};
					d3.select("#countryincome").style("display", "block").text("Income bracket: " + income);
					d3.select("#countryeconomy").style("display", "block").text("Economy: " + economy); 
	});
					
             
		
			});
