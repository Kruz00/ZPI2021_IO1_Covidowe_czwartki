import React, {useState} from 'react';
import CustomPlot from "./CustomPlot"
import {GetXFromJson, GetYFromJson} from "./GetXYFromJSON"

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
  const mainCurrencyFirstPlot: any = [];
  const secondCurrencyFirstPlot: any = [];
  const mainCurrencyCode = mainCurrency == null ? "PLN" : mainCurrency['code']
  const secondCurrencyCode = secondCurrency == null ? "PLN" : secondCurrency['code']
  
  if (!mainCurrency && !secondCurrency) {
    return (
      <div>
      </div>
    )
  }

  const firstPlotTitle = "Kurs waluty " + mainCurrencyCode + "/" + secondCurrencyCode;
  const xFirstPlot = mainCurrency == null ? GetXFromJson(secondCurrency) : GetXFromJson(mainCurrency);
  const yFirstPlot: any = GetYFromJson(mainCurrency, secondCurrency);

  return (
    <div>
      <CustomPlot title={firstPlotTitle} x={xFirstPlot} y={yFirstPlot} type="scatter"/>
    </div>
  )
}
export default AnalysisSection