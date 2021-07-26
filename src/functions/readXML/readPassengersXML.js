import countryCodes from "../countryCodes";

const readPassengersXML = (passengers, xml) => {
    let passengerList = xml.getElementsByTagName('PassengerList');
    passengers.rows = [];
    if (passengerList.length > 0) {
        for (let i = 0; i < passengerList[0].children.length; i++) {
            let PassengerData = passengerList[0].children[i]
            if (PassengerData) {
                let Port_of_embarkation_formatted = '';
                if (PassengerData.children[7]) {
                    Port_of_embarkation_formatted = PassengerData.children[7].children[2].value + ' - ' + PassengerData.children[7].children[1].value + ' - ' + PassengerData.children[7].children[0].value;
                }
                let Port_of_disembarkation = '';
                if (PassengerData.children[8]) {
                    Port_of_disembarkation = PassengerData.children[8].children[2].value + ' - ' + PassengerData.children[8].children[1].value + ' - ' + PassengerData.children[8].children[0].value;
                }
                console.log("PassengerData ", PassengerData)
                let row = {
                    NR: i + 1,
                    Family_name: PassengerData.children[1].children[1].value,
                    Given_name: PassengerData.children[1].children[0].value,
                    Gender: PassengerData.children[2].value,
                    Nationality: countryCodes.getCountryWithCodeByCode(PassengerData.children[6].value),
                    Country_of_birth: countryCodes.getCountryWithCodeByCode(PassengerData.children[5].value),
                    Place_of_birth: PassengerData.children[4].value,
                    date_of_birth: PassengerData.children[3].value,
                    ID_type: PassengerData.children[0].children[0].value,
                    ID_document_number: PassengerData.children[0].children[1].value,
                    Issuing_state_of_identity_document: PassengerData.children[0].children[2].value,
                    Expiry_date_of_identity_document: PassengerData.children[0].children[3].value,
                    Visa_Residence_permit_number: PassengerData.children[10].value,
                    Port_of_embarkation: Port_of_embarkation_formatted,
                    Port_of_disembarkation: Port_of_disembarkation,
                    Transit: PassengerData.children[9].value
                }
                passengers.rows.push(row)
            }

        }
    }
};

export default readPassengersXML;