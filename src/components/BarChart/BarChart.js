import React, {Component, useRef} from 'react';
import './BarChart.scss';
import * as d3 from "d3";



class BarChart extends Component {

  componentDidMount() {
    this.drawBarChart();
  }

  drawBarChart() {

    const data = [
      {name: "157.321", value: 50, color: "#1C7CD5" },
      {name: "157.321", value: 25, color: "#c724c7" },
      {name: "157.321", value: 25, color: "#e63431" }
    ];

    const height = 300;
    const width = 800;
    const margin = {top: 25, right: 25, bottom: 25, left: 25};

    const svgCanvas = d3.select("#chart"+this.props.id)
      .append("svg")
      .attr("viewBox", [0, 0, width, height]);

    // Eixo Vertical
    let y = d3.scaleLinear().domain([0, 100]).range([height - margin.bottom - margin.top, 0]);
    svgCanvas.append("g")
      .attr("transform", "translate("+margin.left+","+margin.top+")")
      .call(
        d3.axisLeft(y)
      );

      // Eixo Horizontal
      let x = d3.scaleBand()
                  .domain(d3.range(data.length))
                  .range([0, width-margin.left-margin.right])
                  .padding(0.5);

      svgCanvas.append("g")
        .attr("transform", "translate("+margin.left+","+(height-margin.top)+")")
        .call(
          d3.axisBottom(x)
          .tickFormat(i => data[i].name)
          .tickSizeOuter(0)
      );

      // DATA
      svgCanvas.append("g")
        .selectAll("rect")
        .data(data)
        .join("rect")
          .attr("fill", d => d.color)
          .attr("x", (d, i) => x(i)+margin.left)
          .attr("y", d => y(d.value)+margin.bottom)
          .attr("height", d => y(0) - y(d.value))
          .attr("width", x.bandwidth());



  }
  
  render() {
    return (
      <div className="BarChart">
        <div id={"chart"+this.props.id}></div>
      </div>
    )
  }
}
export default BarChart;


/*
const BarChart = () => {
  
  () {
    console.log("TESTE");
    const data = [ 2, 4, 2, 6, 8 ]
    drawBarChart(data)
  }
  
  function drawBarChart(data) {
    const svgCanvas = d3.select("canvas")
    .append("svg")
    .attr("width", 600)
    .attr("height", 400)
    .style("border", "1px solid black")
  }
  
  return (
  <div className="BarChart">
    <div></div>
  </div>
)};

BarChart.propTypes = {};

BarChart.defaultProps = {};

export default BarChart;
*/