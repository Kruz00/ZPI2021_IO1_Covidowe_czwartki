import React, {useState} from 'react';
import Plot from 'react-plotly.js';

const CustomPlot = ({title, x, y, type, xAxisLabel, yAxisLabel}
                      : { title: string; x: string[]; y: string[]; type: any; xAxisLabel: string; yAxisLabel: string; }) => {
  const layout = {
    title: title,
    xaxis: {
      title: xAxisLabel
    },
    yaxis: {
      title: yAxisLabel
    }
  };
  const config = {
    staticPlot: true
  };

  return (
    <div>
      <Plot data={[
        {
          type: type,
          x: x,
          y: y,
          marker: {color: 'red'}
        }
      ]} useResizeHandler={true} style={{width: "100%", height: "100%"}} layout={layout} config={config}/>
    </div>
  )
}

export default CustomPlot