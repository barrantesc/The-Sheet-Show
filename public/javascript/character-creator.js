// fetch all race names to display as options - might not need if hardcoded into form
const displayRacesOptions = async function () {
    const apiUrl = 'https://www.dnd5eapi.co/api/races';

    const response = await fetch(apiUrl);
    if (response.ok) {
        const raceData = await response.json()
        for (let i = 0; i < raceData.results.length; i++) {
            console.log(raceData.results[i].name);
        }
    } else {
        console.log(err);
    }
};

// fetch all class names to display as options - might not need if hardcoded into form
const displayClassesOptions = async function () {
    const apiUrl = 'https://www.dnd5eapi.co/api/classes';

    const response = await fetch(apiUrl);
    if (response.ok) {
        const classData = await response.json();
        for (let i = 0; i < classData.results.length; i++) {
            console.log(classData.results[i].name);
        }
    } else {
        console.log(err);
    }
};

// temporary variable to test fetch race info 
let raceName = 'human';

const retrieveRaceInfo = async function (raceName) {
    const apiUrl = `https://www.dnd5eapi.co/api/races/${raceName}`;

    const response = await fetch(apiUrl);
    if (response.ok) {
        const raceData = await response.json();
        // saving data to variables
        const abilityBonuses = raceData.ability_bonuses;
        const alignment = raceData.alignment;
        const sizeDesc = raceData.size_description;
        const languages = raceData.languages;

        console.log(abilityBonuses, alignment, sizeDesc, languages);
    } else {
        console.log(err);
    }
};

// temporary variable to test fetch class info
let className = 'sorcerer';

const retrieveClassInfo = async function (className) {
    const apiUrl = `https://www.dnd5eapi.co/api/classes/${className}`;

    const response = await fetch(apiUrl);
    if (response.ok) {
        const classData = await response.json();
        // saving to variables
        const profChoicesAllowed = classData.proficiency_choices[0].choose;
        const profArray = classData.proficiency_choices[0].from;
        console.log(profChoicesAllowed, profArray);
    }
}

<<<<<<< Updated upstream

displayRacesOptions();
displayClassesOptions();
retrieveRaceInfo(raceName);
retrieveClassInfo(className);
=======
// Calculate ability scores
    // Yields number between 6 - 18, to simulate rolling 4d6, re-rolling any 1s, and dropping lowest number
const abilityScoresCalc = function () {
    const score = Math.floor((Math.random() * 12) + 6);
    console.log(score);
    return score;
};

// Calculate modifiers
    // takes ability score, subtracts 10, divides by 2, rounds up to nearest integer

    // temporary variable to test modifier calculator
let score = 15;

const modifierCalc = function (score) {
    const modifier = Math.ceil((score - 10) / 2);
    console.log(modifier);
    return modifier;
};

// Calculate Proficiency Bonus
    // determined by player level (starting from level 1, the bonus increases by 1every four levels)

    // temporary variable to test proficiency bonus calculator
let playerLevel = 13;

const profBonusCalc = function (playerLevel) {
    let profBonus = Math.ceil(playerLevel/4)+1;
    console.log(profBonus);
    return profBonus;
};


// displayRacesOptions();
// displayClassesOptions();
// retrieveRaceInfo(raceName);
// retrieveClassInfo(className);
// abilityScoresCalc();
// modifierCalc(score);
profBonusCalc(playerLevel);
>>>>>>> Stashed changes
