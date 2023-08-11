// this file is to calculate population distribution into ideal format

// get female and male percentage from age-gender group percentages list
// get string like '40%'
export const getGenderPercString = (arr, gender) => {
    const total_value_female = arr.slice(0, 10).reduce((total, num) => total + num, 0) / 100;
    const total_value_male = 1 - total_value_female; //to ensure the sum is 1
    if (gender === 'female') {
        return `${(total_value_female * 100).toFixed(2)}%`;
    }
    return `${(total_value_male * 100).toFixed(2)}%`;// e.g. '40%'
};

// get female and male percentage from age-gender group percentages list
// get float number like 0.5678
export const getGenderPercFloat = (arr, gender) => {
    const female_perc = parseFloat((arr.slice(0, 10).reduce((total, num) => total + num, 0) / 100).toFixed(4));
    const male_perc = parseFloat((1 - female_perc).toFixed(4)); //to ensure the sum is 1
    return gender === 'female' ? female_perc : male_perc// e.g. 0.5678
};

// get age distribution list for females and males
export const getGenderPercList = (arr) => {   
    const female_perc = arr.slice(0, 10).reduce((total, num) => total + num, 0) / 100;
    const male_perc = 1 - female_perc;
    let partial_female = arr.slice(0, 9).map(item => (item / 100 / female_perc));
    let last_female = 1 - partial_female.reduce((total, num) => total + num, 0);//to ensure the sum is 1
    partial_female.push(last_female);
    let femaleList = partial_female.map(item => parseFloat(item.toFixed(2)));
    let partial_male = arr.slice(10, 19).map(item => (item / 100 / male_perc));
    let last_male = 1 - partial_male.reduce((total, num) => total + num, 0);//to ensure the sum is 1
    partial_male.push(last_male);
    let maleList = partial_male.map(item => parseFloat(item.toFixed(2)));

    return [femaleList, maleList];// e.g. [[0.12, 0.21, ...],[0.12, 0.21, ...]]
};

// convert raw group names to readable strings
export const  convertToReadableForGroup = (str) => {
    const parts = str.split('_');
    const gender = parts[0];
    const readableGender = gender.charAt(0).toUpperCase() + gender.slice(1);
    
    let agePart = parts.slice(1).join('_');

    if (agePart === "under_5") {
        return `0~4 ${readableGender}`;
    }
    else if (agePart === "85") {
        return `85+ ${readableGender}`;
    }
    else {
        const [start, end] = agePart.split('_');
        
        // If end is undefined, it means there is only one age provided
        if (end === undefined) {
            return `${start}+ ${readableGender}`;
        }

        return `${start}~${end} ${readableGender}`;
    }
};
