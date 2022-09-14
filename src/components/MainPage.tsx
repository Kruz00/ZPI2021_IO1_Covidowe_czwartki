import React, {useState} from 'react';
import DataInputSection from './DataInputSection'
import AnalysisSection from './AnalysisSection'

const MainPage = () => {
  const currency = ["EUR", "PLN", "USD", "GBP"]
  const periods = ["Tydzień", "2 tygodnie", "Miesiąc", "Kwartał", "Pół roku", "Rok"]
  const [mainCurrency, setMainCurrency] = useState("")
  const [secondCurrency, setSecondCurrency] = useState("")
  const [period, setPeriod] = useState("")
  const [currencyError, setCurrencyError] = useState(false)
  const analize = () => {
    if (mainCurrency === "" || secondCurrency === "") {
      return;
    }
    if (mainCurrency === secondCurrency) {
      setCurrencyError(true)
      return
    } else {
      setCurrencyError(false)
    }

  }
  return (
    <div>
      <DataInputSection currency={currency} periods={periods} mainCurrencyCallback={setMainCurrency}
                        secondCurrencyCallback={setSecondCurrency} periodCallback={setPeriod} analysisButtonCallback={analize}/>
      {currencyError ? <div>Wybór dwóch takich samych walut nie dozwolony</div> : null}
      <AnalysisSection/>
    </div>

  )
}
export default MainPage