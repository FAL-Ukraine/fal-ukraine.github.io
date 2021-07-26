import listOfPortsConst from "../../config/JSON/listOfPorts";

export const checkRequiredShip = (errors, data) => {
    errors.Ships = {};
    if (!data.port) errors.Ships['Port'] = true;
    if (!data.issueDate)  errors.Ships['Date of issue'] = true;
    if (!data.certificateNumber)  errors.Ships['Number'] = true;
}

const generateShip = (ship, EPCRequestBody) => {
    let shipPort = listOfPortsConst.find(el => el.code === ship.port)
    EPCRequestBody.push({
        ShipID: [
            {ShipName: ship.name},
            {IMONumber: ship.iMOnumber},
            {MMSINumber: ship.mmsiNumner},
            {CallSign: ship.callSign},
            {Comment: ship.otherInfo},
        ]
    });
    EPCRequestBody.push({FlagState: ship.flagState});
    // @FIXME SHIP TYPE!
    EPCRequestBody.push({Beam: ship.beam});
    EPCRequestBody.push({YearOfBuilt: ship.builtYear});
    EPCRequestBody.push({DeadWeight: ship.deadWeight})
    EPCRequestBody.push({LengthOverall: ship.length})
    EPCRequestBody.push({GrossTonnage: ship.grossTonnage})
    EPCRequestBody.push({NetTonnage: ship.netTonnage})
    EPCRequestBody.push({ShipTypeContent: ship.shipType})
    EPCRequestBody.push({SummerDraught: ship.summerDraught})
    EPCRequestBody.push({
            RegistryCertificate: [
                {
                    IssueLocation: [
                        {Name: shipPort.name},
                        {CountryCode: shipPort.countryCode},
                        {UNLoCode: shipPort.code}
                    ]
                },
                {IssueDate: ship.issueDate},
                {Number: ship.certificateNumber}
            ]
        },
        {
            Company: [
                {
                    Organisation: [
                        {Name: ship.companyName}
                    ]
                },
                {
                    Contact: [
                        {
                            ContactNumbers: [
                                {BusinessTelephone: ship.phone},
                                {Telefax: ship.fax},
                                {EMail: ship.email}
                            ]
                        }]
                },
                {IMOCompanyId: ship.iMOCompany}
            ]
        })
};

export default generateShip;