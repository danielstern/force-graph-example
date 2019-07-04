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
            overlap: 0

        });

        data.nodes.find(node => individual.boss === node.id).influence += individual.influence;

    }

});

let linkId = 0;

for (let key in offices) {
    let office = offices[key];

    office.forEach((individual) => {

        data.nodes.find(node => individual === node.id).zone = key;

        office.forEach((individual2) => {
            if (individual2 !== individual) {
                rawLinks.push({
                    id: `link--${linkId++}`,
                    source: individual,
                    target: individual2,
                    weight: 0.25,
                    type: "COWORKER",
                    overlap: 0

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
                    overlap: 0
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

data.links.forEach((link1) => {

    data.links.forEach((link2) => {
        if (link1.id !== link2.id && link1.type !== link2.type && linkVectorEquality(link1, link2)) {

            if (link1.weight > link2.weight) link1.overlap += 1;
            if (link2.weight > link1.weight) link2.overlap += 1;


            // could be useful?
            // if (!link1.overlap.includes(link2.id)) link1.overlap.push(link2.id);
            // if (!link2.overlap.includes(link1.id)) link2.overlap.push(link1.id);

        }
    })
});

console.log(data);
console.log(JSON.stringify(data, null, 2));

/* Want to add: feature that also outputs to a file.
    Difficult, because this script technically runs in the browser, where FS is not accessible.
 */
// fs.writeFile('./org.json', JSON.stringify(data, null, 2) , 'utf-8');