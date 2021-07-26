import React from "react";
import ReactDataGrid from 'react-data-grid';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {Editors} from 'react-data-grid-addons';
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import ListOfPorts from "../../config/JSON/listOfPorts";
import MenuItem from "@material-ui/core/MenuItem";
import kindOfPackagesList from "../../config/consts/kindOfPackagesList";
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


const KindOfPackagesEditor = <DropDownEditor options={kindOfPackagesList}/>;
const UnitEditor = <DropDownEditor options={unitList}/>;

const columns = [
    {key: "Seq", name: "Seq", editable: true, width: 50},
    {key: "Number_of_packages", name: "Number of packages", editable: true, width: 150},
    {key: "Kind_of_packages", name: "Kind of packages", editable: true, editor: KindOfPackagesEditor, width: 150},
    {key: "Transport_unit", name: "Transport unit(Container number)", editable: true, width: 240},
    {key: "Description_of_goods", name: "Description of goods", editable: true, width: 150},
    {key: "Shipping_marks", name: "Shipping marks", editable: true, width: 150},
    {key: "HS_code", name: "HS code", editable: true, width: 100},
    {key: "Gross_quantity", name: "Gross quantity", editable: true, width: 150},
    {key: "Gross_Unit", name: "Unit", editable: true, editor: UnitEditor, width: 70},
    {key: "Net_quantity", name: "Net quantity", editable: true, width: 150},
    {key: "Net_Unit", name: "Unit", editable: true, editor: UnitEditor, width: 70},
    {key: "Measurement", name: "Measurement", editable: true, width: 150},
    {key: "Measurement_Unit", name: "Unit", editable: true, editor: UnitEditor, width: 70},
    {key: "Seal_number", name: "Seal number", editable: true, width: 150},
    {key: "Custom_status", name: "Custom status", editable: true, width: 150},
    {key: "Size_and_type", name: "Size and type", editable: true, width: 150},
];
const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        marginLeft: theme.spacing(0),
        minWidth: 200,
    }
}));


function CargoForm({data, updateData}) {
    const classes = useStyles();
    function addRow() {
        console.log("adding row");
        let number = data.rows.length + 1
        let row = {Seq: number}
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
        data.rows = rows;
        updateData(data)
    }


    return <>
        <div>
            <Typography variant="h3" component="h3" gutterBottom>
                Cargo
            </Typography>
            {/*Port of arrival / last port of call / next port of call*/}
            <Grid container justify="space-between" style={{marginTop: '30px'}}>
                <FormControl
                    variant="outlined"
                    className={classes.formControl}
                >
                    <InputLabel id="port-of-loading-label">Port of loading</InputLabel>

                    <Select
                        labelId="port-of-loading-label"
                        value={data.portOfLoading}
                        onChange={(e) => {
                            updateData({portOfLoading: e.target.value})
                        }}
                    >
                        {ListOfPorts.map((port, index) =>
                            <MenuItem key={index} value={`${port.code}`}>
                                {`${port.code} - ${port.countryCode} - ${port.name}`}
                            </MenuItem>
                        )}
                    </Select>
                </FormControl>


            </Grid>
            <Grid>
                <FormControl
                    variant="outlined"
                    className={classes.formControl}
                >
                    <InputLabel id="portOfDischarge-label">Port of Discharge</InputLabel>
                    <Select
                        labelId="portOfDischarge-label"
                        value={data.portOfDischarge}
                        onChange={(e) => {
                            updateData({portOfDischarge: e.target.value})
                        }}
                    >
                        {ListOfPorts.map((port, index) =>
                            <MenuItem key={index} value={`${port.code}`}>
                                {`${port.code} - ${port.countryCode} - ${port.name}`}
                            </MenuItem>
                        )}
                    </Select>
                </FormControl>
            </Grid>
            <ReactDataGrid
                columns={columns}
                rowGetter={i => data.rows[i]}
                rowsCount={data.rows.length}
                onGridRowsUpdated={onGridRowsUpdated}
                enableCellSelect={true}

            />
            <Button variant="primary" onClick={addRow}>Add row</Button>
            <Button variant="primary" onClick={deleteRow}>Delete row</Button>
        </div>

    </>
}


export default withStyles(styles)(CargoForm);