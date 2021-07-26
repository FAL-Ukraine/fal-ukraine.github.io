const generateShipStores = (shipStores, EPCRequestBody) => {

    let rows = shipStores.rows;
    let ShipStore = [];
    for (let i = 0; i < rows.length; i++) {
        let StoreItem = [];

        StoreItem.push({Description: rows[i].Name_of_article});
        StoreItem.push({LocationOfStorage: rows[i].Location_on_board});
        StoreItem.push({
            Measurement: [
                {Content: rows[i].Quantity},
                {UnitCode: rows[i].Unit}
            ]
        });


        ShipStore.push({StoreItem: StoreItem});
    }

    EPCRequestBody.push({ShipStore: ShipStore})
}
export default generateShipStores