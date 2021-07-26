const readCrewEffectsXML = (crewEffects, xml) => {
    let DutiableCrewEffect = xml.getElementsByTagName('DutiableCrewEffect');
    crewEffects.rows = [];
    if (DutiableCrewEffect.length > 0) {
        for (let i = 0; i < DutiableCrewEffect[0].children.length; i++) {
            let CrewEffectItem = DutiableCrewEffect[0].children[i];
            console.log("CrewEffectItem ",CrewEffectItem)
            let measurement = CrewEffectItem.children[4];
            let content = '';
            let unitCode = '';
            if (measurement) {
                content = measurement.children[0].value;
                unitCode = measurement.children[1].value;
            }
            if (CrewEffectItem) {
                let row = {
                    NR: CrewEffectItem.children[0].value,
                    Family_name: CrewEffectItem.children[1].children[1].value,
                    Given_name: CrewEffectItem.children[1].children[0].value,
                    Rank_of_rating: CrewEffectItem.children[2].children[1].value,
                    Effects_description: CrewEffectItem.children[3].value,
                    Quantity: content,
                    Unit: unitCode,
                }
                crewEffects.rows.push(row)
            }

        }
    }
};

export default readCrewEffectsXML;