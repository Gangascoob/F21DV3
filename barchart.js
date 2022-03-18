
//various variables
const margin = { top: 40, bottom: 10, left: 120, right: 20 };
var barwidth = 700;
var barheight = 200;
var temp;


//Initialising date - kind of central date chosen as starting point, but can be changed with sliders.

var day = 25;
var month = 07;
var year = 2021;

//This ensures all day/month values are exactly 2 digits long (e.g. 07, 15, 31) and in string format.
var dayformatted = ("0" + day).slice(-2);
var monthformatted = ("0" + month).slice(-2);
var date = year.toString() + "-" + monthformatted + "-" + dayformatted;

//Used to update barchart data whenever date is changed via slider.
function setDate(){
dayformatted = ("0" + day).slice(-2);
monthformatted = ("0" + month).slice(-2);
date = year.toString() + "-" + monthformatted + "-" + dayformatted;
//console.log(date);
barchart(temp);
updatebar(filteredDataBar);
}


//create svg for barchart.
var svgbar = d3.select("#child_div3")
      		.append("svg")
                  .attr("width", barwidth)
                  .attr("height", barheight);

//keeps barchart within specified margins.                 
const g = svgbar.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

//scale constants for barchart.
//.scaleBand sets width for each entry to barchart evenly spread.
//.rangeRound sets the range of the scale.
//paddingInner is just for some extra spacing between bars.
const xscale = d3.scaleLinear().range([0, barwidth]);
const yscale = d3.scaleBand().rangeRound([0, barheight-40]).paddingInner(0.1);
      
const xaxis = d3.axisTop().scale(xscale);
const yaxis = d3.axisLeft().scale(yscale);
const g_xaxis = g.append("g").attr("class", "x axis");
const g_yaxis = g.append("g").attr("class", "y axis");

let filteredDataBar = [];
let filteredData = [];


//Main function for producing bar charts.
function barchart(name){

let barcsv = "https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/vaccinations/vaccinations.csv";
let data = []; //more data added
temp = name;
//console.log(iso);
//console.log(temp);

//Pushes specific attributes of the csv into data[] so it can be filtered.
//Data is then filtered to only return the row with the matching name and dates.
//Since this is only ever an array of length 1, we can target it easily to select only the data we want for the graph
//and rearrange it into a better format for graphing use. 
d3.csv(barcsv, function(csv){
data.push({location: csv.location, date: csv.date, vaccinated:
   + csv.people_vaccinated, 
   fullvaccinated: + csv.people_fully_vaccinated,
   booster: + csv.total_boosters});			
}).then(function filter(){
filteredData = data.filter(function(d){return d.location == name && d.date == date});


filteredDataBar = [{vacctype: "Booster", number: filteredData[0].booster}, {vacctype: "Fully Vaccinated", number: (filteredData[0].fullvaccinated - filteredData[0].booster)}, 
{vacctype: "Singly Vaccinated", number: (filteredData[0].vaccinated - filteredData[0].booster - filteredData[0].fullvaccinated)} ];

//console.log(data[5].location);
//console.log(filteredDataBar);
//console.log(filteredVaccNumbers);
});
};


//Function for updating the bars.
//
function updatebar(data){


      xscale.domain([0, d3.max(data, function(d){return d.number} )]);
      yscale.domain(data.map(function(d){return d.vacctype}));
      
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
                  .attr("height", (yscale.bandwidth() - 10))
          .attr("width", (d) => xscale(d.number))
          .attr("y", (d) => yscale(d.vacctype));
          
      rect.select("title").text((d) => d.vacctype);
      
};
      

