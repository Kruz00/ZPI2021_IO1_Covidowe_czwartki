import React, {useState} from 'react';
import Plot from 'react-plotly.js';

const AnalysisSection = ({response, response2} : {response: string; response2: string;}) => {
    var mainCurrency;
    try{
        mainCurrency = JSON.parse(response);
    } catch (error) {
        mainCurrency = null;
    }

    var secondCurrency;
    try{
        secondCurrency = JSON.parse(response2);
    } catch (error) {
        secondCurrency = null;
    }
    const layoutFirstPlot = {
        title: "Kurs waluty AAA/BBB",

    };
    const config = {
        staticPlot: true
    };

    const xFirstPlot: any=[];
    const mainCurrencyFirstPlot: any=[];
    const secondCurrencyFirstPlot: any=[];
    const yFirstPlot: any=[];

    if(!mainCurrency && !secondCurrency){
        return(
                  <div>
                  </div>
                )
    }

    if(!mainCurrency){
        layoutFirstPlot.title = "Kurs waluty PLN/" + secondCurrency["code"];

        secondCurrency.rates.forEach((e: any) => {
            xFirstPlot.push(e["effectiveDate"]);
            secondCurrencyFirstPlot.push(e["mid"]);
        });
        for (let i = 0; i < secondCurrencyFirstPlot.length; i++) {
            yFirstPlot.push(1/secondCurrencyFirstPlot[i]);
        }
    } else if(!secondCurrency) {
            layoutFirstPlot.title = "Kurs waluty " + mainCurrency["code"] + "/PLN";

            mainCurrency.rates.forEach((e: any) => {
                xFirstPlot.push(e["effectiveDate"]);
                mainCurrencyFirstPlot.push(e["mid"]);
            });

            for (let i = 0; i < mainCurrencyFirstPlot.length; i++) {
                yFirstPlot.push(mainCurrencyFirstPlot[i]);
            }

        } else {
            layoutFirstPlot.title = "Kurs waluty " + mainCurrency["code"] + "/" + secondCurrency["code"];

            mainCurrency.rates.forEach((e: any) => {
                xFirstPlot.push(e["effectiveDate"]);
                mainCurrencyFirstPlot.push(e["mid"]);
            });

            secondCurrency.rates.forEach((e: any) => {
                secondCurrencyFirstPlot.push(e["mid"]);
            });

            for (let i = 0; i < mainCurrencyFirstPlot.length; i++) {
                yFirstPlot.push(mainCurrencyFirstPlot[i]/secondCurrencyFirstPlot[i]);
            }
        }

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