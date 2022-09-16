import React, {useState} from 'react';
import CustomPlot from "./CustomPlot"
import SessionTable from "./SessionTable"
import StaticMeasuresTable from "./StaticMeasuresTable"
import {GetXFromJson, GetYFromJson} from "./GetXYFromJSON"
import {
  GetSessionTableData,
  SessionTableEnum,
  GetStaticMeasuresTableData,
  StaticMeasuresTableEnum
} from "./GetTableData"

const AnalysisSection = ({
                           response,
                           response2,
                           mainCurrMonth,
                           secondCurrMonth,
                           mainCurrQuarter,
                           secondCurrQuarter
                         }: { response: string; response2: string; mainCurrMonth: string; secondCurrMonth: string; mainCurrQuarter: string; secondCurrQuarter: string; }) => {

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

  const seassionTableData = GetSessionTableData(yFirstPlot);
  const staticMeasuresTable = GetStaticMeasuresTableData(yFirstPlot);
  return (
    <div>
      <CustomPlot title={firstPlotTitle} x={xFirstPlot} y={yFirstPlot} type="scatter"/>
      <SessionTable grow={seassionTableData[SessionTableEnum.Grow]}
                    probate={seassionTableData[SessionTableEnum.Probate]}
                    unchanged={seassionTableData[SessionTableEnum.Unchanged]}/>
      <StaticMeasuresTable median={staticMeasuresTable[StaticMeasuresTableEnum.Median]}
                           dominant={staticMeasuresTable[StaticMeasuresTableEnum.Dominant]}
                           standardDeviation={staticMeasuresTable[StaticMeasuresTableEnum.StandardDeviation]}
                           coefficientVariation={staticMeasuresTable[StaticMeasuresTableEnum.CoefficientVariation]}/>
    </div>
  )
}
export default AnalysisSection