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
  const [response, setResponse] = useState("")
  const [response2, setResponse2] = useState("")
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
        setResponse(await getTimeIntervalJSON(mainCurrency, period));
        setResponse2(await getTimeIntervalJSON(secondCurrency, period));

      setAnalysisSectionVisibilty(true)
    } catch (error) {
      setApiError(true)
    }
  }
  return (
    <div>
      <DataInputSection currency={currency} periods={periods} mainCurrencyCallback={setMainCurrency}
                        secondCurrencyCallback={setSecondCurrency} periodCallback={setPeriod}
                        analysisButtonCallback={analize}/>
      {currencyError ? <div>Wybór dwóch takich samych walut nie dozwolony</div> : null}
      {apiError ? <div>Problem z komunikacją z API</div> : null}
      {analysisSectionVisibilty ? <AnalysisSection response={response} response2={response2} /> : null}
    </div>

  )
}
export default MainPage