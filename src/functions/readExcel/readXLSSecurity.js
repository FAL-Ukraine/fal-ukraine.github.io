import readXlsxFile from 'read-excel-file'
import data from '../../config/consts/defaultDataConst'
import moment from "moment";

const readXLSSecurity = (file, onSave) => {
    readXlsxFile(file).then((rows) => {
        let security = data.security;

        security.validISSC = rows[3][3];
        security.noValid = rows[3][5];
        security.issued = rows[5][5];
        security.isscType = rows[7][5];
        if (rows[7][7] != null) {
            security.expiryDate = moment(rows[7][7]).format("YYYY-MM-DD")
        }
        security.securityLevel = rows[11][4];
        security.securityRelatedMatter = rows[13][4];
        security.firstName = rows[17][3];
        security.familyName = rows[18][3];
        security.phone = rows[17][5];
        security.fax = rows[18][5];
        security.email = rows[19][5];
        security.approvedSSP = rows[8][3];

        security.rows = [];
        for (let i = 36; i <= 45; i++) {
            if (!rows[i][2]) continue;
            let NR = rows[i][1];
            let dateFrom = '';
            if (rows[i][2] != null) {
                dateFrom = moment(rows[i][2]).format("DD/MM/YYYY")
            }
            let dateDeparture = '';
            if (rows[i][3] != null) {
                dateDeparture = moment(rows[i][3]).format("DD/MM/YYYY")
            }
            let locationName = rows[i][4];
            let latitude = rows[i][5];
            let longitude = rows[i][6];
            let shipActivity = rows[i][7];
            let securityMeasure = rows[i][8];
            let port = rows[i][9];
            security.rows.push({
                NR,
                dateFrom,
                dateDeparture,
                locationName,
                latitude,
                longitude,
                shipActivity,
                securityMeasure,
                port
            })
        }

        onSave({security})

    });
}

export default readXLSSecurity;