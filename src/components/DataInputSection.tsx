import React, {useState} from 'react';
import DropdownList from "react-widgets/DropdownList";
import "react-widgets/styles.css";

const DataInputSection = () => {

  const currency = ["EUR", "PLN", "USD", "GBP"]
  const periods = ["Tydzień", "2 tygodnie", "Miesiąc", "Kwartał", "Pół roku", "Rok"]
  const [mainCurrency, setMainCurrency] = useState("")
  const [secondCurrency, setSecondCurrency] = useState("")
  const [period, setPeriod] = useState("")
  return (
    <div>
      <div> Waluta główna:</div>
      <DropdownList onChange={value => setMainCurrency(value)} data={currency}/>
      <div> Waluta dla kursu:</div>
      <DropdownList onChange={value => setSecondCurrency(value)} data={currency}/>
      <div> Przedział czasowy:</div>
      <DropdownList onChange={value => setPeriod(value)} data={periods}/>
      <button>Analizuj</button>
    </div>
  )
}

export default DataInputSection