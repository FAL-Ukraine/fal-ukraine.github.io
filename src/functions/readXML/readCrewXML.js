import countryCodes from "../countryCodes";

const readCrewXML = (crew, xml) => {
    let crewList = xml.getElementsByTagName('CrewList');
    crew.rows = [];
    if (crewList.length > 0) {
        console.log("crewList ", crewList[0].children);
        for (let i = 0; i < crewList[0].children.length; i++) {
            let CreMemberData = crewList[0].children[i];
            if (CreMemberData) {
                let row = {
                    NR: i + 1,
                    Family_name: CreMemberData.children[1].children[1].value,
                    Given_name: CreMemberData.children[1].children[0].value,
                    Gender: CreMemberData.children[2].value,
                    Rank_of_rating: CreMemberData.children[3].children[1].value,
                    Nationality: countryCodes.getCountryWithCodeByCode(CreMemberData.children[7].value),
                    Country_of_birth: countryCodes.getCountryWithCodeByCode(CreMemberData.children[6].value),
                    Place_of_birth: CreMemberData.children[5].value,
                    date_of_birth: CreMemberData.children[4].value,
                    ID_type: CreMemberData.children[0].children[0].value,
                    ID_document_number: CreMemberData.children[0].children[1].value,
                    Issuing_state_of_identity_document: countryCodes.getCountryWithCodeByCode(CreMemberData.children[0].children[2].value),
                    Expiry_date_of_identity_document: CreMemberData.children[0].children[3].value,
                    Visa_Residence_permit_number: CreMemberData.children[8].value
                }
                crew.rows.push(row)
            }

        }
    }
};

export default readCrewXML;