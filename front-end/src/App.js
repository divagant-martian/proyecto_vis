import React, { Component } from 'react';
import { Container, Header, Grid } from 'semantic-ui-react';
import BarChart from './components/BarChart.js';
import ProjectBasicData from './components/ProjectBasicData.js';
import MySelector from "./components/my_selector";
import ScatterPlotMatrix from './components/ScatterPlotMatrix.js';
import BarChartMatrix from './components/BarChartMatrix.js';

const urlBackend = "https://raw.githubusercontent.com/zombiefungus/proyecto_vis/master/data/";

const optCalidadVida = [
    ["Life Quality", 'comparacion_calidad_vida'],
    ["Economic Situation", 'comparacion_situacion_economica'],
    ["Family Life", 'comparacion_convivencia_familiar']]
    .map((x) => ({key: x[1], value: x[1], text: x[0]}));

const optCalidadVivienda = [
    ["Housing Satisfaction", 'satisfaccion_vivienda'],
    ["House Size", 'comparacion_tama\u00f1o_vivienda'],
    ["House Comfort", 'comparacion_comodidad_vivienda']]
    .map((x) => ({key: x[1], value: x[1], text: x[0]}));

const optCalidadEntorno = [
    ["Public Services State", 'estado_servicios'],
    ['House Location', 'comparacion_ubicacion_vivienda'],
    ['City Perception', 'percepcion_ciudad'],
    ['Neighborhood Perception', 'percepcion_barrio']]
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
            dataGroup: [],
            dataTime: []
        };

        fetch(`${urlBackend}/data_projects.json`)
            .then(r => r.json())
            .then((projects) => {
                let currentProject = Object.keys(projects)[0];
                this.setState({ projects, currentProject });
                fetch(`${urlBackend}/data_hist.json`)
                    .then(r => r.json())
                    .then((data) => {
                        this.setState({
                            histograms: data,
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

                fetch(`${urlBackend}/data_time.json`)
                    .then(r => r.json())
                    .then((data) => {
                        this.setState({ dataTime: data });
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
        let {projects, currentProject, histograms, currentHistCVida, currentHistCVivi, currentHistCEnto, currentRaw, raw, dataGroup, dataTime } = this.state;
        if (currentProject && currentHistCVida && currentRaw && dataGroup.length > 0 && Object.keys(dataTime).length > 0) {
            let optProjects = Object.keys(projects).map(key => ({ key: key, value: key, text: projects[key].project }));
            return (
              <div className="App">
                <Container fluid textAlign="center">
                  <Header as="h1">Free Housing Project in Colombia</Header>
                  <p className="explain">
                    The free housing program is an initiative created by the colombian Ministry of Housing in 2012 to supply of zero-cost houses to people which had more necessities. </p>
                  <p className="explain">
                    It is a joined effort between public and private entities with a great cause. However, som time after these houses were given, many beneficiaries started complaining about the buildings being unfinished, even if catalogued as finished.
                  </p>
                  <p className="explain">
                    This project aims to explore how a group of surveyed people percives their new home, in order to understand what factors may play a role in a better life quality, as perceived by its inhabitants
                  </p>
                  <p className="explain">Let's begin by picking a project:</p>
                  <MySelector
                    options={optProjects}
                    defaultValue={currentProject}
                    handleChange={currentProject => this.setState({currentProject: currentProject, currentRaw: raw[currentProject] })}
                    placeholder="Seleccione un proyecto"/>
                  <ProjectBasicData data={projects[currentProject]}/>
                  <Grid columns={3}>
                    <Grid.Row>
                      <p className="explain">Participants of the survey where asked questions regarding how their life had changed after moving to the new houses <strong>(Life quality Variables)</strong>. They were also asked about how good they think their new home is <strong>(House quality)</strong>, as well as the environment in which the houses were built <strong>(Environment Quality)</strong></p>
                      <p className="explain">In this case, <strong>0 means the situation got worse</strong> while <strong>1 means improvement</strong></p>
                      <Grid.Column>
                        <Header as="h3">Life Quality Perception</Header>
                        <MySelector
                          options={optCalidadVida}
                          defaultValue={currentHistCVida}
                          handleChange={currentHistCVida => this.setState({ currentHistCVida })}
                          placeholder="Seleccione una variable"/>
                      </Grid.Column>
                      <Grid.Column>
                        <Header as="h3">House Quality Perception</Header>
                        <MySelector
                          options={optCalidadVivienda}
                          defaultValue={currentHistCVivi}
                          handleChange={currentHistCVivi => this.setState({ currentHistCVivi })}
                          placeholder="Seleccione una variable"/>
                      </Grid.Column>
                      <Grid.Column>
                        <Header as="h3">Environment Quality Perception</Header>
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
                  <p className="explain">But how do these Variables relate? Are Life Quality Variables affected by those that express Quality of the House, or the Enronment?</p>
                  <p className="explain">Let's see</p>
                  <ScatterPlotMatrix
                    data={dataGroup}
                    xTraits={['estado_servicios',
                              'satisfaccion_vivienda',
                              'comparacion_tama\u00f1o_vivienda',
                              'comparacion_comodidad_vivienda',
                              'comparacion_ubicacion_vivienda',
                              'percepcion_ciudad',
                              'percepcion_barrio']}
                    yTraits={['comparacion_calidad_vida',
                              'comparacion_situacion_economica',
                              'comparacion_convivencia_familiar']}
                    size={180} padding={30}
                  />
                  <Container>
                    <p className="explain">
                      Each point represent the mean of each variable, as perceived by the surveyed people. This chart allows us to identify, for example, a clear correlation between feeling satisfied with the new home, and having a better life quality
                    </p>
                    <BarChartMatrix data={dataTime}/>
                  </Container>
                </Container>
              </div>
            );
        }
        return "...";
    }

}


export default App;
