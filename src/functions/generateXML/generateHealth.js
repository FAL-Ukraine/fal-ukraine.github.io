export const checkRequiredHealth = (errors, data) => {
    errors.Health = {};

    data.illList.forEach(el => {
        if (!el.NR) errors.Health['NR'] = [];
        if (!el.crewPassenger) errors.Health['Crew or passenger'] = [];
    });

}
const generateHealth = (data, EPCRequestBody) => {

    let Health = [];
    Health.push({PersonDied: data.enum1});
    Health.push({NumberOfDeaths: data.nrOfDeath});
    Health.push({DiseaseOnBoard: data.enum2});
    Health.push({IllPersonsGreaterThanExpected: data.enum3});
    Health.push({NumberOfIllPersons: data.nrOfIll});
    Health.push({IllPersonsNow: data.enum4});
    Health.push({MedicalConsulted: data.enum5});
    Health.push({InfectionConditionOnBoard: data.enum6});
    Health.push({SanitaryMeasureApplied: data.enum7});
    Health.push({LocationStowawaysJoinedShip: data.enum8});
    Health.push({LocationStowawaysJoinedShip: data.joinedStowaways});
    Health.push({SickAnimal: data.enum9});

    //TODO ADD THE for cycle after it's arranged with the client
    let SanitaryMeasures = [];
    for (let i = 0; i < data.sanitaryMeasures.length; i++) {
        let SanitaryMeasure = [];
        SanitaryMeasure.push({Type: data.sanitaryMeasures[i].type})
        SanitaryMeasure.push({Place: data.sanitaryMeasures[i].place})
        SanitaryMeasure.push({Date: data.sanitaryMeasures[i].date})
        SanitaryMeasures.push({SanitaryMeasure})
    }

    Health.push({SanitaryMeasures})

    let HealthParticulars = [];
    for (let i = 0; i < data.illList.length; i++) {
        let ill = data.illList[i];

        let PersonHealthParticulars = [];

        PersonHealthParticulars.push({Number: ill.NR});
        PersonHealthParticulars.push({CrewOrPassenger: ill.crewPassenger});
        PersonHealthParticulars.push({Illness: ill.ill});
        PersonHealthParticulars.push({Number: ill.NR});
        PersonHealthParticulars.push({SymptomsDate: ill.symptomsDate});
        PersonHealthParticulars.push({ReportedToPortMedical: ill.reportedPort});
        PersonHealthParticulars.push({State: ill.state});
        PersonHealthParticulars.push({
            CaseDisposalAndLocationOfEvaluation: [
                {CaseDisposal: ill.caseDisposal},
                {LocationOfEvacuation: ill.location}
            ]
        });
        PersonHealthParticulars.push({Treatment: ill.treatment});
        PersonHealthParticulars.push({Comments: ill.comments});
        HealthParticulars.push({PersonHealthParticulars});
    }

    //Saving to parent
    EPCRequestBody.push({Health})
    EPCRequestBody.push({HealthParticulars});
}

export default generateHealth;