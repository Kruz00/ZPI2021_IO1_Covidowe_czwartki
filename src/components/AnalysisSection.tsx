import React, {useState} from 'react';
import Plot from 'react-plotly.js';

const AnalysisSection = ({response, response2} : {response: string; response2: string;}) => {

    const [mainCurrency, setMainCurrency] = useState(JSON.parse(response));
    const [secondCurrency, setSecondCurrency] = useState(JSON.parse(response2));
    const layoutFirstPlot = {
        title: "Kurs waluty " + mainCurrency["code"] + "/" + secondCurrency["code"],

    };
    const config = {
        staticPlot: true
    };
    let x = [2,2,2];

    const xFirstPlot: any=[];
    const mainCurrencyFirstPlot: any=[];

    mainCurrency.rates.forEach((e: any) => {
        xFirstPlot.push(e["effectiveDate"]);
        mainCurrencyFirstPlot.push(e["mid"]);
    });

    const secondCurrencyFirstPlot: any=[];

    secondCurrency.rates.forEach((e: any) => {
        secondCurrencyFirstPlot.push(e["mid"]);
    });

    const yFirstPlot: any=[];

    for (let i = 0; i < mainCurrencyFirstPlot.length; i++) {
            yFirstPlot.push(mainCurrencyFirstPlot[i]/secondCurrencyFirstPlot[i]);
    }


    console.log('xdddresponse ', yFirstPlot);
    return (
        <div>
         <Plot data={[
                {
                  type: 'scatter',
                  x: xFirstPlot,
                  y: yFirstPlot,
                  marker: {color: 'red'}
                }
              ]} useResizeHandler={true} style={{width: "100%", height: "100%"}} layout={layoutFirstPlot} config={config} />
        </div>
      )
}
export default AnalysisSection