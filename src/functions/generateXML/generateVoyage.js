import listOfPortsConst from "../../config/JSON/listOfPorts";

export const checkRequiredVoyage = (errors, data) => {
    errors.Voyage = {};

    data.rows.forEach(el => {
        if (!el.Port) errors.Voyage.Port = [];
    });

}

const generateVoyage = (voyage, EPCRequestBody) => {

    let rows = voyage.rows;
    let PortCalls = [];
    for (let i = 0; i < rows.length; i++) {
        let PortCall = [];
        let port = {};
        if (rows[i].Port && rows[i].Port !== '') {
            let PortCode = rows[i].Port.split(' -')[0]
            port = listOfPortsConst.find(function (element) {
                return element.code === PortCode;
            });
        }

        PortCall.push({FromDateTime: rows[i].Date_of_arrival});
        PortCall.push({ToDateTime: rows[i].Date_of_departure});
        if (port) {
            PortCall.push({
                Port: [
                    {Name: port.name},
                    {Facility: rows[i].Port_facility},
                    {CountryCode: port.countryCode},
                    {UNLoCode: port.code},
                ]
            })
        }

        PortCall.push({PortSecurityLevel: rows[i].Security_level});
        PortCall.push({AdditionalSecurityMeasures: rows[i].Security_measures});

        PortCalls.push({PortCall});
    }

    EPCRequestBody.push({PortCalls: PortCalls})
};

export default generateVoyage;