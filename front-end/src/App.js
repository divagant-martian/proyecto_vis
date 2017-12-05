import React, { Component } from 'react';
import ScatterMatrix from './components/scatter_matrix.js'

const varCalidadVida = ["comparacion_calidad_vida", "comparacion_situacion_economica", "comparacion_convivencia_familiar"];
const varCalidadVivienda = ["estado_servicios", "satisfaccion_vivienda", "comparacion_tamaño_vivienda", "comparacion_comodidad_vivienda"];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scatterData: null
    };
    fetch("http://192.168.1.62:8080/static/data.json")
      .then((r) => r.json())
      .then(({ scatterData }) => {
        this.setState({ scatterData })
      })
  }  
  render() {
    return (
      <div style={{width: 800, height: 600}}> 
        <ScatterMatrix data={this.state.scatterData} columns={varCalidadVivienda} rows={varCalidadVida}/>
      </div>
    );
  }
}

export default App;
