import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import ReactDataGrid from "react-data-grid";
import datePicker from "../pickers/datePicker";
import Button from "@material-ui/core/Button";
import {Editors} from "react-data-grid-addons";
import listOfPortsConst from "../../config/JSON/listOfPorts";

const {DropDownEditor} = Editors;

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 200,
    },
    formControlNoMargin: {
        minWidth: 225,
    },
    selectControl: {},
    labelControl: {
        width: "90%"
    },
    button: {
        margin: theme.spacing(1),
    },
    topMargin: {
        marginTop: theme.spacing(5)
    }
}));


const SecurityFormComponent = ({data, updateData}) => {

    const classes = useStyles();
    const marginTop = {marginTop: '30px'};
    const widthOfLongQuestion = {width: '50%'}
    const emptyDIV = <div style={{width: '225px'}}/>;
    const portEditor = listOfPortsConst.map(el => el.code).filter(el => el.length !== 0);
    const activityEditor = ['(...)', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15',]
    return <>
        <Typography variant="h3" classes={classes.topMargin} component="h3" gutterBottom>
            Security Information</Typography>

        <Typography style={marginTop} variant="h5" classes={classes.topMargin} component="h5" gutterBottom>
            Security information
        </Typography>

        <Grid container style={marginTop} classes={classes.topMargin} justify="space-between">
            <div style={widthOfLongQuestion}>
                <FormControl
                    variant="outlined"
                    className={classes.formControlNoMargin}
                    fullWidth
                >
                    <InputLabel className={classes.labelControl} id="issc-label">Does the ship have a valid
                        International Ship Security Certificate (ISSC)?</InputLabel>
                    <Select
                        className={classes.selectControl}
                        labelId="issc-label"
                        value={data.validISSC}
                        onChange={(e) => {
                            updateData({validISSC: e.target.value})
                        }}
                    >
                        <MenuItem value={'Yes'}>Yes</MenuItem>
                        <MenuItem value={'No'}>No</MenuItem>
                    </Select>
                </FormControl>
            </div>

            <TextField
                label="If no, why not?"
                value={data.noValid}
                style={{marginRight:"10%"}}
                onChange={(e) =>
                    updateData({noValid: e.target.value})}
                variant="outlined"
            />
        </Grid>

        <FormControl
            style={marginTop}
            variant="outlined"
            className={classes.formControlNoMargin}
        >
            <InputLabel className={classes.labelControl} id="issued-label">Issued by</InputLabel>
            <Select
                className={classes.selectControl}
                labelId="issued-label"
                value={data.issued}
                onChange={(e) => {
                    updateData({issued: e.target.value})
                }}
            >
                <MenuItem value={'GVT'}>GVT</MenuItem>
                <MenuItem value={'RSO'}>RSO</MenuItem>
            </Select>
        </FormControl>

        <Grid container style={marginTop} classes={classes.topMargin} justify="space-between">
            <FormControl
                variant="outlined"
                className={classes.formControlNoMargin}
            >
                <InputLabel className={classes.labelControl} id="issc-type-label">
                    ISSC type
                </InputLabel>
                <Select
                    className={classes.selectControl}
                    labelId="issc-type-label"
                    value={data.isscType}
                    onChange={(e) => {
                        updateData({isscType: e.target.value})
                    }}
                >
                    <MenuItem value={'Full'}>Full</MenuItem>
                    <MenuItem value={'Interim'}>Interim</MenuItem>
                </Select>
            </FormControl>

            <TextField
                label="Expiry date"
                type="date"
                variant={'outlined'}
                value={data.expiryDate}
                onChange={(e) =>
                    updateData({expiryDate: e.target.value})}
                InputLabelProps={{
                    shrink: true,
                }}
            />

            {emptyDIV}
        </Grid>

        <Grid container style={marginTop} classes={classes.topMargin} justify="space-between">
            <div style={widthOfLongQuestion}>
                <FormControl
                    variant="outlined"
                    className={classes.formControlNoMargin}
                    fullWidth
                >
                    <InputLabel className={classes.labelControl} id="security-level-label">
                        Security level at which the ship is currently operating
                    </InputLabel>
                    <Select
                        className={classes.selectControl}
                        labelId="security-level-label"
                        value={data.securityLevel}
                        onChange={(e) => {
                            updateData({securityLevel: e.target.value})
                        }}
                    >
                        <MenuItem value={'Security Level 1'}>Security level 1</MenuItem>
                        <MenuItem value={'Security Level 2'}>Security level 2</MenuItem>
                        <MenuItem value={'Security Level 3'}>Security level 3</MenuItem>
                    </Select>
                </FormControl>
            </div>
        </Grid>

        <Grid container style={marginTop} classes={classes.topMargin} justify="space-between">
            <div style={widthOfLongQuestion}>
                <FormControl
                    variant="outlined"
                    className={classes.formControlNoMargin}
                    fullWidth
                >
                    <InputLabel className={classes.labelControl} id="security-level-label">
                        Is there any security-related matter you wish to report
                    </InputLabel>
                    <Select
                        className={classes.selectControl}
                        labelId="security-level-label"
                        value={data.securityRelatedMatter}
                        onChange={(e) => {
                            updateData({securityRelatedMatter: e.target.value})
                        }}
                    >
                        <MenuItem value={'Yes'}>Yes</MenuItem>
                        <MenuItem value={'No'}>No</MenuItem>
                    </Select>
                </FormControl>
            </div>
        </Grid>

        <Grid container style={marginTop} classes={classes.topMargin} justify="space-between">
            <div style={widthOfLongQuestion}>
                <FormControl
                    variant="outlined"
                    className={classes.formControlNoMargin}
                    fullWidth
                >
                    <InputLabel className={classes.labelControl} id="approved-label">
                        Does the ship have an approved SSP on board?
                    </InputLabel>
                    <Select
                        className={classes.selectControl}
                        labelId="approved-label"
                        value={data.approvedSSP}
                        onChange={(e) => {
                            updateData({approvedSSP: e.target.value})
                        }}
                    >
                        <MenuItem value={'Yes'}>Yes</MenuItem>
                        <MenuItem value={'No'}>No</MenuItem>
                    </Select>
                </FormControl>
            </div>
        </Grid>

        <hr style={marginTop}/>

        <Typography style={marginTop} variant="h5" classes={classes.topMargin} component="h5" gutterBottom>
            CSO name and 24 hours contract details
        </Typography>

        <Grid container style={marginTop} classes={classes.topMargin} justify="space-between">
            <TextField
                label="Given name"
                value={data.firstName}
                onChange={(e) =>
                    updateData({firstName: e.target.value})}
                variant="outlined"
            />
            <TextField
                label="Family name"
                value={data.familyName}
                onChange={(e) =>
                    updateData({familyName: e.target.value})}
                variant="outlined"
            />
            {emptyDIV}
        </Grid>

        <Grid container style={marginTop} classes={classes.topMargin} justify="space-between">
            <TextField
                label="Phone"
                value={data.firstName}
                onChange={(e) =>
                    updateData({firstName: e.target.value})}
                variant="outlined"
            />
            <TextField
                label="Fax"
                value={data.fax}
                onChange={(e) =>
                    updateData({fax: e.target.value})}
                variant="outlined"
            />

            <TextField
                label="Email"
                value={data.email}
                onChange={(e) =>
                    updateData({email: e.target.value})}
                variant="outlined"
            />
        </Grid>

        <hr style={marginTop}/>

        <Typography style={marginTop} variant="h5" classes={classes.topMargin} component="h5" gutterBottom>
            Ship-to-ship activities, in chronological order (most recent first)<br/>
            which were carried out during the last 10 calls at port facilities listed above
        </Typography>

        <div style={{marginTop: '30px'}}>
            <ReactDataGrid
                columns={[
                    {key: "NR", name: "NR", editable: true, width: 40},
                    {
                        key: "dateFrom",
                        name: "Date from",
                        editable: true,
                        width: 145,
                        editor: datePicker
                    },
                    {
                        key: "dateDeparture",
                        name: "Date departure",
                        editable: true,
                        width: 145,
                        editor: datePicker
                    },
                    {key: "locationName", name: "Location", editable: true, width: 150},
                    {key: "latitude", name: "Latitude", editable: true, width: 150},
                    {key: "longitude", name: "Longitude", editable: true, width: 150},
                    {
                        key: "shipActivity",
                        name: "Activity",
                        editable: true,
                        width: 120,
                        editor: <DropDownEditor options={activityEditor}/>
                    },
                    {
                        key: "securityMeasure",
                        name: "Security measures",
                        editable: true,
                        width: 150
                    },
                    {
                        key: "port",
                        name: "Port",
                        editable: true,
                        editor: <DropDownEditor options={portEditor}/>,
                        width: 150
                    }
                ]}
                rowGetter={i => data.rows[i]}
                rowsCount={data.rows.length}
                onGridRowsUpdated={({fromRow, updated}) => {
                    let rows = data.rows;
                    rows[fromRow] = {...rows[fromRow], ...updated};
                    updateData({rows})
                }}
                enableCellSelect={true}
            />
            <Button variant="primary" onClick={() => {
                let illList = data.illList;
                illList.push({});
                updateData({illList})
            }}>
                Add row
            </Button>
            <Button variant="primary" onClick={() => {
                let illList = data.illList;
                illList.pop();
                updateData({illList});
            }}>Delete row</Button>
        </div>
    </>
}


export default SecurityFormComponent;