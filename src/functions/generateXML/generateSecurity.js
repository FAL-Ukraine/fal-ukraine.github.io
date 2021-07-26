import listOfPortsConst from "../../config/JSON/listOfPorts";

export const checkRequiredSecurity = (errors, data) => {
    errors.Security = {};

    data.rows.forEach(el => {
        if (!el.shipActivity) errors.Security['Activity'] = [];
        if (!el.dateFrom) errors.Security['Date from'] = [];
        if (!el.dateDeparture) errors.Security['Date departure'] = [];
        if (!el.locationName) errors.Security['Location'] = [];
    })
}
const generateSecurity = (security, EPCRequestBody) => {
    EPCRequestBody.push({ValidISSC: security.validISSC});
    EPCRequestBody.push({ValidISSCReasonForNoValidISSC: security.noValid});
    EPCRequestBody.push({
        ISSCertificate: [
            {CertificateStatus: security.isscType},
            {Issuer: security.issued},
            {ExpiryDate: security.expiryDate},
        ]
    });
    EPCRequestBody.push({CurrentShipSecurityLevel: security.securityLevel});
    EPCRequestBody.push({SecurityRelatedMatterToReport: security.securityRelatedMatter});
    EPCRequestBody.push({ValidSSC: security.approvedSSP});
    EPCRequestBody.push({
        CSO: [{
            ContactNumbers: [
                {MobileTelephone: security.phone},
                {Telefax: security.fax},
                {EMail: security.email}
            ]
        }, {
            Person: [
                {GivenName: security.firstName},
                {FamilyName: security.familyName}
            ]
        }
        ]
    });

    let ShipToShipActivityList = [];

    for (let i = 0; i < security.rows.length; i++) {
        let row = security.rows[i];
        let ShipToShipActivity = [];
        ShipToShipActivity.push({FromDateTime: row.dateFrom});
        ShipToShipActivity.push({ToDateTime: row.dateDeparture});
        ShipToShipActivity.push({Activity: row.shipActivity});
        ShipToShipActivity.push({AdditionalSecurityMeasures: row.securityMeasure});
        let port = listOfPortsConst.find(el => el.code === row.port);

        ShipToShipActivity.push({
            Location: [
                {Name: row.locationName},
                {
                    Position: [
                        {Latitude: row.latitude},
                        {Longitude: row.longitude}
                    ]
                }
            ]
        });
        if (port) {
            ShipToShipActivity.push({
                Port: [
                    {Name: port.name},
                    {Facility: port.facility},
                    {CountryCode: port.countryCode},
                    {UNLoCode: port.code}
                ]
            })
        }

        ShipToShipActivityList.push({ShipToShipActivity});
    }
    EPCRequestBody.push({ShipToShipActivityList})

}

export default generateSecurity;