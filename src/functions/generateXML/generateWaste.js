import ListOfPorts from "../../config/JSON/listOfPorts";

export const checkRequiredWaste = (errors, data) => {
    errors.Waste = {};

    if (!data.WasteDeliveryStatus) errors.Waste['Are you delivering all,some or none\n' +
    'of your waste into port reception facility'] = true;
    data.rows.forEach(el => {
        if (!el.WasteType) errors.Waste['Waste Type'] = [];
        if (!el.WasteToBeDelivered) errors.Waste['Waste to be delivered(m3)'] = [];
    })
}
const generateWaste = (waste, EPCRequestBody) => {
    let WasteInformation = [];
    let rows = waste.rows;
    let lastPortDelivered = ListOfPorts.find(function (element) {
        return element.code === waste.LastPortDelivered;
    });


    WasteInformation.push({WasteDeliveryStatus: waste.WasteDeliveryStatus});
    WasteInformation.push({
        LastPortDelivered: [
            {
                Port: [
                    {Name: lastPortDelivered.name},
                    {CountryCode: lastPortDelivered.countryCode},
                    {UNLoCode: lastPortDelivered.code}
                ]
            }]
    });
    WasteInformation.push({LastPortDeliveredDate: waste.LastPortDeliveredDate});
    for (let i = 0; i < rows.length; i++) {
        let WasteDisposalInformation = [];
        let PortOfDelivery = {};
        if (rows[i].PortOfDelivery && rows[i].PortOfDelivery !== '') {
            let DeliveryPortCode = rows[i].PortOfDelivery.split(' -')[0]
            PortOfDelivery = ListOfPorts.find(function (element) {
                return element.code === DeliveryPortCode;
            });
        }
        let wasteTypeCode = '';
        let wasteTypeDescription = '';
        if (rows[i].WasteType && rows[i].WasteType !== '' && rows[i].WasteType !== '[Waste type]') {
            let wasteType = rows[i].WasteType.split(" : ");
            wasteTypeCode = wasteType[0];
            wasteTypeDescription = wasteType[1];
        }

        WasteDisposalInformation.push({
            WasteType: [
                {Code: wasteTypeCode},
                {Description: wasteTypeDescription},
            ]
        });
        WasteDisposalInformation.push({ToBeDelivered: rows[i].WasteToBeDelivered});
        WasteDisposalInformation.push({MaxStorage: rows[i].MaxStorage});
        WasteDisposalInformation.push({RetainedOnboard: rows[i].WasteAmount});
        WasteDisposalInformation.push({EstimateGenerated: rows[i].EstimatedWaste});
        if (PortOfDelivery && PortOfDelivery !== {}) {
            WasteDisposalInformation.push({
                DisposedOfInPort: [
                    {Name: PortOfDelivery.name},
                    {CountryCode: PortOfDelivery.countryCode},
                    {UNLoCode: PortOfDelivery.code},
                ]
            })
        }


        WasteInformation.push({WasteDisposalInformation: WasteDisposalInformation});
    }

    EPCRequestBody.push({WasteInformation: WasteInformation})
};

export default generateWaste;