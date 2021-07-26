import React from "react";
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select'
import '@date-io/date-fns';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import ListOfPurposesOfCalls from '../../config/consts/listOfPurposesOfCallsConst';

import ListOfPorts from '../../config/JSON/listOfPorts'

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 225,
    },
    datePicker: {
        minWidth: 250,
        width: 250
    },
    formControlNoMargin: {
        minWidth: 225,
    },
    formControlNoMargin2: {
        minWidth: 225,
        // minHeight: 60
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    button: {
        margin: theme.spacing(1),
    },
}));


function PortForm({data, updateData}) {

    const classes = useStyles();
    console.log('THe data', data)
    const emptyDiv = <div className={classes.formControlNoMargin} style={{height: '0px'}}/>

    return <>
        <Typography variant="h3" component="h3" gutterBottom>
            Port information
        </Typography>

        <Grid container justify={'space-between'}>
            <FormControl
                variant="outlined"
                className={classes.formControlNoMargin}
            >
                <InputLabel id="departure-arrival-label">Departure / Arrival</InputLabel>

                <Select
                    labelId="departure-arrival-label"
                    value={data.arrivalDeparture}
                    onChange={(e) => {
                        updateData({arrivalDeparture: e.target.value})
                    }}
                >
                    <MenuItem value={'Arrival'}>Arrival</MenuItem>
                    <MenuItem value={'Departure'}>Departure</MenuItem>
                </Select>
            </FormControl>

            <TextField
                label="Voyage Number:"
                value={data.voyageNumber}
                onChange={(e) => updateData({voyageNumber: e.target.value})}
                variant="outlined"
            />

            {emptyDiv}
        </Grid>

        <Typography variant="h5" component="h5" gutterBottom style={{marginTop: '30px'}}>
            Port of call
        </Typography>

        {/*Port of call and all time pickers*/}
        <Grid container justify="space-between">

            <FormControl
                variant="outlined"
                className={classes.formControlNoMargin}
                margin={"normal"}
            >
                <InputLabel id="port-of-call-label">Port of call</InputLabel>

                <Select
                    labelId="port-of-call-label"
                    value={data.portOfCall}
                    onChange={(e) => {
                        updateData({portOfCall: e.target.value})
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
                label="ETA to port of call"
                type="datetime-local"
                variant={'outlined'}
                className={classes.datePicker}
                margin={"normal"}
                value={correctDateTime(data.ETAPortOfCall)}
                onChange={(e) =>
                    updateData({ETAPortOfCall: e.target.value})}
                InputLabelProps={{
                    shrink: true,
                }}
                inputProps={{
                    step: 300, // 5 min
                }}
            />

            <TextField
                label="ATA to port of call"
                type="datetime-local"
                variant={'outlined'}
                className={classes.datePicker}
                margin={"normal"}
                value={correctDateTime(data.ATAPortOfCall)}
                onChange={(e) =>
                    updateData({ATAPortOfCall: e.target.value})}
                InputLabelProps={{
                    shrink: true,
                }}
            />
        </Grid>

        <Grid container justify="space-between">
            <TextField
                style={{marginTop: '15px'}}
                value={data.portFacilityAtArrival}
                onChange={(e) =>
                    updateData({portFacilityAtArrival: e.target.value})}
                label="Port facility at arrival"
                variant="outlined"
                margin={"normal"}
            />


            <TextField
                label="ETD to port of call"
                type="datetime-local"
                className={classes.datePicker}
                variant={'outlined'}
                margin={"normal"}
                value={correctDateTime(data.ETDPortOfCall)}
                onChange={(e) =>
                    updateData({ETDPortOfCall: e.target.value})}
                InputLabelProps={{
                    shrink: true,
                }}
            />


            <TextField
                label="ATD to port of call"
                type="datetime-local"
                className={classes.datePicker}
                variant={'outlined'}
                margin={"normal"}
                value={correctDateTime(data.ATDPortOfCall)}
                onChange={(e) =>
                    updateData({ATDPortOfCall: e.target.value})}
                InputLabelProps={{
                    shrink: true,
                }}
            />
        </Grid>

        {/*Port of arrival / last port of call / next port of call*/}
        <Grid container justify="space-between" style={{marginTop: '30px'}}>

            <FormControl
                variant="outlined"
                className={classes.formControlNoMargin}
            >
                <InputLabel id="port-of-arrival-label">Port of arrival</InputLabel>

                <Select
                    labelId="port-of-arrival-label"
                    value={data.portOfArrival}
                    onChange={(e) => {
                        updateData({portOfArrival: e.target.value})
                    }}
                >
                    {ListOfPorts.map((port, index) =>
                        <MenuItem key={index} value={`${port.code}`}>
                            {`${port.code} - ${port.countryCode} - ${port.name}`}
                        </MenuItem>
                    )}
                </Select>
            </FormControl>

            <FormControl
                variant="outlined"
                className={classes.formControlNoMargin}
            >
                <InputLabel id="last-port-call-label">Last port of call</InputLabel>
                <Select
                    labelId="last-port-call-label"
                    value={data.lastPortOfCall}
                    onChange={(e) => {
                        updateData({lastPortOfCall: e.target.value})
                    }}
                >
                    {ListOfPorts.map((port, index) =>
                        <MenuItem key={index} value={`${port.code}`}>
                            {`${port.code} - ${port.countryCode} - ${port.name}`}
                        </MenuItem>
                    )}
                </Select>
            </FormControl>


            <FormControl
                variant="outlined"
                // required
                className={classes.formControlNoMargin}
            >
                <InputLabel id="next-port-call-label">Next port of call</InputLabel>
                <Select
                    labelId="next-port-call-label"
                    value={data.nextPortOfCall}
                    onChange={(e) => {
                        updateData({nextPortOfCall: e.target.value})
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

        <FormControl
            variant="outlined"
            required
            className={classes.formControlNoMargin}
            style={{marginTop: "30px"}}
        >
            <InputLabel id="next-port-call-label">Call at anchorage</InputLabel>
            <Select
                labelId="next-port-call-label"
                value={data.callAnchorage}
                onChange={(e) => {
                    updateData({callAnchorage: e.target.value})
                }}
            >
                <MenuItem value={'Yes'}>Yes</MenuItem>
                <MenuItem value={'No'}>No</MenuItem>
            </Select>
        </FormControl>

        <Typography variant="h5" component="h5" style={{marginTop: '30px'}} gutterBottom>
            Position at port of call
        </Typography>

        {/*Latitude, longitute and time*/
        }
        <Grid container justify="space-between" style={{marginTop: '15px'}}>

            <TextField
                label="Latitude"
                value={data.position.latitude}
                onChange={(e) => {
                    let latitude = e.target.value;
                    let position = data.position;
                    updateData({position: {...position, latitude}})
                }}
                variant="outlined"
            />

            <TextField
                label="Longitude"
                value={data.position.longitude}
                onChange={(e) => {
                    let longitude = e.target.value;
                    let position = data.position;
                    updateData({position: {...position, longitude}})
                }}
                variant="outlined"
            />

            <TextField
                label="Time"
                type="datetime-local"
                className={classes.datePicker}
                variant={'outlined'}
                value={correctDateTime(data.position.time)}
                onChange={(e) => {
                    let time = e.target.value;
                    let position = {...data.position, time};
                    updateData({position})
                }}
                InputLabelProps={{
                    shrink: true,
                }}
                inputProps={{
                    step: 300, // 5 min
                }}
            />

        </Grid>

        <TextField
            style={{marginTop: '30px'}}
            id="cargo-description"
            label="Brief description of onboard cargo"
            multiline
            fullWidth
            rowsMax={4}
            value={data.cargoDescription}
            onChange={(e) => updateData({cargoDescription: e.target.value})}
            variant="outlined"
        />

        <Typography variant="h5" component="h5" style={{marginTop: '30px'}} gutterBottom>
            Name of master
        </Typography>

        <Grid container justify={'space-between'}>

            <TextField
                label="Family name"
                value={data.nameOfMaster.familyName}
                onChange={(e) => {
                    let familyName = e.target.value;
                    let nameOfMaster = {...data.nameOfMaster, familyName};
                    updateData({nameOfMaster})
                }}
                variant="outlined"
            />

            <TextField
                label="Given name"
                value={data.nameOfMaster.givenName}
                onChange={(e) => {
                    let givenName = e.target.value;
                    let nameOfMaster = {...data.nameOfMaster, givenName};
                    updateData({nameOfMaster})
                }}
                variant="outlined"
            />

            {emptyDiv}

        </Grid>

        <Typography variant="h5" component="h5" style={{marginTop: '30px'}} gutterBottom>
            Purpose of call
        </Typography>
        <div style={{marginTop: "20px"}}>
            {data.callPurpose.map((item, index) => <div key={index}>

                <FormControl
                    key={index}
                    variant="outlined"
                    className={classes.formControlNoMargin}

                >

                    <InputLabel id={`purpose-of-call-label${index}`}>
                        {index === 0 ? 'Call purpose' : `Call purpose (${index})`}
                    </InputLabel>

                    <Select
                        labelId={`purpose-of-call-label${index}`}
                        value={data.callPurpose[index]}
                        onChange={(e) => {
                            let purposeArr = data.callPurpose;
                            purposeArr[index] = e.target.value;
                            updateData({callPurpose: purposeArr})
                        }}
                    >
                        {ListOfPurposesOfCalls.map((purpose, index) => {
                            return <MenuItem key={index} value={purpose.callPurposeCode}>
                                {`${purpose.callPurposeText}(${purpose.callPurposeCode})`}
                            </MenuItem>
                        })}
                    </Select>
                </FormControl>

                <IconButton
                    style={{
                        marginLeft: '10px',
                        marginBottom: '20px'
                    }}
                    color={'secondary'}
                    aria-label="delete"
                    variant={'outlined'}
                    onClick={() => {
                        if (index === 0 && data.callPurpose.length === 1) {
                            updateData({callPurpose: ['']})
                        } else {
                            let slicedData = JSON.parse(JSON.stringify(data.callPurpose));
                            slicedData.splice(index, 1);
                            updateData({callPurpose: slicedData})
                        }
                    }}
                >
                    <DeleteIcon/>
                </IconButton>

            </div>)}

            <Button
                style={{marginTop: '15px'}}
                variant="outlined"
                color="primary"
                disabled={data.callPurpose[data.callPurpose.length - 1] === ''}
                className={classes.button}
                onClick={() => updateData({purposeOfCall: data.callPurpose.push('')})}
                startIcon={<AddIcon/>}
            >
                Add new row
            </Button>

        </div>

        <TextField
            style={{marginTop: '20px'}}
            id="air-draught-field"
            label="Air draught"
            value={data.airDraught}
            onChange={(e) => updateData({airDraught: e.target.value})}
            variant="outlined"
        />


        <Typography variant="h5" component="h5" style={{marginTop: '30px'}} gutterBottom>
            {data.arrivalDeparture ? data.arrivalDeparture : 'Departure'} draught
        </Typography>

        <Grid container justify={'space-between'}>
            <TextField
                label="Fore draught"
                value={data.arrivalDraught.foreDraught}
                onChange={(e) => {
                    let foreDraught = e.target.value;
                    let arrivalDraught = {...data.arrivalDraught, foreDraught};
                    updateData({arrivalDraught})
                }}
                margin={'normal'}
                variant="outlined"
            />

            <TextField
                label="Mid-ship draught"
                value={data.arrivalDraught.midShipDraught}
                onChange={(e) => {
                    let midShipDraught = e.target.value;
                    let arrivalDraught = {...data.arrivalDraught, midShipDraught};
                    updateData({arrivalDraught})
                }}
                margin={'normal'}
                variant="outlined"
            />

            <TextField
                label="Aft draught"
                value={data.arrivalDraught.aftDraught}
                onChange={(e) => {
                    let aftDraught = e.target.value;
                    let arrivalDraught = {...data.arrivalDraught, aftDraught};
                    updateData({arrivalDraught})
                }}
                margin={'normal'}
                variant="outlined"
            />
        </Grid>


        <Typography variant="h5" component="h5" style={{marginTop: '30px'}} gutterBottom>
            Name and contact details of ship's agent
        </Typography>

        <Grid container justify={'space-between'}>
            <TextField
                style={{width: 'calc(90% - 220px)'}}
                label="Name"
                multiline
                rowsMax={2}
                value={data.agent.company}
                onChange={(e) => {
                    let company = e.target.value;
                    let agent = {...data.agent, company};
                    updateData({agent})
                }}
                variant="outlined"
            />

            <TextField
                label="Mobile telephone"
                variant="outlined"
                value={data.agent.contactNumbers.mobileTelephone}
                onChange={(e) => {
                    let mobileTelephone = e.target.value;
                    let contactNumbers = {...data.agent.contactNumbers, mobileTelephone};
                    let agent = {...data.agent, contactNumbers};
                    updateData({agent})
                }}
            />
        </Grid>

        <Grid container justify={'space-between'}>
            <TextField
                label="Business telephone"
                margin={'normal'}
                value={data.agent.contactNumbers.businessTelephone}
                onChange={(e) => {
                    let businessTelephone = e.target.value;
                    let contactNumbers = {...data.agent.contactNumbers, businessTelephone};
                    let agent = {...data.agent, contactNumbers};
                    updateData({agent})
                }}
                variant="outlined"
            />

            <TextField
                label="Telefax"
                margin={'normal'}
                value={data.agent.contactNumbers.telefax}
                onChange={(e) => {
                    let telefax = e.target.value;
                    let contactNumbers = {...data.agent.contactNumbers, telefax};
                    let agent = {...data.agent, contactNumbers};
                    updateData({agent})
                }}
                variant="outlined"
            />

            <TextField
                label="Email"
                margin={'normal'}
                value={data.agent.contactNumbers.EMail}
                onChange={(e) => {
                    let EMail = e.target.value;
                    let contactNumbers = {...data.agent.contactNumbers, EMail};
                    let agent = {...data.agent, contactNumbers};
                    updateData({agent})
                }}
                variant="outlined"
            />
        </Grid>

        <Typography variant="h5" component="h5" style={{marginTop: '30px'}} gutterBottom>
            Number of persons on board
        </Typography>

        <Grid container justify={'space-between'}>
            <TextField
                label="Number of persons"
                margin={'normal'}
                value={data.personsOnBoard.numberOfPersonsOnBoard}
                onChange={(e) => {
                    let numberOfPersonsOnBoard = e.target.value;
                    let personsOnBoard = {...data.personsOnBoard, numberOfPersonsOnBoard};
                    updateData({personsOnBoard});
                }}
                variant="outlined"
            />

            <TextField
                label="Number of crew"
                margin={'normal'}
                value={data.personsOnBoard.crew}
                onChange={(e) => {
                    let crew = e.target.value;
                    let personsOnBoard = {...data.personsOnBoard, crew};
                    updateData({personsOnBoard});
                }}
                variant="outlined"
            />

            <TextField
                label="Number of passengers"
                margin={'normal'}
                value={data.personsOnBoard.passengers}
                onChange={(e) => {
                    let passengers = e.target.value;
                    let personsOnBoard = {...data.personsOnBoard, passengers};
                    updateData({personsOnBoard});
                }}
                variant="outlined"
            />

        </Grid>

        <Grid container justify={'space-between'}>
            <FormControl
                variant="outlined"
                className={classes.formControlNoMargin2}
                margin={"normal"}
            >
                <InputLabel id="stowaways-label">Have any stowaways been found on boards</InputLabel>

                <Select
                    className={classes.formControlNoMargin2}
                    labelId="stowaways-label"
                    value={data.stowaways}
                    onChange={(e) => updateData({stowaways: e.target.value})}
                >
                    <MenuItem value={'Yes'}>Yes</MenuItem>
                    <MenuItem value={'No'}>No</MenuItem>
                </Select>
            </FormControl>

            <TextField
                label="Period of stay"
                margin={'normal'}
                style={{marginLeft: '30px'}}
                variant="outlined"
                value={data.periodOfStay}
                onChange={(e) =>
                    updateData({periodOfStay: e.target.value})
                }
            />

            {emptyDiv}

        </Grid>
    </>
}

function correctDateTime(date) {
    date = "" + date;
    return date.substr(0, 16);
}

export default PortForm;
