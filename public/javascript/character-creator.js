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


displayRacesOptions();
displayClassesOptions();
retrieveRaceInfo(raceName);
retrieveClassInfo(className);