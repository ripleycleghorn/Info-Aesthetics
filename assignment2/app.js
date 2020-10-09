const svg = d3.select('.canvas')
    .append('svg')
        .attr('width', 800)
        .attr('height', 600);

//create margins and dimensions
const margin = {top: 20, bottom: 100, left: 100, right: 100}
const graphWidth = 800 - margin.left - margin.right;
const graphHeight= 600 - margin.top - margin.bottom;

//graph is the svg inside the container 
const graph = svg.append('g')
    .attr('width', graphWidth)
    .attr('height', graphHeight)
    .attr('transform', `translate(${margin.left}, ${margin.top})`)

const xAxisGroup = graph.append('g')
    .attr('transform', `translate(0, ${graphHeight})`);
const yAxisGroup = graph.append('g');

//add tooltip
const tip = d3
  .select("body")
  .append("div")
  .attr("class", "card")
  .style("padding", "8px") // Add some padding so the tooltip content doesn't touch the border of the tooltip
  .style("position", "absolute") // Absolutely position the tooltip to the body. Later we'll use transform to adjust the position of the tooltip
  .style("left", 0)
  .style("top", 0)
  .style("visibility", "hidden");

d3.json("data/lasthour.json").then(data => {
    
    const y = d3.scaleLinear()
      .domain([0,d3.max(data, d => d.properties.mag)])
      .range([graphHeight,0]);

    const x = d3.scaleBand()
      .domain(data.map(item => item.properties.place))
      .range([0,600])
      .paddingInner(-0.1)
    //   .paddingOuter(0.2);
   
    //join data to rect
    const rects = graph.selectAll('rect')
        .data(data)

    // console.log(rects);

    rects.attr('width', x.bandwidth)
        .attr('height', d => graphHeight - y(d.properties.mag))
        .attr('x', d => x(d.properties.place))
        .attr('y', d => y(d.properties.mag));

    //append the data selection to the DOM
    rects.enter()
        .append('rect')
            .attr('width', x.bandwidth)
            .attr('height', d => graphHeight - y(d.properties.mag))
            .attr('fill', '#c5c5c5')
            .attr('stroke', 'black')
            .attr('x', d => x(d.properties.place))
            .attr('y', d => y(d.properties.mag));

    graph.selectAll('rect')
        .on("mouseover", (event, d) => {
            let content = `<div class="name">${d.properties.place}</div>`;
            content += `<div class="mag">${d.properties.mag}</div>`;
            tip.html(content).style("visibility", "visible");
            tip.style("transform", "translate(120px,20px)");
            tip.style("padding", "5px");
            tip.style("background", "#847577");
            tip.style("color", "#fff");
            handleMouseOver(event, d);
        })
        .on("mouseout", (event, d) => {
            tip.style("visibility", "hidden");
            handleMouseOut(event, d);
        })

    //create and call the axes
    const xAxis = d3.axisBottom(x);
    const yAxis = d3.axisLeft(y)
        .ticks(5)

    xAxisGroup.call(xAxis);
    yAxisGroup.call(yAxis);

    xAxisGroup.selectAll('text')
        .attr('transform', 'rotate(-40)')
        .attr('text-anchor', 'end');

})

const handleMouseOver = (event, d) => {    
    d3.select(event.currentTarget)
        .transition()
        .duration(300)
        .attr("fill", "orange");
};

const handleMouseOut = (event, d) => {
    d3.select(event.currentTarget)
    .transition()
    .duration(300)
    .attr("fill", "#c5c5c5");
};