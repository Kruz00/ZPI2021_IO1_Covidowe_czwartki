export async function getJSON(keyCurrency: string, startDate: string, endDate: string){
    console.log('getJSON attributes ',keyCurrency, " ", startDate, " ", endDate);
    try {
        const response = await  fetch('http://api.nbp.pl/api/exchangerates/rates/a/'+keyCurrency+'/'+startDate+'/'+endDate+'/', {
          method: 'GET',
          headers: {
            Accept: 'application/json',
          },
        });

        if (!response.ok) {
              throw new Error(`Error! status: ${response.status}`);
            }
        const result = (await response.json());

        console.log('JSON.stringify ',JSON.stringify(result));

        return JSON.stringify(result)

      } catch (error) {
        if (error instanceof Error) {
          console.log('error message: ', error.message);
          return error.message;
        } else {
          console.log('unexpected error: ', error);
          return 'An unexpected error occurred';
        }
      }
}
