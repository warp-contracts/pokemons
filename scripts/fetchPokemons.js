const axios = require('axios');
const fs = require('fs');

axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=905`)
      .then(res => {
        let pokemons = {};
        const results = res.data.results;
        results.forEach((item, index) => {
            pokemons[index+1] = item.name;            
        });
        console.log(pokemons);
        fs.writeFileSync("./pokemons.json", JSON.stringify(pokemons, null, "  "));
      })