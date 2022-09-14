import React, {useState} from 'react';
import Dropdown from './Dropdown'
import Plot from 'react-plotly.js';

const DataInputSection = ({
                            currency,
                            periods,
                            mainCurrencyCallback,
                            secondCurrencyCallback,
                            periodCallback,
                            analysisButtonCallback
                          }
                            : {
  currency: string[];
  periods: string[];
  mainCurrencyCallback: Function;
  secondCurrencyCallback: Function;
  periodCallback: Function;
  analysisButtonCallback: Function
}) => {

  // const layout = {
  //   title: "Testowy wykres",
  //
  // };
  // const config = {
  //   staticPlot: true
  // };
  //

  return (
    <div>
      <Dropdown title="Waluta główna:" items={currency} callback={mainCurrencyCallback}></Dropdown>
      <Dropdown title="Waluta dla kursu" items={currency} callback={secondCurrencyCallback}></Dropdown>
      <Dropdown title="Przedział czasowy:" items={periods} callback={periodCallback}></Dropdown>
      <button onClick={() => analysisButtonCallback()}>Analizuj</button>
      {/*<Plot data={[*/}
      {/*  {*/}
      {/*    type: 'scatter',*/}
      {/*    x: [1, 2, 3],*/}
      {/*    y: [4, 6, 1],*/}
      {/*    marker: {color: 'red'}*/}
      {/*  }*/}
      {/*]} useResizeHandler={true} style={{width: "100%", height: "100%"}} layout={layout} config={config} />*/}
    </div>
  )
}

export default DataInputSection