import React, {useState} from "react";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import ShipFormComponent from "../components/blocks/shipFormComponent";
import PortForm from "../components/blocks/portFormComponent";
import VoyageForm from "../components/blocks/voyageFormComponent";
import CrewForm from "../components/blocks/crewFormComponent";
import Button from '@material-ui/core/Button';
import {config} from "../config/shipDetailsConfig";
import defaultDataConst from "../config/consts/defaultDataConst";
import listOfOptionsConst from "../config/consts/listOfOptionsConst";
import readXML from "../functions/readXML/readXML";
import {makeStyles} from "@material-ui/core/styles";
import readXLS from "../functions/readExcel/readXLSParent";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import GetAppIcon from '@material-ui/icons/GetApp';
import PassengersForm from "../components/blocks/passengersFormComponent";
import createXML from "../functions/generateXML/generateXML";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import HealthFormComponent from "../components/blocks/healthFormComponent";
import ShipStoresForm from "../components/blocks/shipStoresFormComponent";
import CrewEffectsForm from "../components/blocks/crewEffectsFormComponent";
import CargoForm from "../components/blocks/cargoFormComponent";
import SecurityFormComponent from "../components/blocks/securityFormComponent";
import DPGForm from "../components/blocks/dpgFormComponent";
import WasteFormComponent from "../components/blocks/WasteFormComponent";
import _ from 'underscore'

const listOfOptions = listOfOptionsConst;


const defaultOption = 'Port';

const drawerWidth = config.showDrawerIcons ? 200 : 180;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerContainer: {
        overflow: 'auto',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    uploadFile: {
        display: 'none'
    }
}));

function ShipDetails() {

    const classes = useStyles();
    const [activeItem, setActiveItem] = useState(listOfOptions.indexOf(listOfOptions.find(el => el.label === defaultOption)));

    const [data, setData] = useState(defaultDataConst);
    const [openErrorDialog, setOpenErrorDialog] = useState({open: false, error: {}});

    console.log("All the data FROM PARENT!!", data);
    return (
        <div className={classes.root}>
            <CssBaseline/>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <Grid container justify={'space-between'}>
                        <Typography variant="h6">
                            Ship details
                        </Typography>
                        <div>
                            <Grid container justify={'flex-start'}>
                                <div style={{marginRight: '30px'}}>
                                    <input
                                        className={classes.uploadFile}
                                        onChange={() => {
                                            const file = document.getElementById("read-xml-file").files[0];
                                            const reader = new FileReader();
                                            reader.onload = (() => {
                                                try {
                                                    let {
                                                        port,
                                                        crew,
                                                        ship,
                                                        passengers,
                                                        voyage,
                                                        shipStores,
                                                        health,
                                                        crewEffects,
                                                        cargo,
                                                        dpg,
                                                        waste
                                                    } = readXML(reader.result);
                                                    let dataCopy = JSON.parse(JSON.stringify(data));

                                                    setData({
                                                        ...dataCopy, ...{
                                                            port,
                                                            crew,
                                                            ship,
                                                            passengers,
                                                            voyage,
                                                            shipStores,
                                                            health,
                                                            crewEffects,
                                                            cargo,
                                                            dpg,
                                                            waste
                                                        }
                                                    });
                                                } catch (e) {
                                                    setOpenErrorDialog({
                                                        open: true, error: {
                                                            title: 'Error while reading XML',
                                                            text: e
                                                        }
                                                    })
                                                    console.error(e);
                                                }
                                            })
                                            reader.readAsText(file);
                                        }}
                                        id="read-xml-file"
                                        type="file"
                                    />
                                    <label htmlFor="read-xml-file">
                                        <Button
                                            variant="contained"
                                            color="default"
                                            component="span"
                                            startIcon={<CloudUploadIcon/>}
                                        >
                                            Upload XML
                                        </Button>
                                    </label>
                                </div>
                                <div style={{marginRight: '30px'}}>
                                    <input
                                        className={classes.uploadFile}
                                        id="excel-file"
                                        multiple
                                        onChange={() => {
                                            const files = document.getElementById("excel-file").files;

                                            readXLS(files, setOpenErrorDialog, (item) => {
                                                let dataCopy = data;
                                                dataCopy = {...dataCopy, ...{item}}
                                                console.log('The real data real: ', dataCopy)

                                                setData(dataCopy)
                                            });

                                        }}
                                        type="file"
                                    />
                                    <label htmlFor="excel-file">
                                        <Button
                                            variant="contained"
                                            color="default"
                                            component="span"
                                            startIcon={<CloudUploadIcon/>}
                                        >
                                            Upload Excel
                                        </Button>
                                    </label>
                                </div>
                                <Button
                                    variant="contained"
                                    color="default"
                                    component="span"
                                    onClick={() => {
                                        const onError = (errors) => {
                                            console.log("THE ERRORS: ", errors);
                                            let missingFields = [];
                                            for (let block in errors) {
                                                if (!errors.hasOwnProperty(block) || _.isEmpty(errors['' + block])) continue;
                                                missingFields.push(`Block ${block}:`);
                                                for (let field in errors['' + block]) {
                                                    if (!errors['' + block].hasOwnProperty(field)) continue;
                                                    if (typeof errors[block][field] === typeof true) {
                                                        missingFields.push(`→  ${field} is empty`);
                                                    } else {
                                                        missingFields.push(`→  ${field} columns are empty`);
                                                    }
                                                }
                                                missingFields.push("");
                                            }
                                            setOpenErrorDialog({
                                                open: true,
                                                error: {
                                                    title: "Please fill in required fields first: ",
                                                    text: missingFields
                                                }
                                            })
                                        }
                                        createXML(data, onError);
                                    }}
                                    startIcon={<GetAppIcon/>}
                                >
                                    Generate XML file
                                </Button>
                            </Grid>
                        </div>
                    </Grid>
                </Toolbar>
            </AppBar>

            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <Toolbar/>
                <div className={classes.drawerContainer}>
                    <List>
                        {listOfOptions.map((item, index) => (
                            <ListItem
                                key={index}
                                button
                                color={'success'}
                                selected={activeItem === index}
                                onClick={() => {
                                    setActiveItem(index)
                                }}>

                                {(config.showDrawerIcons && item.icon) && <ListItemIcon>{item.icon}</ListItemIcon>}
                                <ListItemText primary={item.label}/>

                            </ListItem>
                        ))}
                    </List>
                </div>
            </Drawer>
            <main className={classes.content}>
                <Toolbar/>
                {getChildComponent(activeItem, [data, setData])}
            </main>

            <Dialog
                open={openErrorDialog.open}
                onClose={() => setOpenErrorDialog({
                    open: false,
                    error: {text: []}
                })}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{openErrorDialog.error.title}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {
                            (Array.isArray(openErrorDialog.error.text))
                                ?
                                openErrorDialog.error.text.map((el) => <>{el}<br/></>)
                                : openErrorDialog.error.text
                        }

                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => setOpenErrorDialog({
                            open: false,
                            error: {}
                        })}
                        color="primary" autoFocus>
                        Understood
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

function getChildComponent(activeItem, [data, setData]) {
    let selectedItem = listOfOptions[activeItem].value;

    switch (selectedItem) {
        case 'port':
            //@FIXME make it as a better function
            return <PortForm data={data.port} updateData={(dataItem) => {
                setData({...data, port: {...data.port, ...dataItem}});
            }}/>
        case 'ships':
            return <ShipFormComponent data={data.ship} updateData={(dataItem) => {
                setData({...data, ship: {...data.ship, ...dataItem}})
            }}/>
        case 'voyage':
            return <VoyageForm data={data.voyage} updateData={(dataItem) => {
                setData({...data, voyage: {...data.voyage, ...dataItem}})
            }}/>
        case 'crew':
            return <CrewForm data={data.crew} updateData={(dataItem) => {
                setData({...data, crew: {...data.crew, ...dataItem}})
            }}/>
        case 'passengers':
            return <PassengersForm data={data.passengers} updateData={(dataItem) => {
                setData({...data, passengers: {...data.passengers, ...dataItem}});
            }}/>
        case 'ship_stores':
            return <ShipStoresForm data={data.shipStores} updateData={(dataItem) => {
                setData({...data, shipStores: {...data.shipStores, ...dataItem}});
            }}/>
        case 'crew_effects':
            return <CrewEffectsForm data={data.crewEffects} updateData={(dataItem) => {
                setData({...data, crewEffects: {...data.crewEffects, ...dataItem}})
            }}/>
        case 'cargo':
            return <CargoForm data={data.cargo} updateData={(dataItem) => {
                setData({...data, cargo: {...data.cargo, ...dataItem}});
            }}/>
        case 'health':
            return <HealthFormComponent
                data={data.health}
                crewData={data.crew}
                passengerData={data.passengers}
                updateData={(dataItem) => {
                    let health = JSON.parse(JSON.stringify(data.health))
                    setData({...data, health: {...health, ...dataItem}});
                }}/>
        case 'dangerous_goods':
            return <DPGForm
                data={data.dpg}
                cargoData={data.cargo}
                updateData={(dataItem) => {
                    let dpg = JSON.parse(JSON.stringify(data.dpg))
                    setData({...data, dpg: {...dpg, ...dataItem}});
                }}/>
        case 'security':
            return <SecurityFormComponent
                data={data.security}
                updateData={(dataItem) => {
                    let security = JSON.parse(JSON.stringify(data.security));
                    setData({...data, security: {...security, ...dataItem}});
                }}/>
        case 'waste':
            return <WasteFormComponent
                data={data.waste}
                updateData={(dataItem) => {
                    let waste = JSON.parse(JSON.stringify(data.waste));
                    setData({...data, waste: {...waste, ...dataItem}});
                }}/>
        default:
            return <h1>Not supported yet</h1>
    }
}

if (config.addOnCloseEvent) {
    window.onload = function () {
        window.addEventListener("beforeunload", function (e) {
            const confirmationMessage = 'It looks like you have been editing something. '
                + 'If you leave before saving, your changes will be lost.';

            (e || window.event).returnValue = confirmationMessage; //Gecko + IE
            return confirmationMessage; //Gecko + Webkit, Safari, Chrome etc.
        });
    };
}
export default ShipDetails;