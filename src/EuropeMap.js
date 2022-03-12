const selectedCountries = ["GBR", "ITA", "DEU", "NOR", "RUS", "LTU", "HUN"];

				
			//Width and height
			

			//Define map projection


			var projection = d3.geo.mercator() //use a standard projection to flatten the poles, see D3 projection plugin
								   .center([ 20, 45 ]) //how to center the map, longitude, latitude
								 //  .translate([50%, 50%]) center the resulting image in the svg
								   .scale(300); // bigger value, bigger zoom
			//Define path generator
			var path = d3.geo.path()
				   .projection(projection);


			//Create SVG
			var svg = d3.select("#child_div1")
				  .append("svg")
				  .attr("width", "100%")
				  .attr("height", "90%");

			//Load in GeoJSON data
			d3.json("https://raw.githubusercontent.com/markuslerner/travelscope/master/public/map/2.0.0/ne_50m_admin_0_countries_simplified.json", function(json) {
				
				//Bind data and create one path per GeoJSON feature
				svg.selectAll("path")
				   .data(json.features)
				   .enter()
				   .append("path")
				   .attr("d", path)
				   .attr("stroke", "rgba(8, 81, 156, 0.2)")
				   .attr("fill", function(d){
           			     if(selectedCountries.includes(d.properties.iso_a3)){
           	                     	return "rgba(150, 81, 156, 0.6)";
                                     }
                                     else return "rgba(8, 81, 156, 0.6)";
				    })
			           .attr("id", function(d, i){
           				return "country" + d.properties.iso_a3;
           		            })
           			   .attr("class", "country")
				   .on("click", function(d, i){
					d3.select("#countryname").style("display", "block").text(d.properties.name);
					d3.select("#countrypopulation").style("display", "block").text("Population: " + d.properties.pop_est);
					
					if(d.properties.lastcensus == "-99"){
						d3.select(d3.select("#countrycensus").style("display", "block").text("Census data unavailable");
					}
					else {		  
					d3.select("#countrycensus").style("display", "block").text("Census data from:" + d.properties.lastcensus);
					};
					d3.select("#countryincome").style("display", "block").text("Income bracket: " + d.properties.income_grp);
					d3.select("#countryeconomy").style("display", "block").text("Economy: " + d.properties.economy);
				});
			})
