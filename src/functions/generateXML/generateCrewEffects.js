const RanksOfRating = ['AbleSeaman', 'Agent', 'AsstFoodBevMngr', 'BarManager', 'BarService', 'Bosun', 'Cadet', 'Captain', 'CargoTechnician', 'CasinoStaff', 'ChiefCook', 'ChiefElectrician', 'ChiefHousekeeper', 'ChiefEngineer', 'ChiefMaster', 'ChiefMate', 'ChiefOfficer', 'ChiefPurser', 'ChiefSteward', 'ClassSurveyor', 'CSO', 'Cook', 'CraneOperator', 'CrewMember', 'CruiseDirector', 'CruiseStaff', 'DeckApprentice', 'DeckFitter', 'DeckOfficer', 'Deckhand', 'Doctor', 'Donkeyman', 'ElectricalEngineer', 'ElectricalOfficer', 'Electrician', 'EngineerCadet', 'EngineeringCrew', 'EngineFitter', 'Entertainment', 'FacilitiesCrew', 'FacilitiesManager', 'FirstAsstEngineer', 'FirstEngineer', 'FirstMate', 'FirstOfficer', 'Fitter', 'FourthOfficer', 'FoodBevMngr', 'FoodService', 'FourthAsstEngineer', 'Greaser', 'Hospitality', 'HotelDirector', 'HotelStaff', 'HousekeepingStaff', 'InformationTechnology', 'JuniorEngineer', 'LaundryMaster', 'Lifeboatman', 'Maitred', 'MarineCrew', 'MarketingRevenueMngr', 'Master', 'MasterFirstClassPilot', 'MateFirstClassPilot', 'Mechanic', 'MedicalStaff', 'Messman', 'Motorman', 'Oiler', 'Operator', 'OrdinarySeaman', 'Owner', 'Painter', 'Porter', 'Provision', 'ProvisionMaster', 'Pumpman', 'QMED', 'RadioOfficer', 'Reeferman', 'Repairman', 'RiddingCrew', 'SafetyAndSecurity', 'SecondAsstEngineer', 'SecondMate', 'SecondOfficer', 'SSO', 'StaffCaptain', 'Steward', 'Superintendent', 'Tankerman', 'ThirdAsstEngineer', 'ThirdMate', 'ThirdOfficer', 'ThirdParty', 'TruckMechanic', 'Tunnelman', 'UtilityPerson', 'VettingInspector', 'Welder', 'Wiper', 'YardPersonnel', 'Other']
export const checkRequiredCrewEffects = (errors, data) => {
    errors.Crew_effects = {};

    data.rows.forEach(el => {
        if (!el.NR) errors.Crew_effects['NR'] = [];
        if (!el.Effects_description) errors.Crew_effects['Effects description'] = [];
    });

}
const generateCrewEffects = (crewEffects, EPCRequestBody) => {

    let rows = crewEffects.rows;
    let DutiableCrewEffect = [];
    for (let i = 0; i < rows.length; i++) {
        let CrewEffectItem = [];
        let RankOfRatingCode = "";
        if (rows[i].Rank_of_rating && rows[i].Rank_of_rating !== '') {
            RankOfRatingCode = RanksOfRating.indexOf(rows[i].Rank_of_rating) + 1;
        }
        if (RankOfRatingCode === 0) {
            RankOfRatingCode = "";
        }

        CrewEffectItem.push({CrewReference: rows[i].NR});
        CrewEffectItem.push({
            Name: [
                {GivenName: rows[i].Given_name},
                {FamilyName: rows[i].Family_name},
            ]
        });
        CrewEffectItem.push({
            Duty: [
                {Code: RankOfRatingCode},
                {Text: rows[i].Rank_of_rating}
            ]
        });
        CrewEffectItem.push({EffectDescription: rows[i].Effects_description});
        CrewEffectItem.push({
            Measurement: [
                {Content: rows[i].Quantity},
                {UnitCode: rows[i].Unit}
            ]
        });
        DutiableCrewEffect.push({CrewMemberData: CrewEffectItem});
    }

    EPCRequestBody.push({DutiableCrewEffect: DutiableCrewEffect})
}

export default generateCrewEffects;