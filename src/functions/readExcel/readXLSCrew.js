import readXlsxFile from 'read-excel-file'
import moment from "moment";
import data from '../../config/consts/defaultDataConst'
import countryCodes from "../countryCodes";

function readXLSCrew(file, onSave) {
    data.crew.rows = [];
    let crew = data.crew;
    readXlsxFile(file).then((rows) => {
        for (let i = 4; i < rows.length; i++) {
            // skip the line if the field is not filled in
            if (!rows[i][2]) continue;
            let dateOfBirth = "";
            if (rows[i][8] != null) {
                dateOfBirth = moment(rows[i][8]).format("DD/MM/YYYY")
            }
            let expiryDate = "";
            if (rows[i][13] != null) {
                expiryDate = moment(rows[i][13]).format("DD/MM/YYYY")
            }
            let row = {
                NR: rows[i][1],
                Family_name: rows[i][2],
                Given_name: rows[i][3],
                Rank_of_rating: rows[i][4],
                Nationality: countryCodes.getCountryWithCodeByCode(rows[i][5]),
                Country_of_birth: countryCodes.getCountryWithCodeByCode(rows[i][6]),
                Place_of_birth: rows[i][7],
                date_of_birth: dateOfBirth,
                ID_type: rows[i][9],
                ID_document_number: rows[i][10],
                Issuing_state_of_identity_document: countryCodes.getCountryWithCodeByCode(rows[i][12]),
                Expiry_date_of_identity_document: expiryDate,
                Visa_Residence_permit_number: rows[i][11],
                Gender: rows[i][14]
            }
            crew.rows.push(row)
        }
        onSave({crew});

    })
    // data.crew.rows = crew;
    return crew;
}

export default readXLSCrew;
