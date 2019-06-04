const { offices, personnel, committees } = require("./data/org.yaml");

// raw data from the YAML file must be turned into Nodes and links

export const data = {
    nodes: [],
    links: []
};

const { links } = data;

const rawLinks = [];

console.log(offices, personnel);

personnel.forEach((individual) => {
   data.nodes.push({... individual, influence: 1});
});


personnel.forEach((individual) => {
    if (individual.boss) {
        rawLinks.push({
            source: individual.id,
            target: individual.boss,
            weight: 3
        });

        data.nodes.find(node => individual.boss === node.id).influence += 1;
    }

});

for (let key in offices) {
    let office = offices[key];

    office.forEach((individual) => {

        // TODO... assiging nodes zone should probably be in own loop and not insidiously buried in a for loop
        data.nodes.find(node => individual === node.id).zone = key;

        // creating inter-office links is interesting... but technically accurate?
        office.forEach((individual2) => {
            if (individual2 !== individual) {
                rawLinks.push({
                    source: individual,
                    target: individual2,
                    weight: 0.25
                })
            }
        })
    })
}

for (let key in committees) {
    let committee = committees[key];

    committee.forEach((individual) => {
        committee.forEach((individual2) => {
            if (individual2 !== individual) {
                rawLinks.push({
                    source: individual,
                    target: individual2,
                    weight: 0.1
                })
            }
        })
    })
}

rawLinks.forEach((rawLink) => {
    const existing = links.find(link => link.source === rawLink.source && link.target === rawLink.target);
    if (!existing) {
        links.push({...rawLink});
    } else {
        existing.weight += rawLink.weight;
    }
});

console.log("Exported data", data);