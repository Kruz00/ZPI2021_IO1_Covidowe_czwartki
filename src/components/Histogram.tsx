export function histogram(xArray: any[], nBins: any) {
  var max = Math.max(...xArray);
  var min = Math.min(...xArray);
  console.log(min)
  console.log(max)
  var range = max - min + 0.00000001;
  var binRange = range / nBins;
  var bins = new Array(nBins).fill(0);
  var binsLabels: string[] = [];
  for (let i = 0; i < nBins; ++i) {
    binsLabels.push("(" + (min + i * binRange).toFixed(4) + "," + (min + (i + 1) * binRange).toFixed(4) + ")")
  }
  xArray.forEach((x) => bins[Math.floor((x - min) / binRange)]++);
  return {y: bins, x: binsLabels};
}