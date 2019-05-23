 raw = require('./data/wto-raw.json');



const nodes = [];
let links = [];

raw.filter(data =>["Worl"])
    .forEach(data=>{
    {
        const entry = nodes.find(country => country.id === data["Reporting Economy Code"]);
        if (!entry) {
            nodes.push({
                country: data["Reporting Economy"],
                id: data["Reporting Economy Code"],
                influence:0
            });
        }
    }

    {
        const entry = nodes.find(country => country.id === data["Partner Economy Code"]);
        if (!entry) {
            nodes.push({
                country: data["Partner Economy"],
                id: data["Partner Economy Code"],
                influence:0
            });
        }
    }

    let link = links.find(link=> link.source === data["Reporting Economy Code"] && link.target === data["Partner Economy Code"]);
    if (link) {
        if (data.year > link.year) {
            link.year = data.year;
            link.weight = data["Value"];
        }
    } else {
        links.push({
            source:data["Reporting Economy Code"],
            target:data["Partner Economy Code"],
            weight:data["Value"],
            year:data["Year"]
        })
    }
});

links = links.filter(link => link.weight > 0);
links.forEach(link => {
    nodes.find(node => node.id === link.source).influence += link.weight;
    nodes.find(node => node.id === link.target).influence += link.weight;
});
// console.log(nodes, links);

console.log(JSON.stringify({nodes,links},null,2));
// NICE