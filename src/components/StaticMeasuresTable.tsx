import React from 'react';

const StaticMesuresTable = ({median, dominant, standardDeviation, coefficientVariation}
                                : { median: number, dominant: number, standardDeviation: number, coefficientVariation: number}) => {

  return (
    <div>
      <table>
        <tbody>
         <tr>
          <td>Mediana</td>
          <td>{median}</td>
         </tr>
         <tr>
          <td>Dominanta</td>
          <td>{dominant}</td>
         </tr>
         <tr>
          <td>Odchylenie standardowe</td>
          <td>{standardDeviation}</td>
         </tr>
         <tr>
          <td>Współczynnik zmienności</td>
          <td>{coefficientVariation}</td>
         </tr>
        </tbody>
      </table>
    </div>
  )
}

export default StaticMesuresTable