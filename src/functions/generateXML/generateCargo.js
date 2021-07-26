import listOfPortsConst from "../../config/JSON/listOfPorts";

export const checkRequiredCargo = (errors, data) => {
    errors.Cargo = {};

    data.rows.forEach(el => {
        if (!el.Transport_unit) errors.Cargo['Transport unit(Container number)'] = [];
    })
}

export const checkRequiredDangerous = (errors, data) => {
    errors.Dangerous_goods = {};

    data.rows.forEach(el => {
        if (!el.Textual_reference) errors.Dangerous_goods['Textual reference'] = [];
        if (!el.DG_Classification) errors.Dangerous_goods['DG Classification'] = [];
    })
}

const generateCargo = (cargo, dpg, EPCRequestBody) => {
    let Consignment = [];
    let rows = cargo.rows;
    let dpgRows = dpg.rows;
    let portOfLoading = listOfPortsConst.find(function (element) {
        return element.code === cargo.portOfLoading;
    });
    let portOfDischarge = listOfPortsConst.find(function (element) {
        return element.code === cargo.portOfDischarge;
    });

    Consignment.push({
        PortOfLoading: [
            {
                Port: [
                    {Name: portOfLoading.name},
                    {CountryCode: portOfLoading.countryCode},
                    {UNLoCode: portOfLoading.code}
                ]
            }]
    });
    Consignment.push({
        PortOfDischarge: [
            {
                Port: [
                    {Name: portOfDischarge.name},
                    {CountryCode: portOfDischarge.countryCode},
                    {UNLoCode: portOfDischarge.code}
                ]
            }]
    });
    for (let i = 0; i < rows.length; i++) {
        let CargoItem = [];

        CargoItem.push({ItemNumber: rows[i].Seq});
        CargoItem.push({ShippingMarks: rows[i].Shipping_marks});
        CargoItem.push({NoOfPackages: rows[i].Number_of_packages});
        CargoItem.push({PackageType: rows[i].Kind_of_packages});
        CargoItem.push({
            GrossQuantity: [
                {Content: rows[i].Gross_quantity},
                {UnitCode: rows[i].Gross_Unit}
            ]
        });
        CargoItem.push({
            NetQuantity: [
                {Content: rows[i].Net_quantity},
                {UnitCode: rows[i].Net_Unit}
            ]
        });
        CargoItem.push({
            GoodsType: [
                {HSCode: rows[i].HS_code},
                {Description: rows[i].Description_of_goods}
            ]
        });
        CargoItem.push({
            Measurement: [
                {Content: rows[i].Measurement},
                {UnitCode: rows[i].Measurement_Unit}
            ]
        });
        CargoItem.push({CustomStatus: rows[i].Custom_status});
        let dpgTable = dpgRows.find(function (element) {
            return parseInt(element.Seq) === parseInt(rows[i].Seq);
        });


        if (dpgTable) {
            CargoItem.push({
                DGSafetyDataSheet: [
                    {ProperShippingName: dpgTable.Textual_reference},
                    {DGClassification: dpgTable.DG_Classification},
                    {UNNumber: dpgTable.UN_number},
                    {UNClass: dpgTable.IMO_hazard_classes},
                    {PackingGroup: dpgTable.Packing_group},
                    {SubsidiaryRisks: dpgTable.Subsidiary_risk},
                    {FlashPoint: dpgTable.Flash_point},
                    {MARPOLPollutionCode: dpgTable.pollution_code},
                    {EmergencyInstruction: dpgTable.EmS},
                    {SegregationInformation: dpgTable.Segregation_information},
                    {OnBoardLocation: dpgTable.On_board_location},
                    {Comment: dpgTable.Additional_information},
                ]
            })
        }

        CargoItem.push({
            Container: [
                {MarksAndNumber: rows[i].Transport_unit},
                {SizeAndType: rows[i].Size_and_type},
                {SealNumber: rows[i].Seal_number},
            ]
        });
        Consignment.push({CargoItem: CargoItem});
    }
    Consignment.push({CargoItemListSize: rows.length});

    EPCRequestBody.push({CargoConsignmentsData: [{Consignment: Consignment}]})
};

export default generateCargo;