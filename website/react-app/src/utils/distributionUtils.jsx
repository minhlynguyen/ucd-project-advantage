
export const getGenderPercString = (arr, gender) => {
    let start_index;
    let end_index;
    if (gender === "female") {
        start_index = 0;
        end_index = 10;
    } else {
        start_index = 10;
        end_index = 19;
    }
    const total_value = (arr.slice(start_index, end_index).reduce((total, num) => total + num, 0) / 100).toFixed(4);
    const perc_string = parseFloat(total_value) * 100;
    return `${perc_string}%`;// e.g. '50.45%'
};

export const getGenderPercFloat = (arr, gender) => {
    const female_perc = parseFloat((arr.slice(0, 10).reduce((total, num) => total + num, 0) / 100).toFixed(4));
    const male_perc = 1 - female_perc;
    return gender === 'female' ? female_perc : male_perc// e.g. '50%'
};

export const getGenderPercList = (arr) => {

    
    const female_perc = arr.slice(0, 10).reduce((total, num) => total + num, 0) / 100;
    const male_perc = 1 - female_perc;
  
    let partial_female = arr.slice(0, 9).map(item => (item / 100 / female_perc));

    let last_female = 1 - partial_female.reduce((total, num) => total + num, 0);

    partial_female.push(last_female);
    let femaleList = partial_female.map(item => parseFloat(item.toFixed(2)));

    let partial_male = arr.slice(10, 19).map(item => (item / 100 / male_perc));

    let last_male = 1 - partial_male.reduce((total, num) => total + num, 0);

    partial_male.push(last_male);
    let maleList = partial_male.map(item => parseFloat(item.toFixed(2)));


    return [femaleList, maleList];

};