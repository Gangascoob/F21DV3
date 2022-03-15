const selectedCountries = ["GBR", "ITA", "DEU", "NOR", "RUS", "LTU", "HUN"];

			//Width and height
			var w = 400;
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
						.attr("width", w)
						.attr("height", h);

			//Load in GeoJSON data
			d3.json("https://raw.githubusercontent.com/Gangascoob/F21DVLab3/main/data/custom.geo(1).json").then (function(json) {
				
				//Bind data and create one path per GeoJSON feature
				svg.selectAll("path")
				   .data(json.features)
				   .enter()
				   .append("path")
				   .attr("d", path)
				   .attr("stroke", "rgba(8, 81, 156, 0.2)")
				   //.attr("fill", "rgba(8, 81, 156, 0.6)");
          
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
           ;  
		
			});
      
