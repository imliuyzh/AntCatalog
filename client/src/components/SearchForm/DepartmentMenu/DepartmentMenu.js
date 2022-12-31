import makeAnimated from 'react-select/animated';
import Select from 'react-select';
import { styles1 } from '../../../utils/searchFormStyles';
import { updateFormInput } from '../../../features/internalStateSlice';
import { useDispatch } from 'react-redux';
import * as React from 'react';

const animatedComponents = makeAnimated();

const DEPARTMENTS = [
    {
        "value": "AC ENG",
        "label": "AC ENG . . . . . .Academic English"
    },
    {
        "value": "AFAM",
        "label": "AFAM . . . . . . . African American Studies"
    },
    {
        "value": "ANATOMY",
        "label": "ANATOMY . . . .Anatomy and Neurobiology"
    },
    {
        "value": "ANESTH",
        "label": "ANESTH . . . . . Anesthesiology"
    },
    {
        "value": "ANTHRO",
        "label": "ANTHRO . . . . . Anthropology"
    },
    {
        "value": "ARABIC",
        "label": "ARABIC . . . . . .Arabic"
    },
    {
        "value": "ARMN",
        "label": "ARMN . . . . . . .Armenian"
    },
    {
        "value": "ART",
        "label": "ART . . . . . . . . .Art"
    },
    {
        "value": "ART HIS",
        "label": "ART HIS . . . . . .Art History"
    },
    {
        "value": "ARTS",
        "label": "ARTS . . . . . . . Arts"
    },
    {
        "value": "ARTSHUM",
        "label": "ARTSHUM . . . . Arts and Humanities"
    },
    {
        "value": "ASIANAM",
        "label": "ASIANAM . . . . Asian American Studies"
    },
    {
        "value": "BANA",
        "label": "BANA . . . . . . . Business Analytics"
    },
    {
        "value": "BATS",
        "label": "BATS . . . . . . . Biomedical and Translational Science"
    },
    {
        "value": "BIO SCI",
        "label": "BIO SCI . . . . . .Biological Sciences"
    },
    {
        "value": "BIOCHEM",
        "label": "BIOCHEM . . . . Biological Chemistry"
    },
    {
        "value": "BME",
        "label": "BME . . . . . . . . Biomedical Engineering"
    },
    {
        "value": "BSEMD",
        "label": "BSEMD . . . . . .Bio Sci & Educational Media Design"
    },
    {
        "value": "CAMPREC",
        "label": "CAMPREC . . . .Campus Recreation"
    },
    {
        "value": "CBE",
        "label": "CBE . . . . . . . . Chemical and Biomolecular Engineering"
    },
    {
        "value": "CBEMS",
        "label": "CBEMS . . . . . .Chemical Engr and Materials Science"
    },
    {
        "value": "CEM",
        "label": "CEM . . . . . . . . Community and Environmental Medicine"
    },
    {
        "value": "CHC/LAT",
        "label": "CHC/LAT . . . . . Chicano Latino"
    },
    {
        "value": "CHEM",
        "label": "CHEM . . . . . . .Chemistry"
    },
    {
        "value": "CHINESE",
        "label": "CHINESE . . . . .Chinese"
    },
    {
        "value": "CLASSIC",
        "label": "CLASSIC . . . . .Classics"
    },
    {
        "value": "CLT&THY",
        "label": "CLT&THY . . . . .Culture & Theory"
    },
    {
        "value": "COGS",
        "label": "COGS . . . . . . . Cognitive Sciences"
    },
    {
        "value": "COM LIT",
        "label": "COM LIT . . . . . Comparative Literature"
    },
    {
        "value": "COMPSCI",
        "label": "COMPSCI . . . . Computer Science"
    },
    {
        "value": "CRITISM",
        "label": "CRITISM . . . . . Criticism"
    },
    {
        "value": "CRM/LAW",
        "label": "CRM/LAW . . . . Criminology, Law and Society"
    },
    {
        "value": "CSE",
        "label": "CSE . . . . . . . . Computer Science and Engineering"
    },
    {
        "value": "DANCE",
        "label": "DANCE . . . . . . Dance"
    },
    {
        "value": "DATA",
        "label": "DATA . . . . . . . Data Science"
    },
    {
        "value": "DERM",
        "label": "DERM . . . . . . .Dermatology"
    },
    {
        "value": "DEV BIO",
        "label": "DEV BIO . . . . . Developmental and Cell Biology"
    },
    {
        "value": "DRAMA",
        "label": "DRAMA . . . . . .Drama"
    },
    {
        "value": "E ASIAN",
        "label": "E ASIAN . . . . . East Asian Languages and Literatures"
    },
    {
        "value": "EARTHSS",
        "label": "EARTHSS . . . . Earth System Science"
    },
    {
        "value": "EAS",
        "label": "EAS . . . . . . . . East Asian Studies"
    },
    {
        "value": "ECO EVO",
        "label": "ECO EVO . . . . Ecology and Evolutionary Biology"
    },
    {
        "value": "ECON",
        "label": "ECON . . . . . . . Economics"
    },
    {
        "value": "ECPS",
        "label": "ECPS . . . . . . . Embedded and Cyber-Physical Systems"
    },
    {
        "value": "ED AFF",
        "label": "ED AFF . . . . . .Educational Affairs (Sch of Med)"
    },
    {
        "value": "EDUC",
        "label": "EDUC . . . . . . . Education"
    },
    {
        "value": "EECS",
        "label": "EECS . . . . . . . Electrical Engineering & Computer Science"
    },
    {
        "value": "EHS",
        "label": "EHS . . . . . . . . Environmental Health Sciences"
    },
    {
        "value": "ENGLISH",
        "label": "ENGLISH . . . . .English"
    },
    {
        "value": "ENGR",
        "label": "ENGR . . . . . . . Engineering"
    },
    {
        "value": "ENGRCEE",
        "label": "ENGRCEE . . . .Engineering, Civil and Environmental"
    },
    {
        "value": "ENGRMAE",
        "label": "ENGRMAE . . . .Engineering, Mechanical and Aerospace"
    },
    {
        "value": "ENGRMSE",
        "label": "ENGRMSE . . . .Materials Science and Engineering"
    },
    {
        "value": "EPIDEM",
        "label": "EPIDEM . . . . . .Epidemiology"
    },
    {
        "value": "ER MED",
        "label": "ER MED . . . . . Emergency Medicine"
    },
    {
        "value": "EURO ST",
        "label": "EURO ST . . . . .European Studies"
    },
    {
        "value": "FAM MED",
        "label": "FAM MED . . . . Family Medicine"
    },
    {
        "value": "FIN",
        "label": "FIN . . . . . . . . . Finance"
    },
    {
        "value": "FLM&MDA",
        "label": "FLM&MDA . . . .Film and Media Studies"
    },
    {
        "value": "FRENCH",
        "label": "FRENCH . . . . . French"
    },
    {
        "value": "GDIM",
        "label": "GDIM . . . . . . . .Game Design and Interactive Media"
    },
    {
        "value": "GEN&SEX",
        "label": "GEN&SEX . . . . Gender and Sexuality Studies"
    },
    {
        "value": "GERMAN",
        "label": "GERMAN . . . . .German"
    },
    {
        "value": "GLBL ME",
        "label": "GLBL ME . . . . .Global Middle East Studies"
    },
    {
        "value": "GLBLCLT",
        "label": "GLBLCLT . . . . .Global Cultures"
    },
    {
        "value": "GREEK",
        "label": "GREEK . . . . . . Greek"
    },
    {
        "value": "HEBREW",
        "label": "HEBREW . . . . .Hebrew"
    },
    {
        "value": "HINDI",
        "label": "HINDI . . . . . . . .Hindi"
    },
    {
        "value": "HISTORY",
        "label": "HISTORY . . . . .History"
    },
    {
        "value": "HUMAN",
        "label": "HUMAN . . . . . .Humanities"
    },
    {
        "value": "HUMARTS",
        "label": "HUMARTS . . . . Humanities and Arts"
    },
    {
        "value": "I&C SCI",
        "label": "I&C SCI . . . . . . Information and Computer Science"
    },
    {
        "value": "IN4MATX",
        "label": "IN4MATX . . . . . Informatics"
    },
    {
        "value": "INNO",
        "label": "INNO . . . . . . . .Masters of Innovation and Entrepreneurship"
    },
    {
        "value": "INT MED",
        "label": "INT MED . . . . . Internal Medicine"
    },
    {
        "value": "INTL ST",
        "label": "INTL ST . . . . . . International Studies"
    },
    {
        "value": "IRAN",
        "label": "IRAN . . . . . . . .Iranian"
    },
    {
        "value": "ITALIAN",
        "label": "ITALIAN . . . . . .Italian"
    },
    {
        "value": "JAPANSE",
        "label": "JAPANSE . . . . Japanese"
    },
    {
        "value": "KOREAN",
        "label": "KOREAN . . . . .Korean"
    },
    {
        "value": "LATIN",
        "label": "LATIN . . . . . . . Latin"
    },
    {
        "value": "LAW",
        "label": "LAW . . . . . . . . Law"
    },
    {
        "value": "LINGUIS",
        "label": "LINGUIS . . . . . .Linguistics"
    },
    {
        "value": "LIT JRN",
        "label": "LIT JRN . . . . . . Literary Journalism"
    },
    {
        "value": "LPS",
        "label": "LPS . . . . . . . . .Logic and Philosophy of Science"
    },
    {
        "value": "LSCI",
        "label": "LSCI . . . . . . . . Language Science"
    },
    {
        "value": "M&MG",
        "label": "M&MG . . . . . . .Microbiology and Molecular Genetics"
    },
    {
        "value": "MATH",
        "label": "MATH . . . . . . . Mathematics"
    },
    {
        "value": "MED",
        "label": "MED . . . . . . . . Medicine"
    },
    {
        "value": "MED ED",
        "label": "MED ED . . . . . Medical Education"
    },
    {
        "value": "MED HUM",
        "label": "MED HUM . . . . Medical Humanities"
    },
    {
        "value": "MGMT",
        "label": "MGMT . . . . . . .Management"
    },
    {
        "value": "MGMT EP",
        "label": "MGMT EP . . . . Executive MBA"
    },
    {
        "value": "MGMT FE",
        "label": "MGMT FE . . . . Fully Employed MBA"
    },
    {
        "value": "MGMT HC",
        "label": "MGMT HC . . . . Health Care MBA"
    },
    {
        "value": "MGMTMBA",
        "label": "MGMTMBA . . . Management MBA"
    },
    {
        "value": "MGMTPHD",
        "label": "MGMTPHD . . . .Management PhD"
    },
    {
        "value": "MIC BIO",
        "label": "MIC BIO . . . . . .Microbiology"
    },
    {
        "value": "MOL BIO",
        "label": "MOL BIO . . . . . Molecular Biology and Biochemistry"
    },
    {
        "value": "MPAC",
        "label": "MPAC . . . . . . .Accounting"
    },
    {
        "value": "MSE",
        "label": "MSE . . . . . . . . Materials Science and Engineering"
    },
    {
        "value": "MUSIC",
        "label": "MUSIC . . . . . . .Music"
    },
    {
        "value": "NET SYS",
        "label": "NET SYS . . . . .Networked Systems"
    },
    {
        "value": "NEURBIO",
        "label": "NEURBIO . . . . .Neurobiology and Behavior"
    },
    {
        "value": "NEUROL",
        "label": "NEUROL . . . . . Neurology"
    },
    {
        "value": "NUR SCI",
        "label": "NUR SCI . . . . . Nursing Science"
    },
    {
        "value": "OB/GYN",
        "label": "OB/GYN . . . . . Obstetrics and Gynecology"
    },
    {
        "value": "OPHTHAL",
        "label": "OPHTHAL . . . . Ophthalmology"
    },
    {
        "value": "PATH",
        "label": "PATH . . . . . . . Pathology and Laboratory Medicine"
    },
    {
        "value": "PED GEN",
        "label": "PED GEN . . . . Pediatrics Genetics"
    },
    {
        "value": "PEDS",
        "label": "PEDS . . . . . . . Pediatrics"
    },
    {
        "value": "PERSIAN",
        "label": "PERSIAN . . . . .Persian"
    },
    {
        "value": "PHARM",
        "label": "PHARM . . . . . .Pharmacology"
    },
    {
        "value": "PHILOS",
        "label": "PHILOS . . . . . .Philosophy"
    },
    {
        "value": "PHMD",
        "label": "PHMD . . . . . . .Pharmacy"
    },
    {
        "value": "PHRMSCI",
        "label": "PHRMSCI . . . . Pharmaceutical Sciences"
    },
    {
        "value": "PHY SCI",
        "label": "PHY SCI . . . . . Physical Science"
    },
    {
        "value": "PHYSICS",
        "label": "PHYSICS . . . . .Physics"
    },
    {
        "value": "PHYSIO",
        "label": "PHYSIO . . . . . .Physiology and Biophysics"
    },
    {
        "value": "PLASTIC",
        "label": "PLASTIC . . . . . Plastic Surgery"
    },
    {
        "value": "PM&R",
        "label": "PM&R . . . . . . .Physical Medicine and Rehabilitation"
    },
    {
        "value": "POL SCI",
        "label": "POL SCI . . . . . Political Science"
    },
    {
        "value": "PORTUG",
        "label": "PORTUG . . . . . Portuguese"
    },
    {
        "value": "PP&D",
        "label": "PP&D . . . . . . . Planning, Policy, and Design"
    },
    {
        "value": "PSCI",
        "label": "PSCI . . . . . . . .Psychological Science"
    },
    {
        "value": "PSY BEH",
        "label": "PSY BEH . . . . .Psychology and Social Behavior"
    },
    {
        "value": "PSYCH",
        "label": "PSYCH . . . . . . Cognitive Sciences"
    },
    {
        "value": "PUB POL",
        "label": "PUB POL . . . . .Public Policy"
    },
    {
        "value": "PUBHLTH",
        "label": "PUBHLTH . . . . Public Health"
    },
    {
        "value": "RADIO",
        "label": "RADIO . . . . . . .Radiology"
    },
    {
        "value": "REL STD",
        "label": "REL STD . . . . . Religious Studies"
    },
    {
        "value": "ROTC",
        "label": "ROTC . . . . . . . Reserve Officers' Training Corps"
    },
    {
        "value": "RUSSIAN",
        "label": "RUSSIAN . . . . .Russian"
    },
    {
        "value": "SOC SCI",
        "label": "SOC SCI . . . . . Social Science"
    },
    {
        "value": "SOCECOL",
        "label": "SOCECOL . . . . Social Ecology"
    },
    {
        "value": "SOCIOL",
        "label": "SOCIOL . . . . . .Sociology"
    },
    {
        "value": "SPANISH",
        "label": "SPANISH . . . . .Spanish"
    },
    {
        "value": "SPPS",
        "label": "SPPS . . . . . . . Social Policy & Public Service"
    },
    {
        "value": "STATS",
        "label": "STATS . . . . . . .Statistics"
    },
    {
        "value": "SURGERY",
        "label": "SURGERY . . . .Surgery"
    },
    {
        "value": "SWE",
        "label": "SWE . . . . . . . .Software Engineering"
    },
    {
        "value": "TAGALOG",
        "label": "TAGALOG . . . . Tagalog"
    },
    {
        "value": "TOX",
        "label": "TOX . . . . . . . . .Toxicology"
    },
    {
        "value": "UCDC",
        "label": "UCDC . . . . . . . UC Washington DC"
    },
    {
        "value": "UNI AFF",
        "label": "UNI AFF . . . . . .University Affairs"
    },
    {
        "value": "UNI STU",
        "label": "UNI STU . . . . . .University Studies"
    },
    {
        "value": "UPPP",
        "label": "UPPP . . . . . . . Urban Planning and Public Policy"
    },
    {
        "value": "VIETMSE",
        "label": "VIETMSE . . . . .Vietnamese"
    },
    {
        "value": "VIS STD",
        "label": "VIS STD . . . . . .Visual Studies"
    },
    {
        "value": "WOMN ST",
        "label": "WOMN ST . . . . . Women's Studies"
    },
    {
        "value": "WRITING",
        "label": "WRITING . . . . . Writing"
    }
];

const DepartmentMenu = React.forwardRef((_, ref) => {
    let internalStateDispatch = useDispatch();
    return (
        <Select
            aria-label="department-input"
            closeMenuOnSelect={false}
            components={animatedComponents}
            isMulti
            onChange={(option) => internalStateDispatch(updateFormInput({ department: option.map(({ value }) => value) }))}
            options={DEPARTMENTS}
            placeholder="Include All Departments"
            ref={ref}
            styles={styles1}
        />
    );
});

export default DepartmentMenu;