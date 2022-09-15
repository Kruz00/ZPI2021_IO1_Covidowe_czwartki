export function GetXFromJson(json: any){
    const x: any = [];
    json.rates.forEach((e: any) => {
      x.push(e["effectiveDate"]);
    });
    return x;
}

function GetYFromJsonNotFinal(json: any){
    const y: any = [];
    json.rates.forEach((e: any) => {
      y.push(e["mid"]);
    });
    return y;
}

export function GetYFromJson(mainJson: JSON, secondJson: JSON){
    if(mainJson && secondJson){
        const yMain = GetYFromJsonNotFinal(mainJson);
        const ySecond = GetYFromJsonNotFinal(secondJson);

        const y: any = [];
        for (let i = 0; i < yMain.length; i++) {
            y.push(yMain[i] / ySecond[i]);
        }
        return y;
    }

    if(!mainJson){
        const ySecond = GetYFromJsonNotFinal(secondJson);
        const y: any = [];
        for (let i = 0; i < ySecond.length; i++) {
            y.push(1 / ySecond[i]);
        }
        return y;
    }

    if(!secondJson){
        return GetYFromJsonNotFinal(mainJson);
    }
}

