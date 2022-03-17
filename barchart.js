const margin = { top: 40, bottom: 10, left: 120, right: 20 };
var barwidth = 800;
var barheight = 300;

let day = 25;
let month = 07;
let year = 2021;

let date = year.toString() + "-" + month.toString() + "-" + day.toString();


var svgbar = d3.select("#child_div3")
      		.append("svg")
                  .attr("width", barwidth)
                  .attr("height", barheight);

const g = svgbar.append("g").attr("transform", `translate(${margin.left},${margin.top})`);


const xscale = d3.scaleLinear().range([0, barwidth]);
      const yscale = d3.scaleBand().rangeRound([0, barheight]).paddingInner(0.1);
      
      const xaxis = d3.axisTop().scale(xscale);
      const yaxis = d3.axisLeft().scale(yscale);
      const g_xaxis = g.append("g").attr("class", "x axis");
      const g_yaxis = g.append("g").attr("class", "y axis");

let filteredDataBar = [];

function barchart(name){

      let piecsv = "https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/vaccinations/vaccinations.csv";
      let data = []; //more data added


let filteredData = [];

d3.csv(piecsv, function(csv){
data.push({location: csv.location, date: csv.date, vaccinated:
   + csv.people_vaccinated, 
   fullvaccinated: + csv.people_fully_vaccinated,
   booster: + csv.total_boosters});			
}).then(function filter(){
filteredData = data.filter(function(d){return d.location == name && d.date == date});


filteredDataBar = [{vacctype: "Booster", number: filteredData[0].booster}, {vacctype: "Fully Vaccinated", number: (filteredData[0].fullvaccinated - filteredData[0].booster)}, 
{vacctype: "Singly Vaccinated", number: (filteredData[0].vaccinated - filteredData[0].booster - filteredData[0].fullvaccinated)} ];

//console.log(data[5].location);
console.log(filteredDataBar);
//console.log(filteredVaccNumbers);
});
};

function updatebar(data){


      xscale.domain([0, d3.max(data, (d) => d.number)]);
      yscale.domain(data.map((d) => d.vacctype));
      
      g_xaxis.transition().call(xaxis);
      g_yaxis.transition().call(yaxis);
      
      
      const rect = g.selectAll("rect")
                                                .data(data, (d) => d.vacctype)
                    .join(
                    (enter) => {
                    const rect_enter = enter.append("rect").attr("x", 0);
                    rect_enter.append("title");
                    return rect_enter;
                    },
                    (updatebar) => updatebar,
                    (exit) => exit.remove()
                    );
      rect.transition()
                  .attr("height", yscale.bandwidth())
          .attr("width", (d) => xscale(d.number))
          .attr("y", (d) => yscale(d.vacctype));
          
      rect.select("title").text((d) => d.vacctype);
      
};
      

