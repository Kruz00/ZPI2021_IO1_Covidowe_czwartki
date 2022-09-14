import React, {useState} from 'react';
import Dropdown from './Dropdown'
import Plot from 'react-plotly.js';

const DataInputSection = () => {

  const layout = {
    title: "Testowy wykres",

  };
  const config = {
    staticPlot: true
  };
  const currency = ["EUR", "PLN", "USD", "GBP"]
  const periods = ["Tydzień", "2 tygodnie", "Miesiąc", "Kwartał", "Pół roku", "Rok"]
  const [mainCurrency, setMainCurrency] = useState("")
  const [secondCurrency, setSecondCurrency] = useState("")
  const [period, setPeriod] = useState("")

  return (
    <div>
      <Dropdown title="Waluta główna:" items={currency} callback={setMainCurrency}></Dropdown>
      <Dropdown title="Waluta dla kursu" items={currency} callback={setSecondCurrency}></Dropdown>
      <Dropdown title="Przedział czasowy:" items={periods} callback={setPeriod}></Dropdown>
      <button>Analizuj</button>
      <Plot data={[
        {
          type: 'scatter',
          x: [1, 2, 3],
          y: [4, 6, 1],
          marker: {color: 'red'}
        }
      ]} useResizeHandler={true} style={{width: "100%", height: "100%"}} layout={layout} config={config} />
    </div>
  )
}

export default DataInputSection