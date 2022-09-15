export enum SessionTableEnum {
  Grow,
  Probate,
  Unchanged
}

export enum StaticMeasuresTableEnum {
  Median,
  Dominant,
  StandardDeviation,
  CoefficientVariation
}

export function GetSessionTableData(inputData: any){
    const output: any = [];

    var grow = 0;
    var probate = 0;
    var unchanged = 0;

    var roundValue1 = Math.round((inputData[0] + Number.EPSILON) * 1000) / 1000;
    var roundValue2;
    for (let i = 1; i < inputData.length; i++) {
        roundValue2 = Math.round((inputData[i] + Number.EPSILON) * 1000) / 1000;

        if(roundValue1 < roundValue2){
          grow += 1;
        } else if(roundValue1 > roundValue2){
              probate += 1;
          } else {
              unchanged += 1;
          }
        roundValue1 = roundValue2;
    }

    output.push(grow);
    output.push(probate);
    output.push(unchanged);

    return output;
}

function getMedian(inputData: any){
    var sortedArray: number[] = inputData.sort();
    if((sortedArray.length+1) % 2 === 1) {
        return sortedArray[sortedArray.length/2];
    } else {
        return sortedArray[(sortedArray.length+1)/2];
    }
}

function getDominant(inputData: any){

    var roundValue;
    let myMap = new Map<number, number>();
    for (let i = 0; i < inputData.length; i++) {
        roundValue=Math.round((inputData[i] + Number.EPSILON) * 1000) / 1000;
        if(!myMap.has(roundValue)){
            myMap.set(roundValue, 0);
        } else {
            myMap.set(roundValue,myMap.get(roundValue) as number + 1);
        }
    }

    var maxValue=0;
    myMap.forEach((value : number, key : number) => {
        if(maxValue < value)
            maxValue = value;
    });

    var keyValue;
    myMap.forEach((value : number, key : number) => {
        if(maxValue === value)
            keyValue = key;
    });
    return keyValue;
}

function getStandardDeviation(inputData: any){

    var sum=0;
    for (let i = 0; i < inputData.length; i++) {
        sum+=inputData[i];
    }

    var mean = sum/inputData.length;
    sum=0;
    for (let i = 0; i < inputData.length; i++) {
            sum+=Math.pow((inputData[i]-mean), 2);
    }

    return Math.sqrt(sum/inputData.length);
}

function getCoefficientVariation(inputData: any, standardDeviation: number){

    var sum=0;
    for (let i = 0; i < inputData.length; i++) {
        sum+=inputData[i];
    }

    var mean = sum/inputData.length;

    if(mean === 0)
        return 0;
    return standardDeviation/mean;
}


export function GetStaticMeasuresTableData(inputData: any){
    const output: any = [];

    output.push(getMedian(inputData))
    output.push(getDominant(inputData));
    output.push(getStandardDeviation(inputData));
    output.push(getCoefficientVariation(inputData, output[StaticMeasuresTableEnum.StandardDeviation]));

    return output;
}