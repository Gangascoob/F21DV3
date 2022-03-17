let dataday = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
let datamonth = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
let datayear = [2021, 2022];


var sliderStepDayMonth = d3
    .sliderBottom()
    .min(d3.min(datamonth))
    .max(d3.max(datamonth))
    .width(250)
    .tickFormat(d3.format('1'))
    .ticks(12)
    .step(1)
    .default(1)
   ;

  var gStep = d3
    .select('#slider-month')
    .append('svg')
    .attr('width', 300)
    .attr('height', 100)
    .append('g')
    .attr('transform', 'translate(10,30)');

  gStep.call(sliderStepDayMonth);



  var sliderStepDayYear = d3
  .sliderBottom()
  .min(d3.min(datayear))
  .max(d3.max(datayear))
  .width(250)
  .tickFormat(d3.format('1'))
  .ticks(1)
  .step(1)
  .default(1)
 ;

var gStep2 = d3
  .select('#slider-year')
  .append('svg')
  .attr('width', 300)
  .attr('height', 100)
  .append('g')
  .attr('transform', 'translate(10,30)');

gStep2.call(sliderStepDayYear);

 // d3.select('p#value-step').text(d3.format('.2%')(sliderStep.value()));
