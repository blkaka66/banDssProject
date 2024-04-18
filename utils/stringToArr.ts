
export function stringToArr(apiString:string){
  const dataArray = apiString.split('|').map(item => item.replace(/"/g, '').trim());
  return dataArray;
}

export function stringToArrComma(apiString:string){
  const dataArray = apiString.split(',').map(item => item.replace(/"/g, '').trim());
  return dataArray;
}

export function arrToStringComma(dataArray: string[]) {
  const apiString = dataArray.map(item => `${item}`).join(', ');
  return apiString;
}
