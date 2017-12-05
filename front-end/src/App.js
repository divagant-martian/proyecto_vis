import React, { Component } from 'react';
import BarChart from './components/BarChart.js';
/* import ProblemDescription from './components/ProblemDescription.js';*/
import ProjectBasicData from './components/ProjectBasicData.js';

import { csv } from 'd3';

const urlBackend = "http://192.168.1.62:8080/static";

class App extends Component {

  constructor() {
    super();
    this.chartClicked = this.chartClicked.bind(this);
    this.chartHovered = this.chartHovered.bind(this);

    this.state = {
      projects: [],
      currentProject: null
    };

    fetch(`${urlBackend}/data_projects.json`)
      .then(r => r.json())
      .then(({ data }) => this.setState({ projects: data, currentProject: data[0] }));
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
    if (this.state.projects.length > 0) {
      return (
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">Proyecto Vivienda Gratuita y de Interés Social</h1>
          </header>
          <div className="container">
            <ProjectBasicData data={this.state.currentProject}/>
          </div>
        </div>
      );
    }
    return "...";
  }
}
//   <BarChart data={barChartData} xn="salesperson" yn="sales" onClickFn={this.chartClicked} />

export default App;
