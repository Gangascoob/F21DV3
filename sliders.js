let dataday = [01, 02, 03, 04, 05, 06, 07, 08, 09, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
let datamonth = [01, 02, 03, 04, 05, 06, 07, 08, 09, 10, 11, 12];
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
    .on('onchange', val => {
        month = val;
        setDate();
        console.log(date);
    })
   ;

  var gStep = d3
    .select('#slider-month')
    .append('svg')
    .attr('width', 320)
    .attr('height', 100)
    .append('g')
    .attr('transform', 'translate(15,30)');

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
  .attr('width', 320)
  .attr('height', 100)
  .append('g')
  .attr('transform', 'translate(15,30)');

gStep2.call(sliderStepDayYear);


var sliderStepDayDay = d3
  .sliderBottom()
  .min(d3.min(dataday))
  .max(d3.max(dataday))
  .width(250)
  .tickFormat(d3.format('1'))
  .ticks(8)
  .step(1)
  .default(1)
 ;

var gStep3 = d3
  .select('#slider-day')
  .append('svg')
  .attr('width', 320)
  .attr('height', 100)
  .append('g')
  .attr('transform', 'translate(15,30)');

gStep3.call(sliderStepDayDay);

 // d3.select('p#value-step').text(d3.format('.2%')(sliderStep.value()));
