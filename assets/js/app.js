/ Define SVG area dimensions
var svgWidth = 900;
var svgHeight = 700;

// Define the chart's margins as an object
var chartMargin = {
  top: 100,
  right: 100,
  bottom: 100,
  left: 100
};

// Define chart area dimensions
var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

// Select scatter id, append SVG area to id, and set dimensions
var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth);

// Append a group to the SVG area 
var chartGroup = svg.append("g")
  .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);


// Load data from data.csv
d3.csv("assets/data/data.csv").then(function(importedData) {
      console.log(importedData);
      
      // Parse data
      var state = importedData.map(d => d.state);
      console.log("State");
      console.log(state);
      var abbr = importedData.map(d => d.abbr);
      console.log("abbr");
      console.log(abbr);  
      var poverty = importedData.map(d => d.poverty);
      console.log("poverty");
      console.log(poverty);
      var age = importedData.map(d => d.age);
      console.log("age");
      console.log(age);
      var income = importedData.map(d => d.income);
      console.log("income")
      console.log(income);
      var healthcare = importedData.map(d => d.healthcare);
      console.log("healthcare");
      console.log(healthcare);
      var obesity = importedData.map(d => d.obesity);
      console.log("obesity");
      console.log(obesity);
      var smokes = importedData.map(d => d.smokes);
      console.log("smokes");
      console.log(smokes);

    // Turn strings into intergers/floats
      importedData.forEach(function(data) {
      data.income = +data.income;
      data.healthcare = +data.healthcare;
      data.poverty = +data.poverty;
    });


    var xLinearScale = d3.scaleLinear()
    .domain([8, d3.max(importedData, d => d.poverty + 2)])
    .range([0, chartWidth]);

    var yLinearScale = d3.scaleLinear()
    .domain([0, d3.max(importedData, d => d.healthcare + 2)])
    .range([chartHeight, 0]);

    
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    chartGroup.append("g")
      .attr("transform", `translate(0, ${chartHeight})`)
      .call(bottomAxis);

    chartGroup.append("g")
      .call(leftAxis);

    // Create circles
    chartGroup.selectAll("#scatter")
    .data(importedData)
    .enter()
    .append("circle")
    .classed("scatter", true)
    .attr("cx", d => xLinearScale(d.poverty))
    .attr("cy", d => yLinearScale(d.healthcare))
    .attr("r", "15")
    .attr("fill", "green")
    .attr("opacity", ".5");

    // Add text to circles
    chartGroup.selectAll("#circleText")
    .data(importedData)
    .enter()
    .append("text")
    .attr("dx", d => xLinearScale(d.poverty) - 12)
    .attr("dy", d => yLinearScale(d.healthcare) + 5)
    .attr("stroke", "white")
    .text(d => d.abbr);

    // Create axes labels
    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - chartMargin.left + 30)
      .attr("x",0 - (chartHeight / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .attr("font-size", "15 px")
      .attr("font-weight", 700)
      .text("Lacks Healthcare (%)");  

    chartGroup.append("text")
      .attr("transform", `translate(${chartWidth / 2}, ${chartHeight + chartMargin.top - 50})`)
      .style("text-anchor", "middle")
      .attr("font-size", "15 px")
      .attr("font-weight", 700)
      .text("In Poverty (%)");



  }).catch(function(error) {
    console.log(error);

});
