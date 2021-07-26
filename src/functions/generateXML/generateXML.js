import xml from 'xml'
import generatePort, {checkRequiredPort} from "./generatePort";
import generateCrew, {checkRequiredCrew} from "./generateCrew";
import generateShip, {checkRequiredShip} from "./generateShip";
import generatePassengers, {checkRequiredPassengers} from "./generatePasssengers";
import generateVoyage, {checkRequiredVoyage} from "./generateVoyage";
import generateShipStores from "./generateShipStores";
import generateHealth, {checkRequiredHealth} from "./generateHealth";
import generateCrewEffects, {checkRequiredCrewEffects} from "./generateCrewEffects";
import generateCargo, {checkRequiredCargo, checkRequiredDangerous} from "./generateCargo";
import generateSecurity, {checkRequiredSecurity} from "./generateSecurity";
import generateWaste, {checkRequiredWaste} from "./generateWaste";
import _ from 'underscore'

function createXML(data, onError) {
    // @FIXME The required fields are not verified yet :(
    const errors = checkRequiredFields(data);
    if (!_.isEmpty(errors)) {
        onError(errors);
        return;
    }

    let EPCRequestBody = [];
    console.log("Generating XML data structure ", data);

    generatePort(data.port, EPCRequestBody);
    generateCrew(data.crew, EPCRequestBody);
    generateShip(data.ship, EPCRequestBody);
    generatePassengers(data.passengers, EPCRequestBody);
    generateVoyage(data.voyage, EPCRequestBody);
    generateShipStores(data.shipStores, EPCRequestBody);
    generateHealth(data.health, EPCRequestBody);
    generateCrewEffects(data.crewEffects, EPCRequestBody);
    generateCargo(data.cargo, data.dpg, EPCRequestBody)
    generateSecurity(data.security, EPCRequestBody);
    generateWaste(data.waste, EPCRequestBody);

    let xmlValue = xml([{
        EPCMessage: [{
            EPCMessageHeader: [
                {ArrivalDeparture: data.port.arrivalDeparture}
            ]
        },
            {
                EPCRequestBody: EPCRequestBody
            }
        ]
    }], {declaration: true});
    downloadXMLfile(xmlValue);
}

function checkRequiredFields(data) {
    const errors = {};
    checkRequiredPort(errors, data.port);
    checkRequiredShip(errors, data.ship);
    checkRequiredCrew(errors, data.crew);
    checkRequiredPassengers(errors, data.passengers);
    checkRequiredVoyage(errors, data.voyage);
    checkRequiredCargo(errors, data.cargo);
    checkRequiredDangerous(errors, data.dpg);
    checkRequiredSecurity(errors, data.security);
    checkRequiredCrewEffects(errors, data.crewEffects);
    checkRequiredHealth(errors, data.health);
    checkRequiredWaste(errors, data.waste)


    //deleting empty objects
    Object.keys(errors).forEach(el => {
        if (_.isEmpty(errors[el])) delete errors[el];
    })

    return errors;
}

let downloadXMLfile = (xmlValue) => {
    let data = xmlValue;
    let filename = `XML config ${new Date()}.xml`
    let file = new Blob([data], /*{type: type}*/);

    let a = document.createElement("a"),
        url = URL.createObjectURL(file);
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(function () {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }, 100);

}

export default createXML;