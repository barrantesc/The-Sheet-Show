// ability bonuses retrieved from api based on race, and calculating ability scores and modifiers factoring in these bonuses
// const ability_scores = abilityScoresGet(raceInfo.ability_bonuses);

// Retrieve selected race ability bonus info
const retrieveRaceBonus = async function (raceName) {
    const apiUrl = `https://www.dnd5eapi.co/api/races/${raceName.toLowerCase()}`;
    
    const response = await fetch(apiUrl);
    if (response.ok) {
        const raceData = await response.json();
        // saving data to object
        const raceInfo = {
            ability_bonuses: raceData.ability_bonuses,
        }

        return raceInfo;
    }
};

// Uses ability bonuses from DnD api based on character race and creates an object with calculated scores and modifiers for each ability with a bonus. Checks whether all abilities exist in abilities object. If the ability does not exist, it creates an object for it with calculated scores and modifiers. Descriptions of calculations below: 
// Calculate score
// Yields number between 6 - 18, to simulate rolling 4d6, re-rolling any 1s, and dropping lowest number
// Calculate modifier
// takes ability score, subtracts 10, divides by 2, rounds up to nearest integer
const abilityScoresCalc = function (array) {
    const abilitiesObj = {
        STR: {},
        DEX: {},
        CON: {},
        INT: {},
        WIS: {},
        CHA: {}
    };
    for (let i = 0; i < array.length; i++) {
        let abilityName = array[i].ability_score.name;
        let score = array[i].bonus + Math.floor((Math.random() * 12) + 6);
        let modifier = Math.ceil((score - 10) / 2);

        abilitiesObj[abilityName] = { score, modifier }
    }
    // I'm sure there's a better way to do this but I'm all out of brain
    if (!abilitiesObj.STR.score) {
        let score = Math.floor((Math.random() * 12) + 6);
        let modifier = Math.ceil((score - 10) / 2);
        abilitiesObj.STR = { score, modifier }
    }
    if (!abilitiesObj.DEX.score) {
        let score = Math.floor((Math.random() * 12) + 6);
        let modifier = Math.ceil((score - 10) / 2);
        abilitiesObj.DEX = { score, modifier }
    }
    if (!abilitiesObj.CON.score) {
        let score = Math.floor((Math.random() * 12) + 6);
        let modifier = Math.ceil((score - 10) / 2);
        abilitiesObj.CON = { score, modifier }
    }
    if (!abilitiesObj.INT.score) {
        let score = Math.floor((Math.random() * 12) + 6);
        let modifier = Math.ceil((score - 10) / 2);
        abilitiesObj.INT = { score, modifier }
    }
    if (!abilitiesObj.WIS.score) {
        let score = Math.floor((Math.random() * 12) + 6);
        let modifier = Math.ceil((score - 10) / 2);
        abilitiesObj.WIS = { score, modifier }
    }
    if (!abilitiesObj.CHA.score) {
        let score = Math.floor((Math.random() * 12) + 6);
        let modifier = Math.ceil((score - 10) / 2);
        abilitiesObj.CHA = { score, modifier }
    }

    return abilitiesObj;
}

async function createAbilityScores () {
    // grab race name from form, retrieve race bonuses info from DnD api and calculate scores and modifiers, save as object
    // grab character id from url
    const race = document.querySelector('#race').value;
    const race_bonuses = await retrieveRaceBonus(race);
    const abilities = abilityScoresCalc(race_bonuses);
    const hero_id = window.location.toString().split("/")[
        window.location.toString().split("/").length - 1
    ];

    // loop through each of the objects in abilities object and create new Ability out of each
    for (const property in abilities) {

        const response = await fetch('../api/abilities', {
            method: 'POST',
            body: JSON.stringify({
                hero_id,
                name: `${property}`,
                score: `${abilities[property].score}`,
                modifier: `${abilities[property].modifier}`
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        
        if (response.ok) {
            const success = await response.json();
            console.log("yay")
        } else {
        alert(response.statusText);
        }
    }
    document.location.reload();
};

document.querySelector("#calcScores").addEventListener("click", createAbilityScores);