import readXlsxFile from 'read-excel-file'
import data from '../../config/consts/defaultDataConst'
import moment from "moment";

const readXLSHealth = (file, onSave) => {
    let health = data.health;
    readXlsxFile(file).then((rows) => {
        console.log('rows', rows);
        health.enum1 = rows[13][5];
        health.nrOfDeath = rows[13][7];
        health.enum2 = rows[16][5];
        health.enum3 = rows[20][5];
        health.nrOfIll = rows[20][7];
        health.enum4 = rows[23][5];
        health.enum5 = rows[26][5];
        health.enum6 = rows[29][5];
        health.enum7 = rows[32][5];
        health.enum8 = rows[41][5];
        health.joinedStowaways = rows[41][7];
        health.enum9 = rows[44][5];
        health.sanitaryMeasures = [];
        for (let i = 36; i <= 39; i++) {
            if (!rows[i][2]) continue;
            let type = rows[i][2];
            let place = rows[i][3];
            // let date = rows[i][4];
            let date = "";
            if (rows[i][4] != null) {
                date = moment(rows[i][4]).format("DD/MM/YYYY")
            }
            health.sanitaryMeasures.push({type, place, date})
        }
        health.illList = [];
        for (let i = 56; i < rows.length; i++) {
            if (!rows[i][1]) continue;
            let NR = rows[i][1];
            let crewPassenger = rows[i][2];
            let familyName = rows[i][3];
            let firstName = rows[i][4];
            let ill = rows[i][7];
            let symptomsDate = ''
            if (rows[i][8] != null) {
                symptomsDate = moment(rows[i][8]).format("DD/MM/YYYY")
            }
            let reportedPort = rows[i][9];
            let state = rows[i][10];
            let caseDisposal = rows[i][11];
            let location = rows[i][12];
            let treatment = rows[i][13];
            let comments = rows[i][14];
            health.illList.push({
                NR,
                crewPassenger,
                familyName,
                firstName,
                ill,
                symptomsDate,
                reportedPort,
                state,
                caseDisposal,
                location,
                treatment,
                comments
            })
        }

        onSave({health});
    });
}

export default readXLSHealth;