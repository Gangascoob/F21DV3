var data = [3, 4, 8, 12, 5, 13, 34, 20, 29,8,5,6]; //more data added
 
const xSize  = 400;   const ySize  = 400; 
const margin = 40; 
const xMax   = xSize - margin*2; 
const yMax   = ySize - margin*2; 
 
// Append SVG Object to the Page 
const svg = d3.select("#child_div3") 
              .append("svg") 
              .attr('width',  xSize  ) 
              .attr('height', ySize  ) 
              .append("g") 
              .attr("transform","translate(" + xSize/2 + "," + ySize/2 + ")"); 
 
const radius = Math.min(xSize, ySize) / 2; 
 
var color = d3.scaleOrdinal(['#4daf4a','#377eb8','#ff7f00','#984ea3','#e41a1c']); 
 
// Generate the pie 
var pie = d3.pie(); 
 
// Generate the arcs 
var arc = d3.arc() 
      .innerRadius(0) 
      .outerRadius(radius); 
 
//Generate groups 
var arcs = svg.selectAll("arc") 
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
var arctext = svg.selectAll("arc")
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
