import React, {useState} from 'react';
import Dropdown from './Dropdown'

const DataInputSection = () => {

  const currency = ["EUR", "PLN", "USD", "GBP"]
  const periods = ["Tydzień", "2 tygodnie", "Miesiąc", "Kwartał", "Pół roku", "Rok"]
  const [mainCurrency, setMainCurrency] = useState("")
  const [secondCurrency, setSecondCurrency] = useState("")
  const [period, setPeriod] = useState("")
  return (
    <div>
      <Dropdown title = "Waluta główna:" items={currency} callback={setMainCurrency}></Dropdown>
      <Dropdown title = "Waluta dla kursu" items={currency} callback={setSecondCurrency}></Dropdown>
      <Dropdown title = "Przedział czasowy:" items={periods} callback={setPeriod}></Dropdown>
      <button>Analizuj</button>
    </div>
  )
}

export default DataInputSection