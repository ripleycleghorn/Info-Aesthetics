//set the dimensions and margins of the graph
var margin = {top: 30, right: 30, bottom: 80, left: 100},
    width = 800 - margin.left - margin.right,
    height = 700 - margin.top - margin.bottom;

var svg = d3.select(".canvas")
    .append("svg")
    // .attr("viewBox", [-250, 0, width, height])
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .style("background-color", "#7E9E9B")
    .style("margin", "auto")
    .append("g")
      .attr("transform",
            `translate(${0},${margin.top})`);

d3.json("data.json").then(data => {

    //sort bars based on value
    data = data.sort(function (a, b) {
        return d3.ascending(b.value, a.value);
    })

    // Add X axis
    var x = d3.scaleLinear()
        .domain([0,d3.max(data, d => d.value/13)])
        .range([ 0, 580]);
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        // .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "middle")
        .style("font-family", "'Roboto', sans-serif")
        .style("font-size", 12);

    // Add X axis label:
    svg.append("text")
        .attr("text-anchor", "end")
        .attr("x", 350)
        .attr("y", height + margin.top + 5)
        .text("Percent of respondents")
        .style("font-family", "'Roboto', sans-serif")
        .style("font-size", 12);

    // Y axis
    var y = d3.scaleBand()
    .range([ 0, height ])
    .domain(data.map(function(d) { return d.reason; }))
    .padding(1);
    svg.append("g")
        .call(d3.axisLeft(y))
        .selectAll("text")
        .style("font-family", "'Roboto', sans-serif")
        .style("font-size", 12);

    // Lines
    svg.selectAll("myline")
    .data(data)
    .enter()
    .append("line")
        .attr("x1", function(d) { return x(d.value/13); })
        .attr("x2", x(0))
        .attr("y1", function(d) { return y(d.reason); })
        .attr("y2", function(d) { return y(d.reason); })
        .attr("stroke", "grey")
        .attr("stroke-width", "2")

    // Circles
    svg.selectAll("mycircle")
    .data(data)
    .enter()
    .append("circle")
        .attr("cx", function(d) { return x(d.value/13); })
        .attr("cy", function(d) { return y(d.reason); })
        .attr("r", "6")
        .style("fill", "white")
        .attr("stroke", "black")
    })