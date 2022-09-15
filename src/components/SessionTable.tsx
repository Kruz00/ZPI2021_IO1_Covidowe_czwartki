import React from 'react';

const SessionTable = ({grow, probate, unchanged}
                                : { grow: number, probate: number, unchanged: number}) => {

  return (
    <div>
      <table >
        <tbody>
         <tr>
          <td>Ilość sesji wzrostowy:</td>
          <td id="leftAlign">{grow}</td>
         </tr>
         <tr>
          <td>Ilość sesji spadkowych:</td>
          <td id="leftAlign">{probate}</td>
         </tr>
         <tr>
          <td>Ilość sesji bez zmian:</td>
          <td id="leftAlign">{unchanged}</td>
         </tr>
        </tbody>
      </table>
    </div>
  )
}

export default SessionTable