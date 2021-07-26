const readHealthXML = (health, xml) => {
    if (xml.getElementsByTagName('PersonDied')[0]){
        health.enum1 = xml.getElementsByTagName('PersonDied')[0].value;
    }
   if (xml.getElementsByTagName('DiseaseOnBoard')[0]){
       health.enum2 = xml.getElementsByTagName('DiseaseOnBoard')[0].value;
   }
    if (xml.getElementsByTagName('IllPersonsGreaterThanExpected')[0]){
        health.enum3 = xml.getElementsByTagName('IllPersonsGreaterThanExpected')[0].value;
    }
    if (xml.getElementsByTagName('IllPersonsNow')[0]){
        health.enum4 = xml.getElementsByTagName('IllPersonsNow')[0].value;
    }
    if (xml.getElementsByTagName('MedicalConsulted')[0]){
        health.enum5 = xml.getElementsByTagName('MedicalConsulted')[0].value;
    }
    if (xml.getElementsByTagName('InfectionConditionOnBoard')[0]){
        health.enum6 = xml.getElementsByTagName('InfectionConditionOnBoard')[0].value;
    }
    if (xml.getElementsByTagName('SanitaryMeasureApplied')[0]){
        health.enum7 = xml.getElementsByTagName('SanitaryMeasureApplied')[0].value;
    }
    if ( xml.getElementsByTagName('LocationStowawaysJoinedShip')[0]){
        health.enum8 = xml.getElementsByTagName('LocationStowawaysJoinedShip')[0].value;
    }
    if (xml.getElementsByTagName('SickAnimal')[0]){
        health.enum9 = xml.getElementsByTagName('SickAnimal')[0].value;
    }
    if (xml.getElementsByTagName('NumberOfDeaths')[0]){
        health.nrOfDeath = xml.getElementsByTagName('NumberOfDeaths')[0].value;
    }
    if (xml.getElementsByTagName('NumberOfIllPersons')[0]){
        health.nrOfIll = xml.getElementsByTagName('NumberOfIllPersons')[0].value;
    }
    if (xml.getElementsByTagName('LocationStowawaysJoinedShip')[0]){
        health.joinedStowaways = xml.getElementsByTagName('LocationStowawaysJoinedShip')[0].value;
    }


    let sanitars = xml.getElementsByTagName('SanitaryMeasure');
    health.sanitaryMeasures = [];
    for (let i = 0; i < sanitars.length; i++) {
        let element = sanitars[i];
        let type = element.children.find( el => el.name === 'Type').value;
        let date = element.children.find( el => el.name === 'Date').value;
        let place = element.children.find( el => el.name === 'Place').value;
        health.sanitaryMeasures.push({type, date, place});
    }

    if (xml.getElementsByTagName('HealthParticulars')) {
        let elements = xml.getElementsByTagName('PersonHealthParticulars');
        health.illList = [];
        for (let i = 0; i < elements.length; i++) {
            let xmlEl = elements[i].children;
            console.log('Big table: ', xmlEl);

            let illItem = {};
            illItem.NR = parseInt(xmlEl.find(el => el.name === 'Number').value);
            illItem.crewPassenger = xmlEl.find(el => el.name === 'CrewOrPassenger').value
            illItem.familyName = xmlEl.find(el => el.name === 'Number').value
            illItem.firstName = xmlEl.find(el => el.name === 'Number').value
            illItem.ill = xmlEl.find(el => el.name === 'Illness').value
            illItem.symptomsDate = xmlEl.find(el => el.name === 'SymptomsDate').value
            illItem.reportedPort = xmlEl.find(el => el.name === 'ReportedToPortMedical').value
            illItem.state = xmlEl.find(el => el.name === 'State').value
            illItem.caseDisposal = xmlEl.find(el => el.name === 'CaseDisposalAndLocationOfEvaluation')
                .children.find( el => el.name === "CaseDisposal").value;
            illItem.location = xmlEl.find(el => el.name === 'CaseDisposalAndLocationOfEvaluation')
                .children.find( el => el.name === "LocationOfEvacuation").value;
            illItem.treatment = xmlEl.find(el => el.name === 'Treatment').value
            illItem.comments = xmlEl.find(el => el.name === 'Comments').value
            health.illList.push(illItem)
        }
    }

}

export default readHealthXML;