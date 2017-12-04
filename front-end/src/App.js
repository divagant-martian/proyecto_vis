import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as d3 from 'd3';
import BarChart from './components/BarChart.js';
import ScatterPlotMatrix from './components/ScatterPlotMatrix.js';

class App extends Component {
  render() {
    d3.csv("http://192.168.0.13:8080/static/flowers.csv", function(error, data) {
      if (error) throw error;
      console.log(data);
    }
    )

    return (
      <div className='App'>
        <div className='App-header'>
          <h2>d3ia dashboard</h2>
        </div>
        <div>
          <BarChart data={[5,10,1,3]} size={[500,500]} />
          <ScatterPlotMatrix/>
        </div>
      </div>
    );
  }
}

export default App;
