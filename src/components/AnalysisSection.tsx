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
import {vecChange} from "./VecChange"

const AnalysisSection = ({
                           response,
                           response2,
                           mainCurrMonth,
                           secondCurrMonth,
                           mainCurrQuarter,
                           secondCurrQuarter
                         }: { response: string; response2: string; mainCurrMonth: string; secondCurrMonth: string; mainCurrQuarter: string; secondCurrQuarter: string; }) => {

  var mainCurrency;
  var mainCurrencyMonth;
  var mainCurrencyQuarter;
  try {
    mainCurrency = JSON.parse(response);
    mainCurrencyMonth = JSON.parse(mainCurrMonth);
    mainCurrencyQuarter = JSON.parse(mainCurrQuarter);
  } catch (error) {
    mainCurrency = null;
    mainCurrencyMonth = null;
    mainCurrencyQuarter = null;
  }

  var secondCurrency;
  var secondCurrencyMonth;
  var secondCurrencyQuarter;
  try {
    secondCurrency = JSON.parse(response2);
    secondCurrencyMonth = JSON.parse(secondCurrMonth);
    secondCurrencyQuarter = JSON.parse(secondCurrQuarter);
  } catch (error) {
    secondCurrency = null;
    secondCurrencyMonth = null;
    secondCurrencyQuarter = null;
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

  const secondPlotTitle = "Rozkład zmian miesięcznych dla waluty " + mainCurrencyCode + "/" + secondCurrencyCode;
  const monthExchangeRate = GetYFromJson(mainCurrencyMonth, secondCurrencyMonth);
  const monthChangeVec = vecChange(monthExchangeRate)

  const thirdPlotTitle = "Rozkład zmian kwartalnych dla waluty " + mainCurrencyCode + "/" + secondCurrencyCode;
  const quarterExchangeRate = GetYFromJson(mainCurrencyQuarter, secondCurrencyQuarter);
  const quarterChangeVec = vecChange(quarterExchangeRate)

  const seassionTableData = GetSessionTableData(yFirstPlot);
  const staticMeasuresTable = GetStaticMeasuresTableData(yFirstPlot);
  return (
    <div>
      <CustomPlot title={firstPlotTitle} x={xFirstPlot} y={yFirstPlot} type="scatter"/>
      <CustomPlot title={secondPlotTitle} x={[]} y={[]} type="bar"/>
      <CustomPlot title={thirdPlotTitle} x={[]} y={[]} type="bar"/>
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