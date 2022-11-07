const axios = require('axios');
const { ConsoleLogger } = require('warp-contracts');

async function getTxs() {
for(page = 12; page<=12; page++){    
let results = await axios.get("https://d1o5nlqr4okus2.cloudfront.net/gateway/interactions?contractId=JnPMxlTvHtdMsEHgTJrhYvoBL33f_-FfNPt6a9qhaF4&page="+page);

//console.log(results.data);

results.data.interactions.forEach(i => {
    if (i.interaction.id === "svGMLSxsatzkUupVTRlJZuMSHlDTiGel6wugA5tYE_8") {
        console.log(i.interaction);
    }
    i.interaction.tags.forEach(tag => {
        
        // let fee = i.interaction.fee.winston;
        // let parsed = Math.floor(parseInt(fee) / 1e6);
        // if (isNaN(parsed+1)) {
        //     console.log("Found: " + i.interaction.id);
        // }
        if (tag.name == "Input") {
            let funcName = JSON.parse(tag.value).function;
            if (funcName != "mint") {
                console.log(funcName);
                console.log(i.interaction.id);
            }
        }
    });
});
}
}

getTxs();
