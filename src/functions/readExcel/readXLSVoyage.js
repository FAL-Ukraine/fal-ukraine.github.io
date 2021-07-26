import readXlsxFile from 'read-excel-file'
import moment from "moment";
import data from '../../config/consts/defaultDataConst'
import listOfPortsConst from "../../config/JSON/listOfPorts";

function readXLSVoyage(file, onSave) {
    data.voyage.rows = [];
    let voyage = data.voyage;
    readXlsxFile(file).then((rows) => {
        console.log("voyage ", rows);
        for (let i = 7; i < 17; i++) {
            if (!rows[i][2]) continue;

            let Date_of_arrival = "";
            if (rows[i][2] != null) {
                Date_of_arrival = moment(rows[i][2]).format("DD/MM/YYYY, h:mm")
            }

            let Date_of_departure = "";
            if (rows[i][3] != null) {
                Date_of_departure = moment(rows[i][3]).format("DD/MM/YYYY, h:mm")
            }

            let Port = listOfPortsConst.find(function (element) {
                return element.code === rows[i][4];
            });

            let Port_formatted = ''
            if (Port) {
                Port_formatted = Port.code + ' - ' + Port.countryCode + ' - ' + Port.name;
            }


            let row = {
                NR: rows[i][1],
                Date_of_arrival: Date_of_arrival,
                Date_of_departure: Date_of_departure,
                Port: Port_formatted,
                Port_facility: rows[i][5],
                Security_level: rows[i][7],
                Security_measures: rows[i][8],
            }
            voyage.rows.push(row)
        }

        onSave({voyage});

    })
}

export default readXLSVoyage;
