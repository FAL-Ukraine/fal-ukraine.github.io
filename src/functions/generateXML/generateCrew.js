const RanksOfRating = ['AbleSeaman', 'Agent', 'AsstFoodBevMngr', 'BarManager', 'BarService', 'Bosun', 'Cadet', 'Captain', 'CargoTechnician', 'CasinoStaff', 'ChiefCook', 'ChiefElectrician', 'ChiefHousekeeper', 'ChiefEngineer', 'ChiefMaster', 'ChiefMate', 'ChiefOfficer', 'ChiefPurser', 'ChiefSteward', 'ClassSurveyor', 'CSO', 'Cook', 'CraneOperator', 'CrewMember', 'CruiseDirector', 'CruiseStaff', 'DeckApprentice', 'DeckFitter', 'DeckOfficer', 'Deckhand', 'Doctor', 'Donkeyman', 'ElectricalEngineer', 'ElectricalOfficer', 'Electrician', 'EngineerCadet', 'EngineeringCrew', 'EngineFitter', 'Entertainment', 'FacilitiesCrew', 'FacilitiesManager', 'FirstAsstEngineer', 'FirstEngineer', 'FirstMate', 'FirstOfficer', 'Fitter', 'FourthOfficer', 'FoodBevMngr', 'FoodService', 'FourthAsstEngineer', 'Greaser', 'Hospitality', 'HotelDirector', 'HotelStaff', 'HousekeepingStaff', 'InformationTechnology', 'JuniorEngineer', 'LaundryMaster', 'Lifeboatman', 'Maitred', 'MarineCrew', 'MarketingRevenueMngr', 'Master', 'MasterFirstClassPilot', 'MateFirstClassPilot', 'Mechanic', 'MedicalStaff', 'Messman', 'Motorman', 'Oiler', 'Operator', 'OrdinarySeaman', 'Owner', 'Painter', 'Porter', 'Provision', 'ProvisionMaster', 'Pumpman', 'QMED', 'RadioOfficer', 'Reeferman', 'Repairman', 'RiddingCrew', 'SafetyAndSecurity', 'SecondAsstEngineer', 'SecondMate', 'SecondOfficer', 'SSO', 'StaffCaptain', 'Steward', 'Superintendent', 'Tankerman', 'ThirdAsstEngineer', 'ThirdMate', 'ThirdOfficer', 'ThirdParty', 'TruckMechanic', 'Tunnelman', 'UtilityPerson', 'VettingInspector', 'Welder', 'Wiper', 'YardPersonnel', 'Other']

export const checkRequiredCrew = (errors, data) => {
    errors.Crew = {};
    data.rows.forEach( el => {
        if (!el.Family_name) errors.Crew['Family name'] = [];
        if (!el.Given_name) errors.Crew['Given name'] = [];
        if (!el.Rank_of_rating) errors.Crew['Rank of rating'] = [];
        if (!el.date_of_birth) errors.Crew['Date of birth'] = [];
        if (!el.Country_of_birth) errors.Crew['Country of birth'] = [];
        if (!el.Place_of_birth) errors.Crew['Place of birth'] = [];

        if (!el.Nationality) errors.Crew['Nationality'] = [];
        if (!el.ID_type) errors.Crew['ID type'] = [];
        if (!el.ID_document_number) errors.Crew['ID document number'] = [];
        if (!el.Place_of_birth) errors.Crew['Place of rating'] = [];
    })
}

const generateCrew = (crew, EPCRequestBody) => {

    let rows = crew.rows;
    let CrewList = [];
    for (let i = 0; i < rows.length; i++) {
        let CrewMemberData = [];
        let RankOfRatingCode = "";
        if (rows[i].Rank_of_rating && rows[i].Rank_of_rating !== '') {
            RankOfRatingCode = RanksOfRating.indexOf(rows[i].Rank_of_rating) + 1;
        }
        if (RankOfRatingCode === 0) {
            RankOfRatingCode = "";
        }
        let nationalityCode = '';
        let countryOfBirthCode = '';
        let IssuingCode = '';
        if (rows[i].Nationality && rows[i].Nationality !== '') {
            let nationality = rows[i].Nationality.split('- ');
            nationalityCode = nationality[1];
        }
        if (rows[i].Country_of_birth && rows[i].Country_of_birth !== '') {
            let countryOfBirth = rows[i].Country_of_birth.split('- ');
            countryOfBirthCode = countryOfBirth[1];
        }

        if (rows[i].Issuing_state_of_identity_document && rows[i].Issuing_state_of_identity_document !== '') {
            let Issuing_state_of_identity_document = rows[i].Issuing_state_of_identity_document.split('- ');
            IssuingCode = Issuing_state_of_identity_document[1];
        }


        CrewMemberData.push({
            CrewIdDocument: [
                {IdDocument: rows[i].ID_type},
                {IdNumber: rows[i].ID_document_number},
                {IssuingCountry: IssuingCode},
                {ExpirationDate: rows[i].Expiry_date_of_identity_document},
            ]
        });
        CrewMemberData.push({
            Name: [
                {GivenName: rows[i].Given_name},
                {FamilyName: rows[i].Family_name},
            ]
        });
        CrewMemberData.push({Gender: rows[i].Gender});
        CrewMemberData.push({
            Duty: [
                {Code: RankOfRatingCode},
                {Text: rows[i].Rank_of_rating}
            ]
        });
        CrewMemberData.push({DateOfBirth: rows[i].date_of_birth});
        CrewMemberData.push({PlaceOfBirth: rows[i].Place_of_birth});
        CrewMemberData.push({CountryOfBirth: countryOfBirthCode});
        CrewMemberData.push({Nationality: nationalityCode});
        CrewMemberData.push({VisaNumber: rows[i].Visa_Residence_permit_number});
        CrewList.push({CrewMemberData});
    }

    EPCRequestBody.push({CrewList: CrewList})
}

export default generateCrew;