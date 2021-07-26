const readPortXML = (port, xml) => {

    port.arrivalDeparture = xml.getElementsByTagName('arrivalDeparture')[0].value;
    port.voyageNumber = xml.getElementsByTagName('voyageNumber')[0].value;
    port.portOfCall = xml.getElementsByTagName('PortCall')[0].children[0].children[3].value;
    port.portFacilityAtArrival = xml.getElementsByTagName('PortCall')[0].children[0].children[1].value;
    port.ETAPortOfCall = xml.getElementsByTagName('ETAPortOfCall')[0].value;
    port.ETDPortOfCall = xml.getElementsByTagName('ETDPortOfCall')[0].value;
    port.ATAPortOfCall = xml.getElementsByTagName('ATAPortOfCall')[0].value;
    port.ATDPortOfCall = xml.getElementsByTagName('ATDPortOfCall')[0].value;
    if (xml.getElementsByTagName('PortOfArrival')[0]) {
        port.portOfArrival = xml.getElementsByTagName('PortOfArrival')[0].children[2].value;
    }
    if (xml.getElementsByTagName('LastPortOfCall')[0]) {
        port.lastPortOfCall = xml.getElementsByTagName('LastPortOfCall')[0].children[2].value;
    }
    if (xml.getElementsByTagName('NextPortOfCall')[0]) {
        port.nextPortOfCall = xml.getElementsByTagName('NextPortOfCall')[0].children[2].value;
    }
    port.callAnchorage = xml.getElementsByTagName('Anchorage')[0].value;
    port.position.latitude = xml.getElementsByTagName('EntryPosition')[0].children[0].children[0].value;
    port.position.longitude = xml.getElementsByTagName('EntryPosition')[0].children[0].children[1].value;
    port.position.time = xml.getElementsByTagName('EntryPosition')[0].children[0].children[2].value;
    port.cargoDescription = xml.getElementsByTagName('CargoOverview')[0].value;
    port.nameOfMaster.givenName = xml.getElementsByTagName('NameOfMaster')[0].children[0].value;
    port.nameOfMaster.familyName = xml.getElementsByTagName('NameOfMaster')[0].children[1].value;

    port.callPurpose = [];
    for (let i = 0; i < 9; i++) {
        try {
            let code = xml.getElementsByTagName('CallPurpose')[i].children.find( el=> el.name === 'CallPurposeCode').value;
            // Our app identifies calls of purposes only by the code
            port.callPurpose.push(code)
        } catch (e) {
        }
    }

    port.airDraught = xml.getElementsByTagName('AirDraught')[0].value;
    if (xml.getElementsByTagName('arrivalDeparture')[0].value === 'Arrival') {
        port.arrivalDraught.foreDraught = xml.getElementsByTagName('ArrivalDraught')[0].children[0].value;
        port.arrivalDraught.midShipDraught = xml.getElementsByTagName('ArrivalDraught')[0].children[1].value;
        port.arrivalDraught.aftDraught = xml.getElementsByTagName('ArrivalDraught')[0].children[2].value;
    } else {
        port.arrivalDraught.foreDraught = xml.getElementsByTagName('DepartureDraught')[0].children[0].value;
        port.arrivalDraught.midShipDraught = xml.getElementsByTagName('DepartureDraught')[0].children[1].value;
        port.arrivalDraught.aftDraught = xml.getElementsByTagName('DepartureDraught')[0].children[2].value;
    }
    port.agent.company = xml.getElementsByTagName('Agent')[0].children[0].value;
    port.agent.contactNumbers.mobileTelephone = xml.getElementsByTagName('Agent')[0].children[1].children[1].value;
    port.agent.contactNumbers.businessTelephone = xml.getElementsByTagName('Agent')[0].children[1].children[0].value;
    port.agent.contactNumbers.telefax = xml.getElementsByTagName('Agent')[0].children[1].children[2].value;
    port.agent.contactNumbers.EMail = xml.getElementsByTagName('Agent')[0].children[1].children[3].value;
    port.personsOnBoard.numberOfPersonsOnBoard = xml.getElementsByTagName('PersonsOnBoard')[0].children[0].value;
    port.personsOnBoard.crew = xml.getElementsByTagName('PersonsOnBoard')[0].children[2].value;
    port.personsOnBoard.passengers = xml.getElementsByTagName('PersonsOnBoard')[0].children[1].value;
    port.stowaways = xml.getElementsByTagName('Stowaways')[0].value;
    port.periodOfStay = xml.getElementsByTagName('periodOfStay')[0].value;
    console.log("Port ", port);
};

export default readPortXML;