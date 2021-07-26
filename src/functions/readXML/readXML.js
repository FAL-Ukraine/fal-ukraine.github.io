import XMLParser from 'react-xml-parser';
import defaultData from '../../config/consts/defaultDataConst'
import readPortXML from "./readPortXML";
import readCrewXML from "./readCrewXML";
import readShipXML from "./readShipXML";
import readPassengersXML from "./readPassengersXML";
import readVoyageXML from "./readVoyageXML";
import readShipStoresXML from "./readShipStoresXML";
import readHealthXML from "./readHealthXML";
import readCrewEffectsXML from "./readCrewEffectsXML";
import readSecurityXML from "./readSecurityXML";
import readCargoXML from "./readCargoXML";
import readWasteXML from "./readWasteXML";

function readXML(fileContent) {
    let xml = new XMLParser().parseFromString(fileContent);

    console.log("reading xml ");
    let data = defaultData;
    readPortXML(data.port, xml);
    readShipXML(data.ship, xml);
    readCrewXML(data.crew, xml);
    readPassengersXML(data.passengers, xml);
    readVoyageXML(data.voyage, xml);
    readShipStoresXML(data.shipStores, xml);
    readHealthXML(data.health, xml);
    readCrewEffectsXML(data.crewEffects, xml);
    readCargoXML(data.cargo, data.dpg, xml);
    readSecurityXML(data.security, xml);
    readWasteXML(data.waste, xml);


    console.log("Read from XML data: ", data);
    makeReferences(data);
    return data;
}

// A function to assign the references on different elements
function makeReferences(data) {
    data.health.illList.map(el => {
        let {NR, crewPassenger} = el;
        if (crewPassenger === 'Crew') {
            let crewItem = data.crew.rows.find(item => item.NR === NR);
            if (!crewItem) {
                return el;
            }
            el.firstName = crewItem.Given_name;
            el.familyName = crewItem.Family_name;
        } else if (crewPassenger === 'Passenger') {
            let passengerItem = data.passengers.rows.find(item => item.NR === NR);
            if (!passengerItem) {
                return el;
            }
            el.firstName = passengerItem.Given_name;
            el.familyName = passengerItem.Family_name;
        }

        return el;
    })
}

export default readXML

