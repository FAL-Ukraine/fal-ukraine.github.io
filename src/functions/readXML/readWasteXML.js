const readWasteXML = (waste, xml) => {
    let WasteInformation = xml.getElementsByTagName('WasteInformation');
    waste.rows = [];
    try {

        try {
            waste.LastPortDelivered = WasteInformation[0].children.find(el => el.name === "LastPortDelivered").children.find(el => el.name === 'Port').children.find(el => el.name === 'UNLoCode').value;
        } catch (e) {
            waste.LastPortDelivered = '';
        }

        waste.WasteDeliveryStatus = WasteInformation[0].children.find(el => el.name === "WasteDeliveryStatus").value;
        waste.LastPortDeliveredDate = WasteInformation[0].children.find(el => el.name === "LastPortDeliveredDate").value;

        let WasteDisposalInformation = xml.getElementsByTagName('WasteDisposalInformation');
        if (WasteDisposalInformation.length > 0) {
            for (let i = 0; i < WasteDisposalInformation.length; i++) {
                let information = WasteDisposalInformation[i];
                if (information) {
                    try {
                        let Seq = i + 1;
                        let WasteType = information.children.find(el => el.name === "WasteType").children[0].value + " : " + information.children.find(el => el.name === "WasteType").children[1].value;
                        let WasteToBeDelivered = information.children.find(el => el.name === "ToBeDelivered").value;
                        let MaxStorage = information.children.find(el => el.name === "MaxStorage").value;
                        let WasteAmount = information.children.find(el => el.name === "RetainedOnboard").value;
                        let EstimatedWaste = information.children.find(el => el.name === "EstimateGenerated").value;
                        let PortOfDelivery = information.children.find(el => el.name === "DisposedOfInPort").children.find(el => el.name === 'UNLoCode').value + " - " + information.children.find(el => el.name === "DisposedOfInPort").children.find(el => el.name === 'CountryCode').value + " - " + information.children.find(el => el.name === "DisposedOfInPort").children.find(el => el.name === 'Name').value;
                        ;
                        let row = {
                            NR: Seq,
                            WasteToBeDelivered: WasteToBeDelivered,
                            WasteType: WasteType,
                            MaxStorage: MaxStorage,
                            WasteAmount: WasteAmount,
                            EstimatedWaste: EstimatedWaste,
                            PortOfDelivery: PortOfDelivery,
                        }

                        waste.rows.push(row)
                    } catch (e) {
                        console.log(e)
                    }
                }

            }
        }
    } catch (e) {
        console.log(e)
    }

};

export default readWasteXML;