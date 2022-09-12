enum TimeInterval {
  Week,
  TwoWeek,
  Month,
  Quarter,
  HalfYear,
  Year
}

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

function padTo2Digits(num: number) {
  return num.toString().padStart(2, '0');
}

function formatDate(date: Date) {
  return (
    [
      date.getFullYear(),
      padTo2Digits(date.getMonth() + 1),
      padTo2Digits(date.getDate()),
    ].join('-')
  );
}

export async function getTimeIntervalJSON(keyCurrency: string, timeInterval: TimeInterval){
    console.log('getTimeIntervalJSON attributes ',keyCurrency, " ", timeInterval);

    const now = new Date();
    const pastDate = new Date();
    console.log(formatDate(now), " ", formatDate(pastDate) )
    switch (timeInterval){
        case TimeInterval.Week:
            pastDate.setDate(pastDate.getDate()-7);
            return getJSON(keyCurrency, formatDate(pastDate), formatDate(now));

        case TimeInterval.TwoWeek:
            pastDate.setDate(pastDate.getDate()-14);
            return getJSON(keyCurrency, formatDate(pastDate), formatDate(now));

        case TimeInterval.Month:
            pastDate.setMonth(pastDate.getMonth()-1);
            return getJSON(keyCurrency, formatDate(pastDate), formatDate(now));

        case TimeInterval.Quarter:
            pastDate.setMonth(pastDate.getMonth()-3);
            return getJSON(keyCurrency, formatDate(pastDate), formatDate(now));

        case TimeInterval.HalfYear:
            pastDate.setMonth(pastDate.getMonth()-6);
            return getJSON(keyCurrency, formatDate(pastDate), formatDate(now));

        case TimeInterval.Year:
            pastDate.setFullYear(pastDate.getFullYear()-1);
            return getJSON(keyCurrency, formatDate(pastDate), formatDate(now));

        default:
            throw new Error('Non-existent enum in switch');
    }
}