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


    rects.attr('width', x.bandwidth)
        .attr('height', d => graphHeight - y(d.properties.mag))
        .attr('fill', 'orange')
        .attr('x', d => x(d.properties.title))
        .attr('y', d => y(d.properties.mag));

    //append the data selection to the DOM
    rects.enter()
        .append('rect')
            .attr('width', x.bandwidth)
            .attr('height', d => graphHeight - y(d.properties.mag))
            .attr('fill', 'white')
            .attr('stroke', 'black')
            .attr('x', d => x(d.properties.place))
            .attr('y', d => y(d.properties.mag));

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