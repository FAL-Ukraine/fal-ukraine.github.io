const readShipStoresXML = (shipStores, xml)=> {
    let ShipStore = xml.getElementsByTagName('ShipStore');
    shipStores.rows = [];
    if (ShipStore.length > 0) {
        for (let i = 0; i < ShipStore[0].children.length; i++) {
            let StoreItem = ShipStore[0].children[i]
            if (StoreItem) {
                let measurement = StoreItem.children[2];
                let content = '';
                let unitCode = '';
                if (measurement) {
                    content = measurement.children[0].value;
                    unitCode = measurement.children[1].value;
                }

                let row = {
                    NR: i + 1,
                    Name_of_article: StoreItem.children[0].value,
                    Location_on_board: StoreItem.children[1].value,
                    Quantity: content,
                    Unit: unitCode,
                }

                shipStores.rows.push(row)
                console.log("shipStores ",shipStores)
            }

        }
    }
}
export default readShipStoresXML;