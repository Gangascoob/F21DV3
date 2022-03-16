const xSizepie  = 400;   const ySizepie  = 400; 


// Append SVG Object to the Page 
const svgpie = d3.select("#child_div3") 
              .append("svg") 
              .attr('width',  xSizepie  ) 
              .attr('height', ySizepie  ) 
              .append("g") 
              .attr("transform","translate(" + xSizepie/2 + "," + ySizepie/2 + ")"); 
const radius = Math.min(xSizepie, ySizepie) / 2; 
var color = d3.scaleOrdinal(['#4daf4a','#377eb8','#ff7f00','#984ea3','#e41a1c']); 



function piechart(){
	
var data = [3, 4, 8, 12, 5, 13, 34, 20, 29,8,5,6]; //more data added

 
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
