/*
    Contains a utility that converts our data from easy-to-read YAML to a JavaScript object
*/

const { offices, personnel, committees } = require("./org.yaml");

export const data = {
    nodes: [],
    links: []
};

const rawLinks = [];

personnel.forEach((individual, index) => {

   data.nodes.push({... individual, influence: 1, sorting: index});

});

data.nodes.forEach((individual) => {

    if (individual.boss) {

        rawLinks.push({

            source: individual.id,
            target: individual.boss,
            weight: 3,
            type: "SUPERVISORY",
            overlap: []

        });

        data.nodes.find(node => individual.boss === node.id).influence += individual.influence;

    }

});

for (let key in offices) {
    let office = offices[key];

    office.forEach((individual) => {

        data.nodes.find(node => individual === node.id).zone = key;

        office.forEach((individual2) => {
            if (individual2 !== individual) {
                rawLinks.push({
                    source: individual,
                    target: individual2,
                    weight: 0.25,
                    type: "COWORKER",
                    overlap: []

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
                    weight: 0.1,
                    type: "COMMITTEE",
                    overlap: []
                })
            }
        })
    })
}

const linkVectorEquality = (link1, link2) => (link1.source === link2.source && link1.target === link2.target) || (link1.source === link2.target && link1.target === link2.source);

rawLinks.forEach((rawLink) => {

    const existing = data.links.find(link => {

        if (link.type === rawLink.type) {

            if (linkVectorEquality(link, rawLink)) {
                return true;
            }

        }

    });
    if (!existing) {

        data.links.push({...rawLink});

    } else {

        existing.weight += rawLink.weight;

    }

});

data.links.forEach(link1 => {
    data.links.forEach(link2 => {
        if (link1 !== link2 && link1.type !== link2.type && linkVectorEquality(link1, link2)) {

            link1.overlap.push(link2);
            link2.overlap.push(link1);

            }
    })
});

console.info(data);