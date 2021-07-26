import readXlsxFile from 'read-excel-file'
import moment from "moment";
import data from '../../config/consts/defaultDataConst'
import countryCodes from "../countryCodes";
import listOfPortsConst from "../../config/JSON/listOfPorts";

function readXLSPassengers(file, onSave) {
    data.passengers.rows = [];
    let passengers = data.passengers;
    readXlsxFile(file).then((rows) => {
        console.log("passengers ", rows);
        for (let i = 4; i < rows.length; i++) {
            let dateOfBirth = "";
            if (rows[i][7] != null) {
                dateOfBirth = moment(rows[i][7]).format("MM/DD/YYYY")
            }
            let expiryDate = "";
            if (rows[i][14] != null) {
                expiryDate = moment(rows[i][14]).format("MM/DD/YYYY")
            }
            let Issuing_state_of_identity_document = "";
            if (rows[i][15] != null) {
                Issuing_state_of_identity_document = moment(rows[i][15]).format("MM/DD/YYYY")
            }
            let Port_of_embarkation = listOfPortsConst.find(function (element) {
                return element.code === rows[i][10];
            });

            let Port_of_embarkation_formatted = Port_of_embarkation.code + ' - ' + Port_of_embarkation.countryCode + ' - ' + Port_of_embarkation.name;

            let Port_of_disembarkation = listOfPortsConst.find(function (element) {
                return element.code === rows[i][11];
            });

            let Port_of_disembarkation_formatted = Port_of_disembarkation.code + ' - ' + Port_of_disembarkation.countryCode + ' - ' + Port_of_disembarkation.name;


            let row = {
                NR: rows[i][1],
                Family_name: rows[i][2],
                Given_name: rows[i][3],
                Nationality: countryCodes.getCountryWithCodeByCode(rows[i][4]),
                Country_of_birth: countryCodes.getCountryWithCodeByCode(rows[i][5]),
                Place_of_birth: rows[i][6],
                date_of_birth: dateOfBirth,
                ID_type: rows[i][8],
                ID_document_number: rows[i][9],
                Issuing_state_of_identity_document: Issuing_state_of_identity_document,
                Expiry_date_of_identity_document: expiryDate,
                Port_of_embarkation: Port_of_embarkation_formatted,
                Port_of_disembarkation: Port_of_disembarkation_formatted,
                Transit: rows[i][12],
                Visa_Residence_permit_number: rows[i][13],
                Gender: rows[i][16]
            }
            passengers.rows.push(row)
        }

        onSave({passengers});

    })
    // data.crew.rows = crew;
    // return crew;
}

export default readXLSPassengers;
