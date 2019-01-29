export default class Autocomplete {
  constructor(matches = [], resultCursor = 0) {
    this.cityList =  new Map([
      ['Cracow', [50.061, 19.938]],
      ['Chicago', [41.833, -87.872]],
      ['Warsaw', [52.229, 21.012]],
      ['Los Angeles',[34.053,-118.242]],
      ['London',[51.507,-0.127]],
      ['Paris',[48.858,2.341]],
      ['Madrid',[40.416,-3.703]],
      ['Barcelona',[41.394,2.078]],
      ['Dubai',[25.074,55.165]],
      ['Tokyo',[35.669,139.60]],
      ['Kuala Lumpur',[3.138,101.616]],
      ['Sydney',[-33.865,151.209]],
      ['Berlin',[52.506,13.144]],
      ['Munich',[48.155,11.401]],
      ['Shanghai',[31.224,120.916]]

    ]),
      this.matches = matches,
      this.resultCursor = resultCursor;
  }

  getMatches(inputText) {

    const matchList = [];

    for (const el of this.cityList) {

      if (el[0].toLowerCase().substr(0,inputText.length) == inputText.toLowerCase().substr(0,inputText.length))  {
        matchList.push(el[0]);
      }
    }
    console.log(matchList);
    this.matches = matchList.splice(0, 4);
  }

}