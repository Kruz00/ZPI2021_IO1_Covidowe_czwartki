import React, {useState} from 'react';
import Plot from 'react-plotly.js';

const CustomPlot = ({title, x, y, type}
                      : { title: string; x: string[]; y: string[]; type: any }) => {
  const layout = {
    title: title,

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