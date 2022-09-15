import React, {useState} from 'react';
import CustomPlot from "./CustomPlot"

const AnalysisSection = ({response, response2}: { response: string; response2: string; }) => {
  var mainCurrency;
  try {
    mainCurrency = JSON.parse(response);
  } catch (error) {
    mainCurrency = null;
  }

  var secondCurrency;
  try {
    secondCurrency = JSON.parse(response2);
  } catch (error) {
    secondCurrency = null;
  }
  const xFirstPlot: any = [];
  const mainCurrencyFirstPlot: any = [];
  const secondCurrencyFirstPlot: any = [];
  const yFirstPlot: any = [];
  const mainCurrencyCode = mainCurrency == null ? "PLN" : mainCurrency['code']
  const secondCurrencyCode = secondCurrency == null ? "PLN" : secondCurrency['code']

  if (!mainCurrency && !secondCurrency) {
    return (
      <div>
      </div>
    )
  }

  if (!mainCurrency) {
    secondCurrency.rates.forEach((e: any) => {
      xFirstPlot.push(e["effectiveDate"]);
      secondCurrencyFirstPlot.push(e["mid"]);
      mainCurrencyFirstPlot.push(1);
    });
  } else if (!secondCurrency) {
    mainCurrency.rates.forEach((e: any) => {
      xFirstPlot.push(e["effectiveDate"]);
      mainCurrencyFirstPlot.push(e["mid"]);
      secondCurrencyFirstPlot.push(1)
    });
  } else {
    mainCurrency.rates.forEach((e: any) => {
      xFirstPlot.push(e["effectiveDate"]);
      mainCurrencyFirstPlot.push(e["mid"]);
    });

    secondCurrency.rates.forEach((e: any) => {
      secondCurrencyFirstPlot.push(e["mid"]);
    });
  }
  for (let i = 0; i < mainCurrencyFirstPlot.length; i++) {
    yFirstPlot.push(mainCurrencyFirstPlot[i] / secondCurrencyFirstPlot[i]);
  }
  const firstPlotTitle = "Kurs waluty " + mainCurrencyCode + "/" + secondCurrencyCode;

  return (
    <div>
      <CustomPlot title={firstPlotTitle} x={xFirstPlot} y={yFirstPlot} type="scatter"/>
    </div>
  )
}
export default AnalysisSection