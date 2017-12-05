import React, { Component } from 'react';
import BarChart from './components/BarChart.js';
/* import ProblemDescription from './components/ProblemDescription.js';*/
import ProjectBasicData from './components/ProjectBasicData.js';

import { csv } from 'd3';

class App extends Component {

  constructor() {
    super();
    this.chartClicked = this.chartClicked.bind(this);
    this.chartHovered = this.chartHovered.bind(this);
  }

  chartClicked(data) {
    console.log('data clicked:');
    console.log(data);
  }

  chartHovered(data) {
    console.log('data hovered:');
    console.log(data);
  }

  render() {
    var barChartData = fetch("http://192.168.1.62:8080/static/BarChartData.json").then(res => res.json())
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Proyecto Vivienda Gratuita y de Interés Social</h1>
        </header>
        <div className="container">
          <ProjectBasicData data={{project:'proyecto X', city:'Ciudad', region:'Region', lat: 5.0646046, lng: -75.4992304, total: 30, constructor:'Constructor'}}/>
          <BarChart data={barChartData} xn="salesperson" yn="sales" onClickFn={this.chartClicked} />
        </div>
      </div>
    );
  }
}

export default App;
