import readXlsxFile from 'read-excel-file'
import data from '../../config/consts/defaultDataConst'

let readXLSPort = (file, onSave) => {
    let port = data.port
    readXlsxFile(file).then((rows) => {
        // `rows` is an array of rows
        // each row being an array of cells.
        let Row2 = rows[2];
        let Row5 = rows[5];
        let Row6 = rows[6];
        let Row8 = rows[8];
        let Row9 = rows[9];
        let Row10 = rows[10];
        let Row13 = rows[13];
        let Row14 = rows[14];
        let Row15 = rows[15];
        let Row17 = rows[17];
        let Row20 = rows[20];
        let Row21 = rows[21];
        let Row24 = rows[24];
        let Row25 = rows[25];
        let Row27 = rows[27];
        let Row28 = rows[28];
        port.arrivalDeparture = Row2[2];
        port.voyageNumber = Row27[2];
        port.portOfCall = Row5[2];
        port.portFacilityAtArrival = Row8[6];
        port.ETAPortOfCall = Row5[4];
        port.ETDPortOfCall = Row5[6];
        port.ATAPortOfCall = Row6[4];
        port.ATDPortOfCall = Row6[6];
        port.portOfArrival = Row28[2];
        port.lastPortOfCall = Row28[4];
        port.nextPortOfCall = Row28[6];
        port.callAnchorage = Row8[2];
        port.position.latitude = Row9[3];
        port.position.longitude = Row9[4];
        port.position.time = Row8[4];
        port.cargoDescription = Row10[2];
        port.nameOfMaster.familyName = Row13[2];
        port.nameOfMaster.givenName = Row14[2];
        port.callPurpose = [];
        port.callPurpose.push(Row13[4]);
        port.callPurpose.push(Row14[4]);
        port.callPurpose.push(Row15[4]);
        port.callPurpose.filter(el => el && el.length !== 0);
        for (let i = 0; i < port.callPurpose.length; i++) {
            let purpose = port.callPurpose[i];
            try {
                port.callPurpose[i] = purpose.split('(')[1].split(')')[0];
            } catch (e) {
            }
        }
        port.airDraught = Row15[2];
        port.arrivalDraught.foreDraught = Row17[2];
        port.arrivalDraught.midShipDraught = Row17[4];
        port.arrivalDraught.aftDraught = Row17[6];
        port.agent.company = Row20[2];
        port.agent.contactNumbers.mobileTelephone = Row20[4];
        port.agent.contactNumbers.telefax = Row21[4];
        port.agent.contactNumbers.EMail = Row20[6];
        port.personsOnBoard.numberOfPersonsOnBoard = Row24[2];
        port.personsOnBoard.crew = Row24[4];
        port.personsOnBoard.passengers = Row24[6];
        port.stowaways = Row25[3];
        port.periodOfStay = Row27[4];

        console.log("Port read from Excel: ", port);
        onSave({port});
        return port;
    }).then(console.log("finish"))
}
export default readXLSPort
