import listOfPortsConst from "../../config/JSON/listOfPorts";

export const checkRequiredPassengers = (errors, data) => {
    errors.Passengers = {};

    data.rows.forEach( el => {
        if (!el.Family_name) errors.Passengers['Family name'] = [];
        if (!el.Given_name) errors.Passengers['Given name'] = [];
        if (!el.date_of_birth) errors.Passengers['Date of birth'] = [];
        if (!el.Country_of_birth) errors.Passengers['Country of birth'] = [];
        if (!el.Place_of_birth) errors.Passengers['Place of birth'] = [];
        if (!el.Nationality) errors.Passengers['Nationality'] = [];
        if (!el.ID_type) errors.Passengers['ID type'] = [];
        if (!el.ID_document_number) errors.Passengers['ID document number'] = [];
        if (!el.Place_of_birth) errors.Passengers['Place of rating'] = [];
        if (!el.Port_of_embarkation) errors.Passengers['Port of embarkation'] = [];
        if (!el.Port_of_disembarkation) errors.Passengers['Port of disembarkation'] = [];
        if (!el.Transit) errors.Passengers['Transit'] = [];
    })
}

const generatePassengers = (passengers, EPCRequestBody) => {

    let rows = passengers.rows;

    let PassengerList = [];
    for (let i = 0; i < rows.length; i++) {
        let PassengerData = [];
        let embarkationPort = {};
        if (rows[i].Port_of_embarkation && rows[i].Port_of_embarkation !== '') {
            let embarkationPortCode = rows[i].Port_of_embarkation.split(' -')[0]
            embarkationPort = listOfPortsConst.find(function (element) {
                return element.code === embarkationPortCode;
            });
        }

        let disembarkationPort = {};
        if (rows[i].Port_of_disembarkation && rows[i].Port_of_disembarkation !== '') {
            let disembarkationPortCode = rows[i].Port_of_disembarkation.split(' -')[0]
            disembarkationPort = listOfPortsConst.find(function (element) {
                return element.code === disembarkationPortCode;
            });
        }
        let nationalityCode = '';
        let countryOfBirthCode = '';
        if (rows[i].Nationality && rows[i].Nationality !== '') {
            let nationality = rows[i].Nationality.split('- ');
            nationalityCode = nationality[1];
        }
        if (rows[i].Country_of_birth && rows[i].Country_of_birth !== '') {
            let countryOfBirth = rows[i].Country_of_birth.split('- ');
            countryOfBirthCode = countryOfBirth[1];
        }

        PassengerData.push({
            PassengerIdDocument: [
                {IdDocument: rows[i].ID_type},
                {IdNumber: rows[i].ID_document_number},
                {IssueDate: rows[i].Issuing_state_of_identity_document},
                {ExpirationDate: rows[i].Expiry_date_of_identity_document},
            ]
        });
        PassengerData.push({
            Name: [
                {GivenName: rows[i].Given_name},
                {FamilyName: rows[i].Family_name},
            ]
        });
        PassengerData.push({Gender: rows[i].Gender});
        PassengerData.push({DateOfBirth: rows[i].date_of_birth});
        PassengerData.push({PlaceOfBirth: rows[i].Place_of_birth});
        PassengerData.push({CountryOfBirth: countryOfBirthCode});
        PassengerData.push({Nationality: nationalityCode});
        if (embarkationPort && embarkationPort !== {}) {
            PassengerData.push({
                EmbarkationPort: [
                    {Name: embarkationPort.name},
                    {CountryCode: embarkationPort.countryCode},
                    {UNLoCode: embarkationPort.code},
                ]
            })
        }

        if (embarkationPort && embarkationPort !== {}) {
            PassengerData.push({
                DebarkationPort: [
                    {Name: disembarkationPort.name},
                    {CountryCode: disembarkationPort.countryCode},
                    {UNLoCode: disembarkationPort.code},
                ]
            })
        }
        PassengerData.push({Transit: rows[i].Transit});
        PassengerData.push({VisaNumber: rows[i].Visa_Residence_permit_number});
        PassengerList.push({PassengerData});
    }

    EPCRequestBody.push({PassengerList: PassengerList})
};

export default generatePassengers;