import React, { Component } from 'react';
import BarChart from './components/BarChart.js';
import ProjectBasicData from './components/ProjectBasicData.js';
import MySelector from "./components/my_selector";

const urlBackend = "http://192.168.1.62:8080/static";

class App extends Component {

  constructor() {
    super();
    this.chartClicked = this.chartClicked.bind(this);
    this.chartHovered = this.chartHovered.bind(this);

    this.state = {
      projects: {},
      currentProject: null,
      histograms: {},
      currentHist: null,
      raw: {},
      currentRaw: null,
    };

    fetch(`${urlBackend}/data_projects.json`)
      .then(r => r.json())
      .then((projects) => {
        let currentProject = Object.keys(projects)[0]; 
        this.setState({ projects, currentProject });
        
        fetch(`${urlBackend}/data_hist.json`)
          .then(r => r.json())
          .then((data) => {
            this.setState({ histograms: data, currentHist: 'comparacion_tamaño_vivienda'});
          });
        
        fetch(`${urlBackend}/data_raw.json`)
          .then(r => r.json())
          .then((data) => {
            this.setState({ raw: data, currentRaw: data[currentProject]});
          });

      });
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
    let {projects, currentProject, histograms, currentHist} = this.state;
    if (currentProject && currentHist) {
      
      let optProjects = Object.keys(projects).map(key => ({ key: key, value: key, text: projects[key].project }));
      let optCalidadVida = ['comparacion_tamaño_vivienda', 'comparacion_comodidad_vivienda', 'comparacion_calidad_vida']
        .map(key => ({key: key, value: key, text: key}));
      return (
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">Proyecto Vivienda Gratuita y de Interés Social</h1>
          </header>
          <div className="container">
            <MySelector
              options={optProjects}
              defaultValue={currentProject}
              handleChange={currentProject => this.setState({ currentProject })}
              placeholder="Seleccione un proyecto"/>
            <ProjectBasicData data={projects[currentProject]}/>
            <MySelector
              options={optCalidadVida}
              defaultValue={currentHist}
              handleChange={currentHist => this.setState({ currentHist })}
              placeholder="Seleccione una variable"/>
            <BarChart data={histograms[currentProject][currentHist]} xn="bin" yn="count"/>
          </div>
        </div>
      );
    }
    return "...";
  }
}


export default App;
