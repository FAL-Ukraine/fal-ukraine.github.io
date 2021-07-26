import React from "react";
import ReactDataGrid from 'react-data-grid';
import {withStyles} from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {Editors} from 'react-data-grid-addons';
import unitList from "../../config/consts/unitList";

const {DropDownEditor} = Editors;

const styles = (theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
});

const UnitEditor = <DropDownEditor options={unitList}/>;

const columns = [
    {key: "NR", name: "NR", editable: true, width: 50},
    {key: "Name_of_article", name: "Name of article", editable: true},
    {key: "Quantity", name: "Quantity", editable: true},
    {key: "Unit", name: "Unit", editable: true, editor: UnitEditor},
    {key: "Location_on_board", name: "Location on board", editable: true},
];


function ShipStoresForm({data, updateData}) {
    function addRow() {
        console.log("adding row");
        let number = data.rows.length + 1
        let row = {NR: number}
        data.rows.push(row);
        updateData(data)
    }

    function deleteRow() {
        data.rows.pop();
        updateData(data)
    }

    function onGridRowsUpdated({fromRow, toRow, updated}) {

        const rows = data.rows.slice();
        for (let i = fromRow; i <= toRow; i++) {
            rows[i] = {...rows[i], ...updated};
        }
        data.rows = rows
        updateData(data)
    };


    return (
        <div>
            <Typography variant="h3" component="h3" gutterBottom>
                Ship stores
            </Typography>
            <ReactDataGrid
                columns={columns}
                rowGetter={i => data.rows[i]}
                rowsCount={data.rows.length}
                onGridRowsUpdated={onGridRowsUpdated}
                enableCellSelect={true}
                columnAutoWidth="true"

            />
            <Button variant="primary" onClick={addRow}>Add row</Button>
            <Button variant="primary" onClick={deleteRow}>Delete row</Button>
        </div>
    );

}


export default withStyles(styles)(ShipStoresForm);