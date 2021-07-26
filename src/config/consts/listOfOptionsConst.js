import DirectionsBoatIcon from '@material-ui/icons/DirectionsBoat';
import WorkIcon from '@material-ui/icons/Work';
import GroupIcon from '@material-ui/icons/Group';
import CompareArrowsIcon from '@material-ui/icons/CompareArrows';
import StorageIcon from '@material-ui/icons/Storage';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import WarningIcon from '@material-ui/icons/Warning';
import SecurityIcon from '@material-ui/icons/Security';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import DeleteIcon from '@material-ui/icons/Delete';

// eslint-disable-next-line import/no-anonymous-default-export
export default [
    {
        label: 'Port',
        value: 'port',
        icon: <GroupIcon/>
    }, {
        label: 'Ships',
        value: 'ships',
        icon: <DirectionsBoatIcon/>
    }, {
        label: 'Crew',
        value: 'crew',
        icon: <WorkIcon/>
    }, {
        label: 'Passengers',
        value: 'passengers',
        icon: <GroupIcon/>
    }, {
        label: 'Voyage',
        value: 'voyage',
        icon: <CompareArrowsIcon/>
    }, {
        label: 'Ship stores',
        value: 'ship_stores',
        icon: <StorageIcon/>
    }, {
        label: 'Crew effects',
        value: 'crew_effects',
        icon: <AssignmentIndIcon/>
    }, {
        label: 'Cargo',
        value: 'cargo',
        icon: <LocalShippingIcon/>
    }, {
        label: 'Health',
        value: 'health',
        icon: <LocalHospitalIcon/>
    }, {
        label: 'Dangerous goods',
        value: 'dangerous_goods',
        icon: <WarningIcon/>
    }, {
        label: 'Security',
        value: 'security',
        icon: <SecurityIcon/>
    }, {
        label: 'Waste',
        value: 'waste',
        icon: <DeleteIcon/>
    }
];