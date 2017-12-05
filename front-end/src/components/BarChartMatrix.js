import React from 'react';
import { Grid } from 'semantic-ui-react';
import MiniBarChart from "./MiniBarChart";

const BarChartMatrix = ({data}) => {
	let regions = Object.keys(data);
	let times = ["tiempo_colegio", "tiempo_hospital", "tiempo_trabajo"];
	return(
		<Grid centered columns={regions.length} style={{width: 1000, height: 500, margin: "auto"}}>
			{
				times.map((t, i) => 
					<Grid.Row key={"row_" + t}>
						{
							regions.map((r, j) => {
								let xLabel = null;
								let yLabel = null;
								if (i === 0) {
									xLabel = r; 
								}
								if (j === 0) {
									yLabel = t;
								} 
								
								return (
									<Grid.Column key={"col_" + r}>
										<MiniBarChart data={data[r][t]} xLabel={xLabel} yLabel={yLabel}/>
									</Grid.Column>
								);
							} 
							)
						}
					</Grid.Row>
				)
			}
		</Grid>
	);
}

export default BarChartMatrix;
