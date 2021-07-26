import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import {DataGrid} from '@material-ui/data-grid';
import shipCallsData from './../config/JSON/shipCallsData.json'


console.log('COlumn data: ', shipCallsData)
const columns = [
    {field: 'id', headerName: 'ID', width: 100},
    {
        field: 'ship',
        headerName: 'Ship',
        width: 130,
    },
    {
        field: 'imo',
        headerName: 'IMO',
        width: 110,
    },
    {
        field: 'portCall',
        headerName: 'Port call',
        width: 160,
    },
    {
        field: 'agent',
        headerName: 'Agent',
        width: 150,
    },
    {
        field: 'ETA',
        headerName: 'ETA',
        width: 150,
    },
];

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
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

export default function HomePage({history}) {

    const classes = useStyles()

    return (
        <div className={classes.root}>
            <CssBaseline/>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <Grid container justify={'space-between'}>
                        <Typography variant="h6">
                            Ship calls
                        </Typography>
                    </Grid>
                </Toolbar>
            </AppBar>
            <main className={classes.content}>
                <Toolbar/>

                <Grid container style={{marginTop: '50px'}} justify={'center'}>

                    <div style={{width: '805px', height: '500px'}}>
                        <DataGrid
                            rows={shipCallsData}
                            columns={columns}
                            pageSize={7}
                            onRowClick={ (e) => {
                                history.push(`/details/${e.id}`);
                            }}
                            disableSelectionOnClick
                        />
                    </div>
                </Grid>
            </main>
        </div>
    )
}