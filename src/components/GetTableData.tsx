export enum SessionTableEnum {
  Grow,
  Probate,
  Unchanged
}

export function GetSessionTableData(inputData: any){
    const output: any = [];

    var grow = 0;
    var probate = 0;
    var unchanged = 0;
    for (let i = 1; i < inputData.length; i++) {
        if(inputData[i-1] < inputData[i]){
          grow += 1;
        } else if(inputData[i-1] > inputData[i]){
              probate += 1;
          } else {
              unchanged += 1;
          }
    }

    output.push(grow);
    output.push(probate);
    output.push(unchanged);

    return output;
}