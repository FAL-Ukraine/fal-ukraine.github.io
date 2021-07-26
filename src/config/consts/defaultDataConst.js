// eslint-disable-next-line import/no-anonymous-default-export
export default {
    port: {
        arrivalDeparture: '',
        voyageNumber: '',
        ETAPortOfCall: '',
        ETDPortOfCall: '',
        ATAPortOfCall: '',
        ATDPortOfCall: '',
        callAnchorage: '',
        portOfCall: '',
        positionPortOfCall: '',
        portFacilityAtArrival: '',
        cargoDescription: '',
        airDraught: '',
        callPurpose: [''],
        portOfArrival: '',
        lastPortOfCall: '',
        nextPortOfCall: '',
        position: {
            latitude: '',
            longitude: '',
            time: ''
        },
        nameOfMaster: {
            givenName: '',
            familyName: '',
        },
        arrivalDraught: {
            foreDraught: "",
            midShipDraught: '',
            aftDraught: '',
        },
        agent: {
            company: '',
            contactNumbers: {
                businessTelephone: '',
                mobileTelephone: '',
                telefax: '',
                EMail: ''
            }
        },
        personsOnBoard: {
            numberOfPersonsOnBoard: '',
            crew: '',
            passengers: '',
        },
        stowaways: '',
        periodOfStay: '',

    },
    crew: {
        rows: [
            {"NR": 1}
        ]
    },

    ship: {
        name: '',
        iMOnumber: '',
        otherInfo: '',
        callSign: '',
        mmsiNumner: '',
        flagState: '',
        shipType: '',
        grossTonnage: '',
        netTonnage: '',
        port: '',
        issueDate: '',
        certificateNumber: '',
        companyName: '',
        iMOCompany: '',
        phone: '',
        fax: '',
        email: '',
        builtYear: '',
        deadWeight: '',
        length: '',
        beam: '',
        summerDraught: ''
    },
    passengers: {
        rows: [
            {"NR": 1}
        ]
    },
    voyage: {
        rows: [
            {"NR": 1}
        ]
    },
    shipStores: {
        rows: [
            {"NR": 1}
        ]
    },
    crewEffects: {
        rows: [
            {"NR": 1}
        ]
    },
    cargo: {
        portOfLoading: '',
        portOfDischarge: '',
        rows: [
            {"Seq": 1}
        ]
    },
    health: {
        enum1: '',
        enum2: '',
        enum3: '',
        enum4: '',
        enum5: '',
        enum6: '',
        enum7: '',
        enum8: '',
        enum9: '',
        nrOfDeath: '',
        nrOfIll: '',
        joinedStowaways: '',
        sanitaryMeasures: [{}],
        illList: [{}]
    },
    security: {
        validISSC: '',
        noValid: '',
        issued: '',
        expiryDate: '',
        isscType: '',
        securityLevel: "",
        securityRelatedMatter: '',
        approvedSSP: '',
        firstName: '',
        familyName: '',
        phone: '',
        fax: '',
        email: '',
        rows: [{NR: 1}]
    },
    dpg: {
        rows: [
            {}
        ]
    },
    waste: {
        WasteDeliveryStatus:'',
        LastPortDelivered:'',
        LastPortDeliveredDate:'',
        rows: [
            {NR: 1}
        ]
    },
}
