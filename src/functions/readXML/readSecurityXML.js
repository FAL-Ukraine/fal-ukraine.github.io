const readSecurityXML = (security, xml) => {
    if (xml.getElementsByTagName('ValidISSC')[0]) {
        security.validISSC = xml.getElementsByTagName('ValidISSC')[0].value;
    }
    if (xml.getElementsByTagName('ValidISSCReasonForNoValidISSC')[0]) {
        security.noValid = xml.getElementsByTagName('ValidISSCReasonForNoValidISSC')[0].value;
    }
    if (xml.getElementsByTagName('Issuer')[0]) {
        security.issued = xml.getElementsByTagName('Issuer')[0].value;
    }
    if (xml.getElementsByTagName('CertificateStatus')[0]) {
        security.isscType = xml.getElementsByTagName('CertificateStatus')[0].value;
    }
    if (xml.getElementsByTagName('ExpiryDate')[0]) {
        security.expiryDate = xml.getElementsByTagName('ExpiryDate')[0].value;
    }
    if (xml.getElementsByTagName('CurrentShipSecurityLevel')[0]) {
        security.securityLevel = xml.getElementsByTagName('CurrentShipSecurityLevel')[0].value;
    }
    if (xml.getElementsByTagName('SecurityRelatedMatterToReport')[0]) {
        security.securityRelatedMatter = xml.getElementsByTagName('SecurityRelatedMatterToReport')[0].value;
    }
    if (xml.getElementsByTagName('ValidSSC')[0]) {
        security.approvedSSP = xml.getElementsByTagName('ValidSSC')[0].value;
    }
    if (xml.getElementsByTagName('CSO')[0]) {
        security.firstName = xml.getElementsByTagName('CSO')[0].children.find(el => el.name === "Person")
            .children.find(el => el.name === 'GivenName').value;
    }
    if (xml.getElementsByTagName('CSO')[0]) {
        security.familyName = xml.getElementsByTagName('CSO')[0].children.find(el => el.name === "Person")
            .children.find(el => el.name === 'FamilyName').value;
    }
    if (xml.getElementsByTagName('CSO')[0]) {
        security.phone = xml.getElementsByTagName('CSO')[0].children.find(el => el.name === "ContactNumbers")
            .children.find(el => el.name === 'MobileTelephone').value;
    }
    if (xml.getElementsByTagName('CSO')[0]) {
        security.fax = xml.getElementsByTagName('CSO')[0].children.find(el => el.name === "ContactNumbers")
            .children.find(el => el.name === 'Telefax').value;
    }
    if (xml.getElementsByTagName('CSO')[0]) {
        security.email = xml.getElementsByTagName('CSO')[0].children.find(el => el.name === "ContactNumbers")
            .children.find(el => el.name === 'EMail').value;
    }


    if (xml.getElementsByTagName("ShipToShipActivityList")) {
        security.rows = [];
        let rows = xml.getElementsByTagName('ShipToShipActivity');
        for (let i = 0; i < rows.length; i++) {
            let row = rows[i];
            let dateFrom = row.children.find(el => el.name === 'FromDateTime').value;
            let dateDeparture = row.children.find(el => el.name === 'FromDateTime').value;
            let NR = i + 1;
            let shipActivity = row.children.find(el => el.name === 'Activity').value;
            let securityMeasure = row.children.find(el => el.name === 'AdditionalSecurityMeasures').value;
            let locationName = row.children.find(el => el.name === 'Location')
                .children.find(el => el.name === 'Name').value;
            console.log('row.children.find(el => el.name === "Location")', row.children.find(el => el.name === 'Location'))
            console.log()
            console.log()
            console.log()
            let latitude = '';
            let longitude = '';
            let port = '';
            try {
                latitude = row.children.find(el => el.name === 'Location')
                    .children.find(el => el.name === 'Position').children.find(el => el.name === 'Latitude').value;
            } catch (e) {

            }
            try {
                longitude = row.children.find(el => el.name === 'Location')
                    .children.find(el => el.name === 'Position').children.find(el => el.name === 'Longitude').value;
            } catch (e) {

            }
            try {
                port = row.children.find(el => el.name === 'Location')
                    .children.find(el => el.name === 'Port').children.find(el => el.name === 'UNLoCode').value;
            } catch (e) {

            }


            security.rows.push({
                NR,
                dateFrom,
                dateDeparture,
                shipActivity,
                securityMeasure,
                locationName,
                latitude,
                longitude,
                port
            })
        }
    }
};
export default readSecurityXML;