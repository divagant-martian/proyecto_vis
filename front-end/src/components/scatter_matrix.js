import React from 'react';
import { Grid } from 'semantic-ui-react';
import ScatterPlot from './scatter_plot';

const ScatterMatrix = ({data, rows, columns}) => {
  return (
    <Grid columns={columns.length}>
      { rows.map((row, i) => {
        return (
          <Grid.Row key={row}>
            { columns.map((col, j) => {
              let xLabel = null;
              let yLabel = null;
              if (i === 0) {
                xLabel = {value: col, angle: 0, position: "top", offset: 200};
              }
              if (j === 0) {
                yLabel = {value: row, angle: -90, position: "innerLeft", offset: 100};
              }
              return (
                <Grid.Column key={col}>
                  <ScatterPlot
                    data={data}
                    xKey={col}
                    yKey={row}
                    xLabel={xLabel}
                    yLabel={yLabel}
                    color="#abcdef" />
                </Grid.Column>
              );}
            )}
          </Grid.Row> 
        );    
      })};
    </Grid>
  );
};

export default ScatterMatrix;
