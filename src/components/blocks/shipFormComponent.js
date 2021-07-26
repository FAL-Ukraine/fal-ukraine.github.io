import React from 'react'
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";

import countryList from "../../functions/countryList"
import ListOfPorts from "../../config/JSON/listOfPorts";
import ListOfShipTypes from "../../config/consts/listOfShipTypesConst";

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 200,
    },
    formControlNoMargin: {
        minWidth: 225,
    },
    button: {
        margin: theme.spacing(1),
    },
    topMargin: {
        marginTop: theme.spacing(5)
    }
}));

const ShipFormComponent = ({data, updateData}) => {
    const classes = useStyles();

    const marginTop = {marginTop: '30px'};
    const miniMarginTop = {marginTop: '10px'};
    const emptyDIV = <div style={{width: '225px'}}/>;

    return <>

        <Typography variant="h3" component="h3" gutterBottom>
            Ship information
        </Typography>

        <Typography style={marginTop} variant="h5" classes={classes.topMargin} component="h5" gutterBottom>
            Ship identification
        </Typography>

        <Grid container style={marginTop} classes={classes.topMargin} justify="space-between">
            <TextField
                label="Ship name"
                contentEditable={false}
                value={data.name}
                onChange={(e) =>
                    updateData({name: e.target.value})}
                variant="outlined"
            />

            <TextField
                label="IMO number"
                contentEditable={'false'}
                value={data.iMOnumber}
                onChange={(e) =>
                    updateData({iMOnumber: e.target.value})}
                variant="outlined"
            />

            <TextField
                label="Other ship related information"
                value={data.otherInfo}
                onChange={(e) =>
                    updateData({otherInfo: e.target.value})}
                variant="outlined"
            />
        </Grid>

        <Grid container style={marginTop} justify={'space-between'}>
            <TextField
                label="Call sign"
                value={data.callSign}
                onChange={(e) =>
                    updateData({callSign: e.target.value})}
                variant="outlined"
            />

            <TextField
                label="MMSI number"
                value={data.mmsiNumner}
                onChange={(e) =>
                    updateData({mmsiNumner: e.target.value})}
                variant="outlined"
            />

            {emptyDIV}
        </Grid>

        <Typography style={marginTop} variant="h5" classes={classes.topMargin} component="h5" gutterBottom>
            Ship particulars
        </Typography>

        <Grid style={marginTop} container justify={'space-between'}>

            <FormControl
                variant="outlined"
                className={classes.formControlNoMargin}
            >
                <InputLabel id="flag-state-label">Flag state</InputLabel>
                <Select
                    labelId="flag-state-label"
                    value={data.flagState}
                    onChange={(e) => {
                        updateData({flagState: e.target.value})
                    }}
                >
                    {countryList.map((item, index) => {
                        let country = item.split(":")[0];
                        return <MenuItem key={index} value={country}>
                            {item}
                        </MenuItem>
                    })}
                </Select>
            </FormControl>


            <FormControl
                variant="outlined"
                className={classes.formControlNoMargin}
            >
                <InputLabel id="ship-type-label">Flag state</InputLabel>
                <Select
                    labelId="ship-type-label"
                    value={data.shipType}
                    onChange={(e) => {
                        updateData({shipType: e.target.value})
                    }}
                >
                    {ListOfShipTypes.map((item, index) =>
                        <MenuItem key={index} value={item.code}>
                            {`${item.name}(${item.code})`}
                        </MenuItem>
                    )}
                </Select>
            </FormControl>

            {emptyDIV}
        </Grid>

        <Grid container style={marginTop} justify={'space-between'}>
            <TextField
                label="Gross tonnage"
                value={data.grossTonnage}
                onChange={(e) =>
                    updateData({grossTonnage: e.target.value})}
                variant="outlined"
            />

            <TextField
                label="Net tonnage"
                value={data.netTonnage}
                onChange={(e) =>
                    updateData({netTonnage: e.target.value})}
                variant="outlined"
            />

            {emptyDIV}
        </Grid>

        <Typography style={marginTop} variant="h5" classes={classes.topMargin} component="h5" gutterBottom>
            Certificate of registry
        </Typography>

        <Grid style={marginTop} container justify={'space-between'}>
            <FormControl
                variant="outlined"
                className={classes.formControlNoMargin}
            >
                <InputLabel id="port-label">Port</InputLabel>
                <Select
                    labelId="port-label"
                    value={data.port}
                    onChange={(e) => {
                        updateData({port: e.target.value})
                    }}
                >
                    {ListOfPorts.map((port, index) =>
                        <MenuItem key={index} value={`${port.code}`}>
                            {`${port.code} - ${port.countryCode} - ${port.name}`}
                        </MenuItem>
                    )}
                </Select>
            </FormControl>

            <TextField
                label="Date of issue"
                type="date"
                style={{minWidth: '225px'}}
                variant={'outlined'}
                value={correctDateTime(data.issueDate)}
                onChange={(e) =>
                    updateData({issueDate: e.target.value})}
                InputLabelProps={{
                    shrink: true,
                }}
            />

            <TextField
                label="Number"
                variant={'outlined'}
                value={data.certificateNumber}
                onChange={(e) =>
                    updateData({certificateNumber: e.target.value})
                }
            />

        </Grid>

        <Typography style={marginTop} variant="h5" classes={classes.topMargin} component="h5" gutterBottom>
            Company
        </Typography>

        <Grid container style={marginTop} justify={'space-between'}>
            <TextField
                style={{width: 'calc(90% - 225px)'}}
                label="Company name"
                multiline
                rowsMax={2}
                value={data.companyName}
                onChange={(e) => {
                    updateData({companyName: e.target.value})
                }}
                variant="outlined"
            />

            <TextField
                label="IMO company number"
                variant="outlined"
                value={data.iMOCompany}
                onChange={(e) => {
                    let iMOCompany = e.target.value;
                    updateData({iMOCompany})
                }}
            />
        </Grid>

        <Grid container style={miniMarginTop} justify={'space-between'}>
            <TextField
                label="Phone"
                margin={'normal'}
                value={data.phone}
                onChange={(e) => {
                    let phone = e.target.value;
                    updateData({phone})
                }}
                variant="outlined"
            />

            <TextField
                label="Fax"
                margin={'normal'}
                value={data.fax}
                onChange={(e) => {
                    let fax = e.target.value;
                    updateData({fax})
                }}
                variant="outlined"
            />

            <TextField
                label="Email"
                margin={'normal'}
                value={data.email}
                onChange={(e) => {
                    let email = e.target.value;
                    updateData({email})
                }}
                variant="outlined"
            />
        </Grid>

        <Grid container style={miniMarginTop} justify={'space-between'}>
            <TextField
                label="Year of built"
                margin={'normal'}
                value={data.builtYear}
                onChange={(e) => {
                    let builtYear = e.target.value;
                    updateData({builtYear})
                }}
                variant="outlined"
            />

            <TextField
                label="Dead weight"
                margin={'normal'}
                value={data.deadWeight}
                onChange={(e) => {
                    let deadWeight = e.target.value;
                    updateData({deadWeight})
                }}
                variant="outlined"
            />

            {emptyDIV}
        </Grid>

        <Grid container style={miniMarginTop} justify={'space-between'}>
            <TextField
                label="Length overall"
                margin={'normal'}
                value={data.length}
                onChange={(e) => {
                    let length = e.target.value;
                    updateData({length})
                }}
                variant="outlined"
            />

            <TextField
                label="Beam"
                margin={'normal'}
                value={data.beam}
                onChange={(e) => {
                    let beam = e.target.value;
                    updateData({beam})
                }}
                variant="outlined"
            />

            <TextField
                label="Summer draught"
                margin={'normal'}
                value={data.summerDraught}
                onChange={(e) => {
                    let summerDraught = e.target.value;
                    updateData({summerDraught})
                }}
                variant="outlined"
            />
        </Grid>
    </>


}

function correctDateTime(date) {
    date = "" + date;
    return date.substr(0, 16);
}

export default ShipFormComponent;