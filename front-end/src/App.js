import React, { Component } from 'react';
import BarChart from './components/BarChart.js';
import ProjectBasicData from './components/ProjectBasicData.js';
import MySelector from "./components/my_selector";
import { Container, Header } from 'semantic-ui-react';

const urlBackend = "http://192.168.1.62:8080/static";

const optCalidadVida = [
	["Calidad de vida", 'comparacion_calidad_vida'],
	["Situación económica", 'comparacion_situacion_economica'],
	["Convivencia familiar", 'comparacion_convivencia_familiar']]
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
						this.setState({ histograms: data, currentHist: 'comparacion_calidad_vida'});
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
			return (
				<div className="App">
					<Container textAlign="center">
						<Header as="h1">Proyecto Vivienda Gratuita y de Interés Social</Header>
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
					</Container>
				</div>
			);
		}
		return "...";
	}
}


export default App;
