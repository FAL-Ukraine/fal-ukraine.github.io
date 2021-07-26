import readXlsxFile from 'read-excel-file'
import data from '../../config/consts/defaultDataConst'


function readXLSShipStores(file, onSave) {
    data.shipStores.rows = [];
    let shipStores = data.shipStores;
    readXlsxFile(file).then((rows) => {
        console.log("shipStores ", rows);
        for (let i = 4; i < rows.length; i++) {
            let row = {
                NR: i-3,
                Name_of_article: rows[i][1],
                Quantity: rows[i][2],
                Unit: rows[i][3],
                Location_on_board: rows[i][4],
            }
            shipStores.rows.push(row)
        }

        onSave({shipStores});

    })
}

export default readXLSShipStores;
