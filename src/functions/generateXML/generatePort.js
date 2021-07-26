import listOfPortsConst from "../../config/JSON/listOfPorts";
import listOfPurposesOfCallsConst from "../../config/consts/listOfPurposesOfCallsConst";

const generatePort = (port, EPCRequestBody) => {

    let portOfCall = listOfPortsConst.find(function (element) {
        return element.code === port.portOfCall;
    });

    let portOfArrival = listOfPortsConst.find(function (element) {
        return element.code === port.portOfArrival;
    });

    let lastPortOfCall = listOfPortsConst.find(function (element) {
        return element.code === port.lastPortOfCall;
    });
    let nextPortOfCall = listOfPortsConst.find(function (element) {
        return element.code === port.nextPortOfCall;
    });

    let ArrivalDepartureDraught;

    if (port.arrivalDeparture === 'Arrival') {
        ArrivalDepartureDraught = {
            ArrivalDraught: [
                {ForeDraught: port.arrivalDraught.foreDraught},
                {MidShipDraught: port.arrivalDraught.midShipDraught},
                {Time: port.arrivalDraught.aftDraught},
            ]
        }

    } else {
        ArrivalDepartureDraught = {
            DepartureDraught: [
                {ForeDraught: port.arrivalDraught.foreDraught},
                {MidShipDraught: port.arrivalDraught.midShipDraught},
                {Time: port.arrivalDraught.aftDraught},
            ]
        }
    }

    EPCRequestBody.push({VoyageNumber: port.voyageNumber});
    if (portOfCall) {
        EPCRequestBody.push({
            VoyageDescription: [
                {
                    PortCall: [
                        {
                            Port: [
                                {Name: portOfCall.name},
                                {Facility: port.portFacilityAtArrival},
                                {CountryCode: portOfCall.countryCode},
                                {UNLoCode: portOfCall.code}
                            ]
                        }]
                }
            ]

        });
    }

    EPCRequestBody.push({ETAPortOfCall: port.ETAPortOfCall})
    EPCRequestBody.push({ETDPortOfCall: port.ETDPortOfCall})
    EPCRequestBody.push({ATAPortOfCall: port.ATAPortOfCall})
    EPCRequestBody.push({ATDPortOfCall: port.ATDPortOfCall})
    if (portOfArrival) {
        EPCRequestBody.push({
            PortOfArrival: [
                {Name: portOfArrival.name},
                {CountryCode: portOfArrival.countryCode},
                {UNLoCode: portOfArrival.code},
            ]
        })
    }

    if (lastPortOfCall) {
        EPCRequestBody.push({
            LastPortOfCall: [
                {Name: lastPortOfCall.name},
                {CountryCode: lastPortOfCall.countryCode},
                {UNLoCode: lastPortOfCall.code}
            ]
        })
    }

    if (nextPortOfCall) {
        EPCRequestBody.push({
            NextPortOfCall: [
                {Name: nextPortOfCall.name},
                {CountryCode: nextPortOfCall.countryCode},
                {UNLoCode: nextPortOfCall.code}
            ]
        })
    }

    EPCRequestBody.push({Anchorage: port.callAnchorage})
    EPCRequestBody.push({
        EntryPosition: [
            {
                Position: [
                    {Latitude: port.position.latitude},
                    {Longitude: port.position.longitude},
                    {Time: port.position.time}
                ]
            }]
    })
    EPCRequestBody.push({CargoOverview: port.cargoDescription});
    EPCRequestBody.push({
        NameOfMaster: [
            {GivenName: port.nameOfMaster.givenName},
            {FamilyName: port.nameOfMaster.familyName},
        ]
    })
    for (let i = 0; i < port.callPurpose.length; i++) {
        if (port.callPurpose[i] !== "") {
            let callPurpose = listOfPurposesOfCallsConst.find(function (element) {
                return element.callPurposeCode = port.callPurpose[i];
            })
            console.log("call purposes ", port.callPurpose[i])
            EPCRequestBody.push({
                CallPurpose: [
                    {CallPurposeCode: callPurpose.callPurposeCode},
                    {CallPurposeText: callPurpose.callPurposeText}
                ]
            })
        }

    }
    EPCRequestBody.push({AirDraught: port.airDraught})
    EPCRequestBody.push(ArrivalDepartureDraught)
    EPCRequestBody.push({
        Agent: [
            {Company: port.agent.company},
            {
                ContactNumbers: [
                    {BusinessTelephone: port.agent.contactNumbers.businessTelephone},
                    {MobileTelephone: port.agent.contactNumbers.mobileTelephone},
                    {Telefax: port.agent.contactNumbers.telefax},
                    {Email: port.agent.contactNumbers.EMail},
                ]
            },
        ]
    });
    EPCRequestBody.push({
        PersonsOnBoard: [
            {NumberOfPersonsOnBoard: port.personsOnBoard.numberOfPersonsOnBoard},
            {Passengers: port.personsOnBoard.passengers},
            {Crew: port.personsOnBoard.crew},
        ]
    });
    EPCRequestBody.push({Stowaways: port.stowaways});
    EPCRequestBody.push({PeriodOfStay: port.periodOfStay});
};

export const checkRequiredPort = (errors, data) => {
    errors.Port = {};

    if (!data.arrivalDeparture) errors.Port['Departure/Arrival'] = true;
    if (!data.portOfCall) errors.Port["Port of call"] = true;
    if (!data.position.latitude) errors.Port['Latitude'] = true;
    if (!data.position.longitude) errors.Port['Longitude'] = true;
    if (!data.position.time) errors.Port['Position time'] = true;
    if (!data.position.latitude)

    if (!data.nameOfMaster.givenName) errors.Port['Master`s Given name'] = true;
    if (!data.nameOfMaster.familyName) errors.Port['Master`s Family name'] = true;
    if (!data.agent.company) errors.Port['Company name'] = true;
    if (!data.personsOnBoard.numberOfPersonsOnBoard) errors.Port['Number of persons'] = true;
}

export default generatePort;