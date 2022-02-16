// Retrieve selected race info
const retrieveRaceInfo = async function (raceName) {
    const apiUrl = `https://www.dnd5eapi.co/api/races/${raceName}`;

    const response = await fetch(apiUrl);
    if (response.ok) {
        const raceData = await response.json();
        // saving data to object
        const raceInfo = {
            ability_bonuses : raceData.ability_bonuses,
            alignment : raceData.alignment,
            languages : raceData.languages
        }

        return raceInfo;
    } else {
        console.log(err);
    }
};

// Retrieve selected class info
const retrieveClassInfo = async function (className) {
    const apiUrl = `https://www.dnd5eapi.co/api/classes/${className}`;

    const response = await fetch(apiUrl);
    if (response.ok) {
        const classData = await response.json();
        // saving to object
        const classInfo = {
            choice_number : classData.proficiency_choices[0].choose,
            prof_array : classData.proficiency_choices[0].from
        }

        return classInfo;
    }
}

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
let score = 13;

const modifierCalc = function (score) {
    const modifier = Math.ceil((score - 10) / 2);
    console.log(modifier);
    return modifier;
};

// Calculate Proficiency Bonus
    // determined by player level (starting from level 1, the bonus increases by 1every four levels)
const profBonusCalc = function (playerLevel) {
    let profBonus = Math.ceil(playerLevel/4)+1;
    return profBonus;
};

// turn an array of languages into a string for storage in model
    // sequelize will only allow storage as array if using PostgresSQL)
    // takes array of objects, retrieves name property from each and pushes it to a new array
    // joins array items into a string
const stringFromArray = function (array) {
    let arr = [];
    for (let i = 0; i < array.length; i++) {
        arr.push(array[i].name);
    }
    return arr.join(" ");
}

// choose x amount of random element from array - for choosing allowed # of proficiencies, and turning to string
    // takes array of objects, retrieves index property from each and pushes it to a new array
    // selects a random element from array x number of times, pushes each to a different new array
    // joins the randomly selected elements into a string
    // -- still need to figure out how to remove selected element from arr after pushing to newArr to avoid duplicates, but code breaks with obvious the splice() solution
const randomFromArray = function (array, n) {
    let arr = [];
    let newArr = [];
    for (let i = 0; i < array.length; i++) {
        arr.push(array[i].index);
    }
    for (let i = 0; i < n; i++) {
        let idx = Math.floor(Math.random() * (array.length));
        newArr.push(arr[idx]);
        // arr.splice(idx);
    }
    // console.log(arr);
    // console.log(newArr);
    return newArr.join(" ");
}

// abilityScoresCalc();
// modifierCalc(score);

// take user input from character creator form to turn into object to generate a character and save to database
async function newCharFormHandler(event) {
    event.preventDefault();

    // info retrieved directly from form, or from calculations from form input values
    const name = document.querySelector('#char-name').value;
    const race = document.querySelector('#char-race').value;
    const char_class = document.querySelector('#char-class').value;
    const gender = document.querySelector('#char-gender').value;
    const age = document.querySelector('#char-age').valueAsNumber;
    const player_level = document.querySelector('#char-level').valueAsNumber;
    const proficiency_bonus = profBonusCalc(document.querySelector('#char-level').valueAsNumber);

    // info retrieved from api/races based on user input
    const raceInfo = await retrieveRaceInfo(document.querySelector('#char-race').value);
    const alignment = raceInfo.alignment;
    const langString = stringFromArray(raceInfo.languages);

    // info retrieved from api/classes based on user input
    const classInfo = await retrieveClassInfo(document.querySelector('#char-class').value);
    const profString = randomFromArray(classInfo.prof_array, classInfo.choice_number);

    // const title = document.querySelector('input[name="post-title"]').value;
    // const post_url = document.querySelector('input[name="post-url"]').value;

    // const response = await fetch('api/posts', {
    //     method: 'POST', 
    //     body: JSON.stringify({
    //         title,
    //         post_url
    //     }),
    //     headers: {
    //         'Content-Type': 'application/json'
    //     }
    // });

    // if (response.ok) {
    //     document.location.replace('/dashboard');
    // } else {
    //     alert(response.statusText);
    // }
};

document.querySelector('#character-form').addEventListener('submit', newCharFormHandler);


