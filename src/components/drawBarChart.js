import * as d3 from "d3";

export let drawBarChart = (barChartLayer, data, xScale, yScale, barChartWidth, barChartHeight) => {
  // scatterPlotLayer, scatterPlotWidth, scatterPlotHeight

    //Task 7: Complete the code to draw the bars
    //Hint:
    //1. The bars are drawn as rectangles
    //2. Add a mouseover event to the bar
    //3. The mouseover event should also highlight the corresponding points in the scatter plot
    //4. The mouseout event should remove the highlight from the corresponding points in the scatter plot 
    //5. You can refer to the code in the drawScatterPlot function 

    //Task 8: Connect the bar chart with the scatter plot
    //Hint:
    //1. Add a mouseover event to the bar
    //2. The mouseover event should also highlight the corresponding points in the scatter plot

    const scatterPlotWidth = 550;  
    const scatterPlotHeight = 400; 

    barChartLayer.selectAll('.bar') // Select all bars
        .data(data) // Bind data to the bars
        .enter() // Create placeholders for each data point
        .append('rect') // Append a rect for each data point
        .attr('class', d => `bar ${d.station.replace(/[^a-zA-Z]/g, "")}`) // Set class names
        .attr('x', d => xScale(d.station)) // Position the bar on the x-axis
        .attr('y', d => yScale(d.start)) // Position the bar on the y-axis
        .attr('width', xScale.bandwidth()) // Set the width of each bar based on the scale
        .attr('height', d => barChartHeight - yScale(d.start)) // Set the height of each bar
        .style('fill', 'steelblue') // Default color for bars
        .style('stroke', 'black') // Bar border color
        .style('stroke-width', 2) // Bar border width
        .on('mouseover', (event, d) => {
            // On mouseover, change the color of the bar and corresponding scatter plot point
            d3.select(event.target)
                .style('fill', 'red'); // Change the bar color to red

            // Highlight the corresponding scatter plot point (assuming the points have the same class)
            d3.selectAll(`.point.${d.station.replace(/[^a-zA-Z]/g, "")}`)
                .style('fill', 'red')
                .attr('r', 10) // Make the scatter plot point bigger
                .raise(); // Bring the point to the top

            // Append a yellow rectangle to isolate the scatter plot point
            // console.log("yellow rect is printed", scatterPlotLayer);
            // console.log("Number of elements in scatterPlotLayer:", scatterPlotLayer.size());
            d3.select('.scatterPlotLayer')
                .append('rect')
                .attr('class', 'highlight-rect')
                .attr('x', 0)
                .attr('y', 0)
                .attr('width', scatterPlotWidth)
                .attr('height', scatterPlotHeight)
                .style('fill', 'yellow')
                .style('opacity', 0.5)
                .raise();
        })
        .on('mouseout', (event, d) => {
            // On mouseout, revert the color and size of the bar and scatter plot point
            d3.select(event.target)
                .style('fill', 'steelblue'); // Revert the bar color

            // Revert the scatter plot point
            d3.selectAll(`.point.${d.station.replace(/[^a-zA-Z]/g, "")}`)
                .style('fill', 'steelblue')
                .attr('r', 5) // Reset the size of the point
                .lower(); // Send the point back to its original position
            
            // Remove the yellow rectangle
            d3.select('.scatterPlotLayer').selectAll('.highlight-rect').remove();
        });
  }