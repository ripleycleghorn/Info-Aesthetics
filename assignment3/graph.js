//create margins and dimensions
const margin = {top: 20, bottom: 0, left: 150, right: 100}
const graphWidth = 800 - margin.left - margin.right;
const graphHeight= 600 - margin.top - margin.bottom;

const svg = d3.select('.canvas')
    .append('svg')
        .attr('width', 800)
        .attr('height', 650)
        .style("background-color", "white")
        .style("margin", "auto")
    .append('g')
        .attr('width', graphWidth)
        .attr('height', graphHeight)
        .attr('transform', `translate(${margin.left}, ${margin.top})`)


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
        .attr("transform", "translate(0," + graphHeight + ")")
        .call(d3.axisBottom(x).ticks(5))
        .selectAll("text")
        // .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "middle")
        .style("font-family", "'Verdana', sans-serif")
        .style("color", "#555")
        .style("font-size", 12);

    // Add X axis label:
    svg.append("text")
        .attr("text-anchor", "end")
        .attr("x", 350)
        .attr("y", graphHeight + 40)
        .text("Percent of respondents")
        .style("font-family", "'Verdana', sans-serif")
        .style("color", "#555")
        .style("font-size", 12);

    // Y axis
    var y = d3.scaleBand()
    .domain(data.map(function(d) { return d.reason; }))
    .range([ 0, 580 ])
    .padding(1);
    svg.append("g")
        .call(d3.axisLeft(y))
        .selectAll("text")
        .style("font-family", "'Verdana', sans-serif")
        .style("color", "#555")
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
        .attr("stroke-width", ".5")

    // Circles
    svg.selectAll("mycircle")
    .data(data)
    .enter()
    .append("circle")
        .attr("cx", function(d) { return x(d.value/13); })
        .attr("cy", function(d) { return y(d.reason); })
        .attr("r", "6")
        .style("fill", "#829FD9")
        // .attr("stroke", "black")
    })