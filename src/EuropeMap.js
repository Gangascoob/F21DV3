<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<title>Mercator projection</title>
		<script src="//d3js.org/d3.v3.min.js" charset="utf-8"></script>
		<script src="//d3js.org/topojson.v1.min.js"></script>
		<style type="text/css">


			svg {
				background-color: white;
			}

			h1 {
				color: rgb(115, 115, 115);
				font-size: 18px;
				font-family: sans-serif;
				font-weight: bold;
				margin: 0;
				padding-bottom: 10px;

			}

				#container {
				width: 800px;
				margin-left: auto;
				margin-right: auto;
				margin-top: 20px;
				padding: 20px;
				background-color: white;
				box-shadow: 1px 1px 1px 2px rgb(217, 217, 217);
			}

			path:hover {
				fill: rgba(8, 81, 156, 0.2);
				cursor:pointer;
			}



		</style>
	</head>
	<body>


	<div id="container">
		<h1>World map centered on European countries</h1>

	</div>
		

		<script type="text/javascript">



			//Width and height
			var w = 400;
			var h = 300;

			//Define map projection


			var projection = d3.geo.mercator() //use a standard projection to flatten the poles, see D3 projection plugin
								   .center([ 13, 52 ]) //how to center the map, longitude, latitude
								   .translate([ w/2, h/2 ]) // center the resulting image in the svg
								   .scale([ w/1.5 ]); // zoom, the smaller the value, the bigger the zoom
			//Define path generator
			var path = d3.geo.path()
							 .projection(projection);


			//Create SVG
			var svg = d3.select("#container")
						.append("svg")
						.attr("width", w)
						.attr("height", h);

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
           			     if(d.properties.adm0_a3 == "ALB"){
           	                     	return "rgba(150, 81, 156, 0.6)";
                                     }
                                     else return "rgba(8, 81, 156, 0.6)";
				    })
			           .attr("id", function(d, i){
           				return "country" + d.properties.iso_a3;
           		            })
           			   .attr("class", "country");
           
		
					


		
		</script>
	</body>
</html>
