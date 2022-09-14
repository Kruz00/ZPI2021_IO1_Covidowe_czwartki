import React, {useState} from 'react';
import DataInputSection from './DataInputSection'
import AnalysisSection from './AnalysisSection'
import {getTimeIntervalJSON, TimeInterval} from '../API NBP/ImplementApiNBP'


const MainPage = () => {
  const currency = {"EUR": "EUR", "PLN": "PLN", "USD": "USD", "GBP": "GBP"}
  const periods = {
    "Tydzień": TimeInterval.Week,
    "2 tygodnie": TimeInterval.TwoWeek,
    "Miesiąc": TimeInterval.Month,
    "Kwartał": TimeInterval.Quarter,
    "Pół roku": TimeInterval.HalfYear,
    "Rok": TimeInterval.Year
  }
  const [mainCurrency, setMainCurrency] = useState("")
  const [secondCurrency, setSecondCurrency] = useState("")
  const [period, setPeriod] = useState(TimeInterval.Default)
  const [currencyError, setCurrencyError] = useState(false)
  const [apiError, setApiError] = useState(false)
  const [analysisSectionVisibilty, setAnalysisSectionVisibilty] = useState(false)
  const analize = async () => {
    if (mainCurrency === "" || secondCurrency === "" || period == TimeInterval.Default) {
      return;
    }
    if (mainCurrency === secondCurrency) {
      setCurrencyError(true)
      return
    } else {
      setCurrencyError(false)
    }
    try {
      const response = await getTimeIntervalJSON(mainCurrency, period)
      const response2 = await getTimeIntervalJSON(secondCurrency, period)
    } catch (error) {
      setApiError(true)
    }

    setAnalysisSectionVisibilty(true)
  }
  return (
    <div>
      <DataInputSection currency={currency} periods={periods} mainCurrencyCallback={setMainCurrency}
                        secondCurrencyCallback={setSecondCurrency} periodCallback={setPeriod}
                        analysisButtonCallback={analize}/>
      {currencyError ? <div>Wybór dwóch takich samych walut nie dozwolony</div> : null}
      {apiError ? <div>Problem z komunikacją z API</div> : null}
      {analysisSectionVisibilty ? <AnalysisSection/> : null}
    </div>

  )
}
export default MainPage