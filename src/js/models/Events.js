export default class Events {
    constructor(location) {
        this.loc = location;
    }

    async eventSearch(category) {
        try {

            let phq = require('predicthq');
            let client = new phq.Client({
                access_token: "r0LENp7aLSwFnzB1hASYm28n6qiB1l"
            })
            
            let result = await client.events.search({
                'within': `10km@${this.loc[0]},${this.loc[1]}`,
                'category': `${category}`
            })
          
            this.events = result.result.results;
           
       
        } catch(err) {}


    }
}