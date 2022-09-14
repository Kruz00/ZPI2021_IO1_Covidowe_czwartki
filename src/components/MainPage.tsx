import React, {useState} from 'react';
import DataInputSection from './DataInputSection'
import AnalysisSection from './AnalysisSection'
import {getTimeIntervalJSON} from '../API NBP/ImplementApiNBP'

const MainPage = () => {
  const currency = ["EUR", "PLN", "USD", "GBP"]
  const periods = ["Tydzień", "2 tygodnie", "Miesiąc", "Kwartał", "Pół roku", "Rok"]
  const [mainCurrency, setMainCurrency] = useState("")
  const [secondCurrency, setSecondCurrency] = useState("")
  const [period, setPeriod] = useState("")
  const [currencyError, setCurrencyError] = useState(false)
  const [apiError, setApiError] = useState(false)
  const [analysisSectionVisibilty, setAnalysisSectionVisibilty] = useState(false)
  const analize = async () => {
    if (mainCurrency === "" || secondCurrency === "") {
      return;
    }
    if (mainCurrency === secondCurrency) {
      setCurrencyError(true)
      return
    } else {
      setCurrencyError(false)
    }
    try {
      let response = await getTimeIntervalJSON(mainCurrency, 0)

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