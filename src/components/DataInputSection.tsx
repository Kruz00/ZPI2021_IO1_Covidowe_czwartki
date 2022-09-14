import React, {useState} from 'react';
import Dropdown from './Dropdown'

const DataInputSection = ({
                            currency,
                            periods,
                            mainCurrencyCallback,
                            secondCurrencyCallback,
                            periodCallback,
                            analysisButtonCallback
                          }
                            : {
  currency: { [k: string]: any };
  periods: { [k: string]: any };
  mainCurrencyCallback: Function;
  secondCurrencyCallback: Function;
  periodCallback: Function;
  analysisButtonCallback: Function
}) => {

  return (
    <div>
      <Dropdown title="Waluta główna:" items={currency} callback={mainCurrencyCallback}></Dropdown>
      <Dropdown title="Waluta dla kursu" items={currency} callback={secondCurrencyCallback}></Dropdown>
      <Dropdown title="Przedział czasowy:" items={periods} callback={periodCallback}></Dropdown>
      <button onClick={() => analysisButtonCallback()}>Analizuj</button>
    </div>
  )
}

export default DataInputSection