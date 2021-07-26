const readVoyageXML = (voyage, xml) => {
    let PortCalls = xml.getElementsByTagName('PortCalls');
    voyage.rows = [];
    console.log("PortCalls ", PortCalls)
    if (PortCalls.length > 0) {
        for (let i = 0; i < PortCalls[0].children.length; i++) {
            let PortCall = PortCalls[0].children[i]
            if (PortCall) {

                let port = '';
                if (PortCall.children[2]) {
                    port = PortCall.children[2].children[3].value + ' - ' + PortCall.children[2].children[2].value + ' - ' + PortCall.children[2].children[0].value;
                }

                // console.log("PortCall ", PortCall)
                let row = {
                    NR: i + 1,
                    Date_of_arrival: PortCall.children[0].value,
                    Date_of_departure: PortCall.children[1].value,
                    Port: port,
                    Port_facility: PortCall.children[2].children[1].value,
                    Security_level: PortCall.children[3].value,
                    Security_measures: PortCall.children[4].value
                }

                voyage.rows.push(row)
            }

        }
    }
};

export default readVoyageXML;