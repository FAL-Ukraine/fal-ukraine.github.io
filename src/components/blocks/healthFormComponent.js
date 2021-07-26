import {makeStyles} from "@material-ui/core/styles";
import React, {useState} from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import ReactDataGrid from "react-data-grid";
import Button from "@material-ui/core/Button";
import datePicker from "../pickers/datePicker";
import {Editors} from 'react-data-grid-addons';
import Collapse from "@material-ui/core/Collapse";
import Alert from "@material-ui/lab/Alert";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

const {DropDownEditor} = Editors;

const illGridRef = React.createRef();
const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 200,
    },
    formControlNoMargin: {
        minWidth: 225,
        height: 85
    },
    selectControl: {
        height: 85
    },
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

const HealthFormComponent = ({data, updateData, crewData, passengerData}) => {

    const classes = useStyles();
    const [openAlert, setOpenAlert] = useState({open: false, error: "", severity: 'error'})
    const marginTop = {marginTop: '30px'};
    const widthOfLongQuestion = {width: '65%'}

    return <>
        <Typography variant="h3" component="h3" gutterBottom>
            Maritime Declaration of Health
        </Typography>

        <Typography style={marginTop} variant="h5" classes={classes.topMargin} component="h5" gutterBottom>
            Health questions
        </Typography>

        <Grid container style={marginTop} classes={classes.topMargin} justify="space-between">
            <div style={widthOfLongQuestion}>
                <FormControl
                    variant="outlined"
                    className={classes.formControlNoMargin}
                    fullWidth
                >
                    <InputLabel className={classes.labelControl} id="enum-1-label">(1) Has any person died on board
                        during the voyage otherwise than as a
                        result of accident? </InputLabel>
                    <Select
                        labelId="enum-1-label"
                        value={data.enum1}
                        className={classes.selectControl}
                        onChange={(e) => {
                            updateData({enum1: e.target.value})
                        }}
                    >
                        <MenuItem value={'Yes'}>Yes</MenuItem>
                        <MenuItem value={'No'}>No</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <TextField
                label="Total no. of death"
                value={data.nrOfDeath}
                style={{marginRight: "30px"}}
                onChange={(e) =>
                    updateData({nrOfDeath: e.target.value})}
                variant="outlined"
            />
        </Grid>

        <Grid container style={marginTop} classes={classes.topMargin} justify="space-between">
            <div style={widthOfLongQuestion}>
                <FormControl
                    style={{height: "85px"}}
                    variant="outlined"
                    className={classes.formControlNoMargin}
                    fullWidth
                >
                    <InputLabel className={classes.labelControl} id="enum-2-label">(2) Is there on board or has there
                        been during the international
                        voyage any case of disease which you suspect to be of an infectious nature?</InputLabel>
                    <Select
                        className={classes.selectControl}
                        labelId="enum-2-label"
                        value={data.enum2}
                        onChange={(e) => {
                            updateData({enum2: e.target.value})
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
                    <InputLabel className={classes.labelControl} id="enum-3-label">(3) Has the total number of ill
                        passengers during the voyage been
                        greater than normal/expected?</InputLabel>
                    <Select
                        className={classes.selectControl}
                        labelId="enum-3-label"
                        value={data.enum3}
                        onChange={(e) => {
                            updateData({enum3: e.target.value})
                        }}
                    >
                        <MenuItem value={'Yes'}>Yes</MenuItem>
                        <MenuItem value={'No'}>No</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <TextField
                label="How many ill persons?"
                value={data.nrOfIll}
                style={{marginRight: "30px"}}
                onChange={(e) =>
                    updateData({nrOfIll: e.target.value})}
                variant="outlined"
            />
        </Grid>

        <Grid container style={marginTop} classes={classes.topMargin} justify="space-between">
            <div style={widthOfLongQuestion}>
                <FormControl
                    variant="outlined"
                    className={classes.formControlNoMargin}
                    fullWidth
                >
                    <InputLabel className={classes.labelControl} id="enum-4-label">(4) Is there any ill person on board
                        now?</InputLabel>
                    <Select
                        className={classes.selectControl}
                        labelId="enum-4-label"
                        value={data.enum4}
                        onChange={(e) => {
                            updateData({enum4: e.target.value})
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
                    <InputLabel className={classes.labelControl} id="enum-5-label">(5) Was a medical practitioner
                        consulted?</InputLabel>
                    <Select
                        className={classes.selectControl}
                        labelId="enum-5-label"
                        value={data.enum5}
                        onChange={(e) => {
                            updateData({enum5: e.target.value})
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
                    <InputLabel className={classes.labelControl} id="enum-6-label">(6) Are you aware of any condition on
                        board which may lead to
                        infection or spread of disease?</InputLabel>
                    <Select
                        className={classes.selectControl}
                        labelId="enum-6-label"
                        value={data.enum6}
                        onChange={(e) => {
                            updateData({enum6: e.target.value})
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
                    <InputLabel className={classes.labelControl} id="enum-7-label">(7) Has any sanitary measure (e.g.
                        quarantine, isolation, disinfection
                        or decontamination) been applied on board?</InputLabel>
                    <Select
                        className={classes.selectControl}
                        labelId="enum-7-label"
                        value={data.enum7}
                        onChange={(e) => {
                            updateData({enum7: e.target.value})
                        }}
                    >
                        <MenuItem value={'Yes'}>Yes</MenuItem>
                        <MenuItem value={'No'}>No</MenuItem>
                    </Select>
                </FormControl>
            </div>
        </Grid>

        <div style={{width: '470px', position: 'relative', marginTop: '30px'}}>
            <ReactDataGrid
                columns={[
                    {key: "type", name: "Type", editable: true, width: 150},
                    {key: "place", name: "Place", editable: true, width: 150},
                    {key: "date", name: "Date", editable: true, editor: datePicker, width: 150}
                ]}
                rowGetter={i => data.sanitaryMeasures[i]}
                rowsCount={data.sanitaryMeasures.length}
                onGridRowsUpdated={({fromRow, toRow, updated}) => {
                    const sanitaryMeasures = data.sanitaryMeasures.slice();
                    for (let i = fromRow; i <= toRow; i++) {
                        sanitaryMeasures[i] = {...sanitaryMeasures[i], ...updated};
                    }
                    updateData({sanitaryMeasures})
                }}
                enableCellSelect={true}
            />
            <Button variant="primary" onClick={() => {
                let sanitaryMeasures = data.sanitaryMeasures;
                sanitaryMeasures.push({});
                updateData({sanitaryMeasures})
            }}>
                Add row
            </Button>
            <Button variant="primary" onClick={() => {
                let sanitaryMeasures = data.sanitaryMeasures;
                sanitaryMeasures.pop();
                updateData({sanitaryMeasures});
            }}>Delete row</Button>
        </div>

        <Grid container style={marginTop} classes={classes.topMargin} justify="space-between">
            <div style={widthOfLongQuestion}>
                <FormControl
                    variant="outlined"
                    className={classes.formControlNoMargin}
                    fullWidth
                >
                    <InputLabel className={classes.labelControl} id="enum-8-label">(8) have any stowaways been found on
                        board?</InputLabel>
                    <Select
                        className={classes.selectControl}
                        labelId="enum-8-label"
                        value={data.enum8}
                        onChange={(e) => {
                            updateData({enum8: e.target.value})
                        }}
                    >
                        <MenuItem value={'Yes'}>Yes</MenuItem>
                        <MenuItem value={'No'}>No</MenuItem>
                    </Select>
                </FormControl>
            </div>

            <TextField
                label="If yes, where did they join the ship (if known)?"
                margin={'normal'}
                value={data.joinedStowaways}
                style={{marginRight: "30px"}}
                onChange={(e) => {
                    let joinedStowaways = e.target.value;
                    updateData({joinedStowaways})
                }}
                variant="outlined"
            />
        </Grid>

        <Grid container style={marginTop} classes={classes.topMargin} justify="space-between">
            <div style={widthOfLongQuestion}>
                <FormControl
                    variant="outlined"
                    className={classes.formControlNoMargin}
                    fullWidth
                >
                    <InputLabel className={classes.labelControl} id="enum-9-label">(9) Is there a sick animal or pet on
                        board?</InputLabel>
                    <Select
                        className={classes.selectControl}
                        labelId="enum-9-label"
                        value={data.enum9}
                        onChange={(e) => {
                            updateData({enum9: e.target.value})
                        }}
                    >
                        <MenuItem value={'Yes'}>Yes</MenuItem>
                        <MenuItem value={'No'}>No</MenuItem>
                    </Select>
                </FormControl>
            </div>
        </Grid>

        <Typography style={marginTop} variant="p" classes={classes.topMargin} component="p" gutterBottom>
            Note: In the absence of a surgeon, the master should regard the following symptoms as grounds for suspecting
            the existence of a disease of an infectious nature:<br/>
            (a) fever, persisting for several days or accompanied by (i) prostration; (ii) decreased consciousness;
            (iii) glandular swelling; (iv) jaundice; (v) cough or shortness of breath; (vi) unusual bleeding; or (vii)
            paralysis.<br/>
            (b) with or without fever: (i) any acute skin rash or eruption; (ii) severe vomiting (other than sea
            sickness); (iii) severediarrhoea; or (iv) recurrent convulsions.
        </Typography>

        {/*The Alerts*/}
        <Collapse in={openAlert.open} style={{marginTop: '30px'}}>
            <Alert
                severity={openAlert.severity}
                action={
                    <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => {
                            setOpenAlert({open: false, error: "", severity: 'error'});
                        }}
                    >
                        <CloseIcon fontSize="inherit"/>
                    </IconButton>
                }
            >
                {openAlert.error}
            </Alert>
        </Collapse>

        <div style={{marginTop: '30px'}}>
            <ReactDataGrid
                key={Math.random()}
                ref={illGridRef}
                columns={[
                    {key: "NR", name: "NR", editable: true, width: 40},
                    {
                        key: "crewPassenger",
                        name: "Crew or passenger",
                        editable: true,
                        width: 145,
                        editor: <DropDownEditor options={['(...)', 'Crew', 'Passenger']}/>
                    },
                    {key: "familyName", name: "Family name", editable: false, width: 100},
                    {key: "firstName", name: "First name", editable: false, width: 85},
                    {key: "ill", name: "Illness", editable: true, width: 150},
                    {key: "symptomsDate", name: "Symptoms Date", editable: true, width: 120, editor: datePicker},
                    {
                        key: "reportedPort",
                        name: "Reported to port medical",
                        editable: true,
                        editor: <DropDownEditor options={['(...)', 'Yes', 'No']}/>,
                        width: 150
                    },
                    {key: "state", name: "State", editable: true, width: 150},
                    {key: "caseDisposal", name: "Case Disposal", editable: true, width: 150},
                    {key: "location", name: "Location of evacuation", editable: true, width: 150},
                    {key: "treatment", name: "Treatment", editable: true, width: 150},
                    {key: "comments", name: "Comments", editable: true, width: 150},

                ]}
                rowGetter={i => data.illList[i]}
                rowsCount={data.illList.length}
                onGridRowsUpdated={({fromRow, toRow, updated}) => {
                    console.log('From row:', fromRow, 'to row: ', toRow, 'and updated: ', updated)
                    const illList = data.illList;

                    for (let i = fromRow; i <= toRow; i++) {
                        let item = illList[i];
                        // to put the first and last name there
                        if (updated.hasOwnProperty("NR")) {
                            if (!item.hasOwnProperty("crewPassenger")) {
                                setOpenAlert({
                                    open: true,
                                    error: 'Please fill in "Crew or Passenger" field first',
                                    severity: 'error'
                                })
                                setTimeout(() => setOpenAlert({open: false, error: "", severity: 'error'}), 5000);
                                continue;
                            }
                            item.NR = parseInt(updated.NR);
                            if (item.crewPassenger === 'Crew') {
                                let crewItem = crewData.rows.find(el => el.NR === item.NR);
                                if (!crewItem) {
                                    setOpenAlert({
                                        open: true, error: "Crew with number " + item.NR
                                            + " does not exist. Please provide NR with correct number reference of crew member",
                                        severity: 'error'
                                    })
                                    setTimeout(() => setOpenAlert({open: false, error: "", severity: 'error'}), 5000);
                                    continue;
                                }
                                item.firstName = crewItem.Given_name;
                                item.familyName = crewItem.Family_name;
                                illList[i] = item;
                            } else if (item.crewPassenger === "Passenger") {
                                let passengerItem = passengerData.rows.find(el => el.NR === item.NR);
                                if (!passengerItem) {
                                    setOpenAlert({
                                        open: true, error: "Passenger with number " + item.NR
                                            + " does not exist. Please provide NR with correct number reference of passenger member",
                                        severity: 'error'
                                    })
                                    setTimeout(() => setOpenAlert({open: false, error: "", severity: 'error'}), 5000);
                                    continue;
                                }
                                item.firstName = passengerItem.Given_name;
                                item.familyName = passengerItem.Family_name;
                                illList[i] = item;
                            } else {
                                setOpenAlert({
                                    open: true,
                                    error: 'Please fill in "Crew or Passenger" field first',
                                    severity: 'error'
                                })
                                setTimeout(() => setOpenAlert({open: false, error: "", severity: 'error'}), 5000);
                            }
                        } else {
                            item = {...item, ...updated};
                        }
                        illList[i] = item;
                    }

                    updateData({illList: illList})
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

export default HealthFormComponent;