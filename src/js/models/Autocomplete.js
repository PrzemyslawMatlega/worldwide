export default class Autocomplete {
  constructor(matches = [], resultCursor = 0) {
    this.cityList =  new Map([
      ['Cracow', [50.061, 19.938]],
      ['Chicago', [41.833, -87.872]],
      ['New York', [40.748, -73.997]],
      ['Warsaw', [52.229, 21.012]],
      ['Los Angeles',[34.053,-118.242]],
      ['London',[51.507,-0.127]],
      ['Paris',[48.858,2.341]],
      ['Madrid',[40.416,-3.703]]
    ]),
      this.matches = matches,
      this.resultCursor = resultCursor;
  }

  getMatches(inputText) {

    const matchList = [];

    for (const el of this.cityList) {

      if (el[0].toLowerCase().indexOf(inputText.toLowerCase()) != -1) {
        matchList.push(el[0]);
      }
    }
    this.matches = matchList.splice(0, 4);
  }

}