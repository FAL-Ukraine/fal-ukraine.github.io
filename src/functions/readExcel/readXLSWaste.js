import readXlsxFile from 'read-excel-file'
import moment from "moment";
import data from '../../config/consts/defaultDataConst'
import listOfPortsConst from "../../config/JSON/listOfPorts";

function readXLSWaste(file, onSave) {
    data.waste.rows = [];
    data.waste.WasteDeliveryStatus = '';
    data.waste.LastPortDelivered = '';
    data.waste.LastPortDeliveredDate = '';
    let waste = data.waste;
    readXlsxFile(file).then((rows) => {

        data.waste.WasteDeliveryStatus = rows[2][3];
        data.waste.LastPortDelivered = rows[9][2];
        if (rows[9][4] != null) {
            data.waste.LastPortDeliveredDate = moment(rows[9][4]).format("YYYY-MM-DD");
        }


        for (let i = 14; i < 23; i++) {
            let Port = '';
            if (rows[i]) {
                Port = listOfPortsConst.find(function (element) {
                    return element.code === rows[i][6];
                });


                let Port_formatted = ''
                if (Port) {
                    Port_formatted = Port.code + ' - ' + Port.countryCode + ' - ' + Port.name;
                }

                let row = {
                    NR: i + 1,
                    PortOfDelivery: Port_formatted,
                    WasteType: rows[i][1],
                    WasteToBeDelivered: rows[i][3],
                    MaxStorage: rows[i][4],
                    WasteAmount: rows[i][5],
                    EstimatedWaste: rows[i][7],
                }
                waste.rows.push(row)
            }
        }

        onSave({waste});

    })
}

export default readXLSWaste;
