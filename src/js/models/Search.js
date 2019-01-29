export default class Search {
    constructor(city) {
        this.city = city;
    }
    async searchImgCity(){
        try {
            let result = await fetch( `https://pixabay.com/api/?key=11033911-95c042fed8aa64778fe769748&q=${this.city}`)
            result = await result.json();
            this.photos = result.hits.map(e => e.webformatURL).splice(9, 9)

        } catch (error) {
            console.log(error);
        }
    }

    async searchWiki(){
        try{
            let result = await fetch(`https://en.wikipedia.org/w/api.php?format=json&origin=*&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=${this.city}`);
            result = await result.json();
            
            let wiki = result.query.pages;
            let searchWiki = Object.keys(wiki);
            this.wiki = wiki[`${searchWiki[0]}`].extract
        }

        catch(error){
            console.log(error);
        }
    }
}