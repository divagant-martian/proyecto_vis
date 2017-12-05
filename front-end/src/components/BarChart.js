import React, { Component } from 'react';
import * as d3 from 'd3';

class BarChart extends Component {
  constructor(props){
    super(props);
    this.createChart = this.createChart.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onHover = this.onHover.bind(this);
    this.state = {
      selected: null
    };
  }

  componentDidMount() {
    this.createChart()
  }

  componentDidUpdate() {
    this.createChart()
  }

  onClick(d) {
    this.setState({selected: d});
    if (typeof this.props.onClickFn !== 'undefined') {
      this.props.onClickFn(d);
    }
  }

  onHover(d) {
    if (typeof this.props.onHoverFn !== 'undefined') {
      this.props.onHoverFn(d);
    }
  }

  createChart() {
    const node = this.node;
    const xn = this.props.xn;
    const yn = this.props.yn;
    const data = this.props.data;

    var margin = {top: 20, right: 20, bottom: 30, left: 40},
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    // set the ranges
    var x = d3.scaleBand()
              .range([0, width])
              .padding(0.1);
    var y = d3.scaleLinear()
              .range([height, 0]);

    // append the svg object to the body of the page
    // append a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    var svg = d3.select(node)
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform",
                      "translate(" + margin.left + "," + margin.top + ")");

    // get the data
      // format the data
      data.forEach(function(d) {
        d[yn] = +d[yn];
      });

      // Scale the range of the data in the domains
      x.domain(data.map(function(d) { return d[xn]; }));
      y.domain([0, d3.max(data, function(d) { return d[yn]; })]);

      // append the rectangles for the bar chart
      svg.selectAll(".bar")
         .data(data)
         .enter().append("rect")
         .attr("class", "bar")
         .attr("x", d => { return x(d[xn]); })
         .attr("width", x.bandwidth())
         .attr("y", d => { return y(d[yn]); })
         .attr("height", d => { return height - y(d[yn]); })
         .classed("selected-barchart", d => this.state.selected === d)
         .on("click", this.onClick)
         .on("hover", this.onHover);

      // add the x Axis
      svg.append("g")
         .attr("transform", "translate(0," + height + ")")
         .call(d3.axisBottom(x));

      // add the y Axis
      svg.append("g")
         .call(d3.axisLeft(y));

  }

  render() {
    return <svg ref={node => this.node = node}
                width={500} height={500}>
    </svg>
  }

}

export default BarChart;
