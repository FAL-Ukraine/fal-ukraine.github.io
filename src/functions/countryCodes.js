const countryCodes = require("../data/countries")

export function getCountryCodes() {
    return Object.keys(countryCodes);
}

export function getCountriesWithCodes() {
    let countriesWithCodes = [];
    for (let i = 0; i < Object.keys(countryCodes).length; i++) {
        let countryWithCode = Object.values(countryCodes)[i] + ' - ' + Object.keys(countryCodes)[i];
        countriesWithCodes.push(countryWithCode);
    }
    return countriesWithCodes;
}

export function getCountryWithCodeByCode(countryCode) {
    if (countryCode !== '' && countryCode != null) {
        return countryCodes[countryCode] + ' - ' + countryCode;
    }
    return '';

}

// eslint-disable-next-line import/no-anonymous-default-export
export default {getCountryCodes, getCountriesWithCodes, getCountryWithCodeByCode};