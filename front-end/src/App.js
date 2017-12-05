import React, { Component } from 'react';
import BarChart from './components/BarChart.js';
import ProjectBasicData from './components/ProjectBasicData.js';
import MySelector from "./components/my_selector";
import { Container, Header, Grid } from 'semantic-ui-react';
import ScatterPlotMatrix from './components/ScatterPlotMatrix.js';

const urlBackend = "http://192.168.1.62:8080/static";

const optCalidadVida = [
  ["Calidad de vida", 'comparacion_calidad_vida'],
  ["Situación económica", 'comparacion_situacion_economica'],
  ["Convivencia familiar", 'comparacion_convivencia_familiar']]
  .map((x) => ({key: x[1], value: x[1], text: x[0]}));

const optCalidadVivienda = [
  ["Estado de los servicios", 'estado_servicios'],
  ["Satisfacción de la vivienda", 'satisfaccion_vivienda'],
  ["Tamaño de vivienda", 'comparacion_tama\u00f1o_vivienda'],
  ["Comodidad de vivienda", 'comparacion_comodidad_vivienda']]
  .map((x) => ({key: x[1], value: x[1], text: x[0]}));

const optCalidadEntorno = [
  ['Comparacion ubicacion vivienda', 'comparacion_ubicacion_vivienda'],
  ['Percepcion ciudad', 'percepcion_ciudad'],
  ['Percepcion barrio', 'percepcion_barrio']]
  .map((x) => ({key: x[1], value: x[1], text: x[0]}));

class App extends Component {
  constructor() {
    super();
    this.chartClicked = this.chartClicked.bind(this);
    this.chartHovered = this.chartHovered.bind(this);
    this.state = {
      projects: {},
      currentProject: null,
      histograms: {},
      currentHistCVida: null,
      currentHistCVivi: null,
      currentHistCEnto: null,
      raw: {},
      currentRaw: null,
      dataGroup: []
    };

    fetch(`${urlBackend}/data_projects.json`)
      .then(r => r.json())
      .then((projects) => {
        let currentProject = Object.keys(projects)[0];
        this.setState({ projects, currentProject });
        fetch(`${urlBackend}/data_hist.json`)
          .then(r => r.json())
          .then((data) => {
            this.setState({ histograms: data,
              currentHistCVida: 'comparacion_calidad_vida',
              currentHistCVivi: 'satisfaccion_vivienda',
              currentHistCEnto: 'percepcion_ciudad'
            });
          });

        fetch(`${urlBackend}/data_raw.json`)
          .then(r => r.json())
          .then((data) => {
            this.setState({ raw: data, currentRaw: data[currentProject]});
          });

        fetch(`${urlBackend}/data_group.json`)
          .then(r => r.json())
          .then(({ data }) => {
            this.setState({ dataGroup: data });
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
    let {projects, currentProject, histograms, currentHistCVida, currentHistCVivi, currentHistCEnto, currentRaw, raw, dataGroup } = this.state;
    if (currentProject && currentHistCVida && currentRaw && dataGroup.length) {
      let optProjects = Object.keys(projects).map(key => ({ key: key, value: key, text: projects[key].project }));
      return (
        <div className="App">
          <Container textAlign="center">
            <Header as="h1">Proyecto Vivienda Gratuita y de Interés Social</Header>
            <MySelector
              options={optProjects}
              defaultValue={currentProject}
              handleChange={currentProject => this.setState({currentProject: currentProject, currentRaw: raw[currentProject] })}
              placeholder="Seleccione un proyecto"/>
            <ProjectBasicData data={projects[currentProject]}/>
            <Grid columns={3}>
              <Grid.Row>
                <Grid.Column>
                  <Header as="h3">Percepción de calidad de vida</Header>
                  <MySelector
                    options={optCalidadVida}
                    defaultValue={currentHistCVida}
                    handleChange={currentHistCVida => this.setState({ currentHistCVida })}
                    placeholder="Seleccione una variable"/>
                </Grid.Column>
                <Grid.Column>
                  <Header as="h3">Percepción de calidad de vivienda</Header>
                  <MySelector
                    options={optCalidadVivienda}
                    defaultValue={currentHistCVivi}
                    handleChange={currentHistCVivi => this.setState({ currentHistCVivi })}
                    placeholder="Seleccione una variable"/>
                </Grid.Column>
                <Grid.Column>
                  <Header as="h3">Percepción de calidad de entorno</Header>
                  <MySelector
                    options={optCalidadEntorno}
                    defaultValue={currentHistCEnto}
                    handleChange={currentHistCEnto => this.setState({ currentHistCEnto })}
                    placeholder="Seleccione una variable"/>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <BarChart data={histograms[currentProject][currentHistCVida]} xn="bin" yn="count" width={350} height={300}/>
                </Grid.Column>
                <Grid.Column>
                  <BarChart data={histograms[currentProject][currentHistCVivi]} xn="bin" yn="count" width={350} height={300}/>
                </Grid.Column>
                <Grid.Column>
                  <BarChart data={histograms[currentProject][currentHistCEnto]} xn="bin" yn="count" width={350} height={300}/>
                </Grid.Column>
              </Grid.Row>
            </Grid>
            <ScatterPlotMatrix
              data={dataGroup}
              yTraits={['estado_servicios',
                'satisfaccion_vivienda',
                'comparacion_tama\u00f1o_vivienda',
                'comparacion_comodidad_vivienda',
                'comparacion_ubicacion_vivienda',
                'percepcion_ciudad',
                'percepcion_barrio']}
                xTraits={['comparacion_calidad_vida',
                  'comparacion_situacion_economica',
                  'comparacion_convivencia_familiar']}
                  size={200} padding={40}
                />
                <ScatterPlotMatrix
                  data={dataGroup}
                  yTraits={['estado_servicios',
                    'satisfaccion_vivienda',
                    'comparacion_tama\u00f1o_vivienda',
                    'comparacion_comodidad_vivienda',
                    'comparacion_ubicacion_vivienda',
                    'percepcion_ciudad',
                    'percepcion_barrio']}
                    xTraits={['comparacion_calidad_vida',
                      'comparacion_situacion_economica',
                      'comparacion_convivencia_familiar']}
                      size={200} padding={40}
                    />
                  </Container>
                </div>
      );
    }
    return "...";
  }

}


export default App;
