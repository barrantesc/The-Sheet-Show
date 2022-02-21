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

// Creates an array of ability objects, loops through this array and adds base scores and modifiers to each. Then loops through array of ability bonuses (based on character race) and adds the bonus to the corresponding ability. Calculations for scores and modifiers below: 
    // Calculate score
        // Yields number between 6 - 18, to simulate rolling 4d6, re-rolling any 1s, and dropping lowest number
    // Calculate modifier
        // takes ability score, subtracts 10, divides by 2, rounds up to nearest integer
const abilityScoresCalc = function (array) {
    const abilitiesArr = [  
        {name: 'STR'},
        {name: 'DEX'},
        {name: 'CON'},
        {name: 'INT'},
        {name: 'WIS'},
        {name: 'CHA'}
    ];

    for (let i = 0; i < abilitiesArr.length; i++) {
        abilitiesArr[i].score = Math.floor((Math.random() * 12) + 6);
        abilitiesArr[i].modifier = Math.ceil((abilitiesArr[i].score - 10) / 2);
    }

    for (let i = 0; i < array.length; i++) {
        let abilityName = array[i].ability_score.name
        let abilityScore = array[i].bonus
        for (let j = 0; j < abilitiesArr.length; j++) {
            if (abilityName === abilitiesArr[j].name) {
                abilitiesArr[j].score += abilityScore;
                abilitiesArr[j].modifier = Math.ceil((abilitiesArr[i].score - 10) / 2);
            }
        }
    }

    return abilitiesArr;
}

// send post requests
async function postAbilityScores (heroID, name, score, modifier) {
    const response = await fetch('../api/abilities', {
        method: 'POST',
        body: JSON.stringify({
            hero_id: heroID,
            name: name,
            score: score,
            modifier: modifier
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if (response.ok) {
        console.log("yay")
    document.location.reload();
    } else {
    alert(response.statusText);
    }
}

async function createAbilityScores () {
    // grab race name from form, retrieve race bonuses info from DnD api and calculate scores and modifiers, save as object
    // grab character id from url
    const race = document.querySelector('#race').value;
    const race_bonuses = await retrieveRaceBonus(race);
    const abilities = abilityScoresCalc(race_bonuses.ability_bonuses);
    const hero_id = window.location.toString().split("/")[
        window.location.toString().split("/").length - 1
    ];

    // loop through each of the objects in abilities array and send info to postAbilityScores to send post request
    for (let i = 0; i < abilities.length; i++) {
        const name = abilities[i].name;
        const score = abilities[i].score;
        const modifier = abilities[i].modifier;
        postAbilityScores(hero_id, name, score, modifier);
    }
};

document.querySelector("#calcScores").addEventListener("click", createAbilityScores);