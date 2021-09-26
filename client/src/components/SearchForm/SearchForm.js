import React, { useState } from 'react';
import { bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux';
import { Search } from '@icon-park/react';
import styled from '@emotion/styled';

import InstructorAutocomplete from './InstructorAutocomplete/InstructorAutocomplete';
import * as searchResultActionCreators from '../../actions/searchResultActionCreators';

import '@icon-park/react/styles/index.css';

import logo from '../../assets/images/logo.png';

const SearchFormAreaElement = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;

    #search-form {
	    margin: 0 56px;
    }

    #logo {
	    width: 90%;
    }

    .form-group {
	    margin: 48px 0;
    }

    .select-menu {
	    align-items: center;
	    display: grid;
	    grid-template-areas: 'select';
    }

    .select-menu select {
	    appearance: none;
	    background-color: transparent;
	    border: 1.5px solid #aab3bc;
	    color: #aab3bc;
	    cursor: pointer;
	    font-family: FFKievitSlabWebProBook, 'Times New Roman', serif;
	    font-size: 14px;
	    line-height: 25px;
	    margin: 0;
	    padding: 4px 18px;
	    width: 100%;
    }
    
    @-moz-document url-prefix() {
        .select-menu select {
            text-indent: -2px;
        }
    }

    .select-menu select:focus {
	    outline: none;
    }

    .select-menu::after  {
	    background-color: #aab3bc;
	    clip-path: polygon(100% 0%, 0 0%, 50% 100%);
	    content: '';
	    height: 0.4em;
	    justify-self: end;
	    margin-right: 8px;
	    width: 0.7em;
    }

    select,
    .select-menu:after {
	    grid-area: select;
    }

    .invalid-option, .invalid-option:focus, .invalid-option:hover, .invalid-option:active {
	    background-color: transparent;
	    color: transparent;
    }

    .group-elements {
	    margin: 8px 0;
    }

    input[type="text"], input[type="text"]:focus {
	    background-color: #ffffff;
	    border: 1.5px solid #aab3bc;
	    box-sizing: border-box;
	    color: #aab3bc;
	    font-family: FFKievitSlabWebProBook, 'Times New Roman', serif;
	    font-size: 14px;
	    line-height: 25px;
	    outline: none;
	    padding: 4px 18px;
	    width: 100%;
    }

    input::placeholder {
	    color: #aab3bc;
	    opacity: 1;
    }

    #aggregate-view-area {
	    display: inline-flex;
	    margin: 0;
    }

    input[type="checkbox"] {
	    margin: auto 3px auto 0;
    }

    label[for="aggregate-view"] {
	    color: #aab3bc;
	    font-family: FFKievitSlabWebProBook, 'Times New Roman', serif;
	    font-size: 14px;
    }

    #search-button-area {
	    margin-bottom: 0;
    }

    #search-button {
	    align-items: center;
	    background-color: #0064a4;
	    border: none;
	    color: #ffffff;
	    cursor: pointer;
	    display: flex;
	    font-family: Lato, Arial, sans-serif;
	    font-size: 14px;
	    gap: 2px;
	    justify-content: center;
	    padding: 8px 0;
	    width: 100%;
    }
`;

const SearchForm = () => {
	let dispatch = useDispatch();
	let { _, replaceResults } = bindActionCreators(searchResultActionCreators, dispatch);
	
    let [term, setTerm] = useState(''), 
        [department, setDepartment] = useState(''),
        [courseNumber, setCourseNumber] = useState(''),
        [courseCode, setCourseCode] = useState(''),
        [instructor, setInstructor] = useState(''),
        [aggregate, setAggregate] = useState(false);
      
    const generateRequestParams = () => {
        return {
            values: {
                term: (term.trim().length > 0) ? term : null,
                department: (department.trim().length > 0) ? department : null,
                courseNumber: (courseNumber.trim().length > 0) ? courseNumber : null,
                courseCode: (courseCode.trim().length > 0) ? courseCode : null,
                instructor: (instructor.trim().length > 0) ? instructor : null
            },
            options: {
                aggregate,
                offset: 0
            }
        };
    };

    const submitForm = async (event) => {
        event.preventDefault();
        if ((term.trim().length > 0 
                || department.trim().length > 0
                || department.trim().length > 0
                || courseNumber.trim().length > 0
                || courseCode.trim().length > 0
                || instructor.trim().length > 0)
                && [true, false].includes(aggregate)) {
            try {
                let response = await fetch('http://localhost:26997/api/v1/search', {
                    body: JSON.stringify(generateRequestParams()),
                    headers: { 'Content-Type': 'application/json' },
                    method: 'POST'
                });
                let information = await response.json();
                replaceResults(information.data);
            } catch (error) {
                console.error(error);
            }
        } else {
            console.error('Please check the fields.');
        }
    };

	return (
        <SearchFormAreaElement>
            <img src={logo} id="logo" alt="AntCatalog's Logo" />
            <form id="search-form">
                <div className="form-group">
                    <div className="select-menu" id="term">
                        <select value={term} onChange={event => setTerm(event.target.value)}>
                            <option value="" disabled className="invalid-option">Term</option>
                            <option value="Spring 2021">2021 Spring Quarter</option>
                            <option value="Winter 2021">2021 Winter Quarter</option>
                            <option value="Fall 2020">2020 Fall Quarter</option>
                            <option value="Spring 2020">2020 Spring Quarter</option>
                            <option value="Winter 2020">2020 Winter Quarter</option>
                            <option value="Fall 2019">2019 Fall Quarter</option>
                            <option value="Spring 2019">2019 Spring Quarter</option>
                            <option value="Winter 2019">2019 Winter Quarter</option>
                            <option value="Fall 2018">2018 Fall Quarter</option>
                            <option value="Spring 2018">2018 Spring Quarter</option>
                            <option value="Winter 2018">2018 Winter Quarter</option>
                            <option value="Fall 2017">2017 Fall Quarter</option>
                            <option value="Spring 2017">2017 Spring Quarter</option>
                            <option value="Winter 2017">2017 Winter Quarter</option>
                            <option value="Fall 2016">2016 Fall Quarter</option>
                            <option value="Spring 2016">2016 Spring Quarter</option>
                            <option value="Winter 2016">2016 Winter Quarter</option>
                            <option value="Fall 2015">2015 Fall Quarter</option>
                            <option value="Spring 2015">2015 Spring Quarter</option>
                            <option value="Winter 2015">2015 Winter Quarter</option>
                            <option value="Fall 2014">2014 Fall Quarter</option>
                            <option value="Spring 2014">2014 Spring Quarter</option>
                            <option value="Winter 2014">2014 Winter Quarter</option>
                            <option value="Fall 2013">2013 Fall Quarter</option>
                        </select>
                    </div>
                </div>

                <div className="form-group">
                    <div className="select-menu group-elements" id="department">
                        <select value={department} onChange={event => setDepartment(event.target.value)}>
                            <option value="" disabled className="invalid-option">Department</option>
                            <option value="AC ENG">AC ENG . . . . . .Academic English</option>
                            <option value="AFAM">AFAM . . . . . . . African American Studies</option>
                            <option value="ANATOMY">ANATOMY . . . .Anatomy and Neurobiology</option>
                            <option value="ANESTH">ANESTH . . . . . Anesthesiology</option>
                            <option value="ANTHRO">ANTHRO . . . . . Anthropology</option>
                            <option value="ARABIC">ARABIC . . . . . .Arabic</option>
                            <option value="ARMN">ARMN . . . . . . .Armenian (started 2018 Spg)</option>
                            <option value="ART">ART . . . . . . . . .Art</option>
                            <option value="ART HIS">ART HIS . . . . . .Art History</option>
                            <option value="ARTS">ARTS . . . . . . . Arts</option>
                            <option value="ARTSHUM">ARTSHUM . . . . Arts and Humanities</option>
                            <option value="ASIANAM">ASIANAM . . . . Asian American Studies</option>
                            <option value="BANA">BANA . . . . . . . Business Analytics (started 2017 SS2)</option>
                            <option value="BATS">BATS . . . . . . . Biomedical and Translational Science</option>
                            <option value="BIO SCI">BIO SCI . . . . . .Biological Sciences</option>
                            <option value="BIOCHEM">BIOCHEM . . . . Biological Chemistry</option>
                            <option value="BME">BME . . . . . . . . Biomedical Engineering</option>
                            <option value="BSEMD">BSEMD . . . . . .Bio Sci &amp; Educational Media Design (until 2017 Wtr)</option>
                            <option value="CAMPREC">CAMPREC . . . .Campus Recreation</option>
                            <option value="CBE">CBE . . . . . . . . Chemical and Biomolecular Engineering (started 2018 Fall)</option>
                            <option value="CBEMS">CBEMS . . . . . .Chemical Engr and Materials Science (until 2019 SS2)</option>
                            <option value="CEM">CEM . . . . . . . . Community and Environmental Medicine</option>
                            <option value="CHC/LAT">CHC/LAT . . . . . Chicano Latino</option>
                            <option value="CHEM">CHEM . . . . . . .Chemistry</option>
                            <option value="CHINESE">CHINESE . . . . .Chinese</option>
                            <option value="CLASSIC">CLASSIC . . . . .Classics</option>
                            <option value="CLT&amp;THY">CLT&amp;THY . . . . .Culture &amp; Theory</option>
                            <option value="COGS">COGS . . . . . . . Cognitive Sciences  (started 2016 Fall)</option>
                            <option value="COM LIT">COM LIT . . . . . Comparative Literature</option>
                            <option value="COMPSCI">COMPSCI . . . . Computer Science</option>
                            <option value="CRITISM">CRITISM . . . . . Criticism</option>
                            <option value="CRM/LAW">CRM/LAW . . . . Criminology, Law and Society</option>
                            <option value="CSE">CSE . . . . . . . . Computer Science and Engineering</option>
                            <option value="DANCE">DANCE . . . . . . Dance</option>
                            <option value="DERM">DERM . . . . . . .Dermatology</option>
                            <option value="DEV BIO">DEV BIO . . . . . Developmental and Cell Biology</option>
                            <option value="DRAMA">DRAMA . . . . . .Drama</option>
                            <option value="E ASIAN">E ASIAN . . . . . East Asian Languages and Literatures (until 2019 SS2)</option>
                            <option value="EARTHSS">EARTHSS . . . . Earth System Science</option>
                            <option value="EAS">EAS . . . . . . . . East Asian Studies (started 2019 Fall)</option>
                            <option value="ECO EVO">ECO EVO . . . . Ecology and Evolutionary Biology</option>
                            <option value="ECON">ECON . . . . . . . Economics</option>
                            <option value="ECPS">ECPS . . . . . . . Embedded and Cyber-Physical Systems</option>
                            <option value="ED AFF">ED AFF . . . . . .Educational Affairs (Sch of Med)</option>
                            <option value="EDUC">EDUC . . . . . . . Education</option>
                            <option value="EECS">EECS . . . . . . . Electrical Engineering &amp; Computer Science</option>
                            <option value="EHS">EHS . . . . . . . . Environmental Health Sciences</option>
                            <option value="ENGLISH">ENGLISH . . . . .English</option>
                            <option value="ENGR">ENGR . . . . . . . Engineering</option>
                            <option value="ENGRCEE">ENGRCEE . . . .Engineering, Civil and Environmental</option>
                            <option value="ENGRMAE">ENGRMAE . . . .Engineering, Mechanical and Aerospace</option>
                            <option value="ENGRMSE">ENGRMSE . . . .Materials Science and Engineering (until 2020 SS2)</option>
                            <option value="EPIDEM">EPIDEM . . . . . .Epidemiology</option>
                            <option value="ER MED">ER MED . . . . . Emergency Medicine</option>
                            <option value="EURO ST">EURO ST . . . . .European Studies</option>
                            <option value="FAM MED">FAM MED . . . . Family Medicine</option>
                            <option value="FIN">FIN . . . . . . . . . Finance (started 2017 Fall)</option>
                            <option value="FLM&amp;MDA">FLM&amp;MDA . . . .Film and Media Studies</option>
                            <option value="FRENCH">FRENCH . . . . . French</option>
                            <option value="GDIM">GDIM . . . . . . . .Game Design and Interactive Media (started 2021 Fall)</option>
                            <option value="GEN&amp;SEX">GEN&amp;SEX . . . . Gender and Sexuality Studies</option>
                            <option value="GERMAN">GERMAN . . . . .German</option>
                            <option value="GLBL ME">GLBL ME . . . . .Global Middle East Studies (started 2016 Fall)</option>
                            <option value="GLBLCLT">GLBLCLT . . . . .Global Cultures</option>
                            <option value="GREEK">GREEK . . . . . . Greek</option>
                            <option value="HEBREW">HEBREW . . . . .Hebrew</option>
                            <option value="HINDI">HINDI . . . . . . . .Hindi</option>
                            <option value="HISTORY">HISTORY . . . . .History</option>
                            <option value="HUMAN">HUMAN . . . . . .Humanities</option>
                            <option value="HUMARTS">HUMARTS . . . . Humanities and Arts</option>
                            <option value="I&amp;C SCI">I&amp;C SCI . . . . . . Information and Computer Science</option>
                            <option value="IN4MATX">IN4MATX . . . . . Informatics</option>
                            <option value="INNO">INNO . . . . . . . .Masters of Innovation and Entrepreneurship (started 2019 Fall)</option>
                            <option value="INT MED">INT MED . . . . . Internal Medicine</option>
                            <option value="INTL ST">INTL ST . . . . . . International Studies</option>
                            <option value="IRAN">IRAN . . . . . . . .Iranian (started 2020 Fall)</option>
                            <option value="ITALIAN">ITALIAN . . . . . .Italian</option>
                            <option value="JAPANSE">JAPANSE . . . . Japanese</option>
                            <option value="KOREAN">KOREAN . . . . .Korean</option>
                            <option value="LATIN">LATIN . . . . . . . Latin</option>
                            <option value="LINGUIS">LINGUIS . . . . . .Linguistics (until 2019 SS2)</option>
                            <option value="LIT JRN">LIT JRN . . . . . . Literary Journalism</option>
                            <option value="LPS">LPS . . . . . . . . .Logic and Philosophy of Science</option>
                            <option value="LSCI">LSCI . . . . . . . . Language Science (started 2019 Fall)</option>
                            <option value="M&amp;MG">M&amp;MG . . . . . . .Microbiology and Molecular Genetics</option>
                            <option value="MATH">MATH . . . . . . . Mathematics</option>
                            <option value="MED">MED . . . . . . . . Medicine</option>
                            <option value="MED ED">MED ED . . . . . Medical Education</option>
                            <option value="MED HUM">MED HUM . . . . Medical Humanities (started 2016 Fall)</option>
                            <option value="MGMT">MGMT . . . . . . .Management</option>
                            <option value="MGMT EP">MGMT EP . . . . Executive MBA</option>
                            <option value="MGMT FE">MGMT FE . . . . Fully Employed MBA</option>
                            <option value="MGMT HC">MGMT HC . . . . Health Care MBA</option>
                            <option value="MGMTMBA">MGMTMBA . . . Management MBA</option>
                            <option value="MGMTPHD">MGMTPHD . . . .Management PhD</option>
                            <option value="MIC BIO">MIC BIO . . . . . .Microbiology</option>
                            <option value="MOL BIO">MOL BIO . . . . . Molecular Biology and Biochemistry</option>
                            <option value="MPAC">MPAC . . . . . . .Accounting</option>
                            <option value="MSE">MSE . . . . . . . . Materials Science and Engineering (started 2020 Fall)</option>
                            <option value="MUSIC">MUSIC . . . . . . .Music</option>
                            <option value="NET SYS">NET SYS . . . . .Networked Systems</option>
                            <option value="NEURBIO">NEURBIO . . . . .Neurobiology and Behavior</option>
                            <option value="NEUROL">NEUROL . . . . . Neurology</option>
                            <option value="NUR SCI">NUR SCI . . . . . Nursing Science</option>
                            <option value="OB/GYN">OB/GYN . . . . . Obstetrics and Gynecology</option>
                            <option value="OPHTHAL">OPHTHAL . . . . Ophthalmology</option>
                            <option value="PATH">PATH . . . . . . . Pathology and Laboratory Medicine</option>
                            <option value="PED GEN">PED GEN . . . . Pediatrics Genetics</option>
                            <option value="PEDS">PEDS . . . . . . . Pediatrics</option>
                            <option value="PERSIAN">PERSIAN . . . . .Persian</option>
                            <option value="PHARM">PHARM . . . . . .Pharmacology (started 2020 Fall)</option>
                            <option value="PHILOS">PHILOS . . . . . .Philosophy</option>
                            <option value="PHMD">PHMD . . . . . . .Pharmacy (started 2021 Fall)</option>
                            <option value="PHRMSCI">PHRMSCI . . . . Pharmaceutical Sciences</option>
                            <option value="PHY SCI">PHY SCI . . . . . Physical Science</option>
                            <option value="PHYSICS">PHYSICS . . . . .Physics</option>
                            <option value="PHYSIO">PHYSIO . . . . . .Physiology and Biophysics</option>
                            <option value="PLASTIC">PLASTIC . . . . . Plastic Surgery</option>
                            <option value="PM&amp;R">PM&amp;R . . . . . . .Physical Medicine and Rehabilitation</option>
                            <option value="POL SCI">POL SCI . . . . . Political Science</option>
                            <option value="PORTUG">PORTUG . . . . . Portuguese</option>
                            <option value="PP&amp;D">PP&amp;D . . . . . . . Planning, Policy, and Design (until 2018 SS2; see UPPP)</option>
                            <option value="PSCI">PSCI . . . . . . . .Psychological Science (started 2019 Fall)</option>
                            <option value="PSY BEH">PSY BEH . . . . .Psychology and Social Behavior (until 2019 SS2)</option>
                            <option value="PSYCH">PSYCH . . . . . . Psychology</option>
                            <option value="PUB POL">PUB POL . . . . .Public Policy</option>
                            <option value="PUBHLTH">PUBHLTH . . . . Public Health</option>
                            <option value="RADIO">RADIO . . . . . . .Radiology</option>
                            <option value="REL STD">REL STD . . . . . Religious Studies</option>
                            <option value="ROTC">ROTC . . . . . . . Reserve Officers' Training Corps</option>
                            <option value="RUSSIAN">RUSSIAN . . . . .Russian</option>
                            <option value="SOC SCI">SOC SCI . . . . . Social Science</option>
                            <option value="SOCECOL">SOCECOL . . . . Social Ecology</option>
                            <option value="SOCIOL">SOCIOL . . . . . .Sociology</option>
                            <option value="SPANISH">SPANISH . . . . .Spanish</option>
                            <option value="SPPS">SPPS . . . . . . . Social Policy &amp; Public Service</option>
                            <option value="STATS">STATS . . . . . . .Statistics</option>
                            <option value="SURGERY">SURGERY . . . .Surgery</option>
                            <option value="SWE">SWE . . . . . . . .Software Engineering (started 2019 Fall)</option>
                            <option value="TAGALOG">TAGALOG . . . . Tagalog</option>
                            <option value="TOX">TOX . . . . . . . . .Toxicology</option>
                            <option value="UCDC">UCDC . . . . . . . UC Washington DC</option>
                            <option value="UNI AFF">UNI AFF . . . . . .University Affairs</option>
                            <option value="UNI STU">UNI STU . . . . . .University Studies</option>
                            <option value="UPPP">UPPP . . . . . . . Urban Planning and Public Policy (started 2018 Fall)</option>
                            <option value="VIETMSE">VIETMSE . . . . .Vietnamese</option>
                            <option value="VIS STD">VIS STD . . . . . .Visual Studies</option>
                            <option value="WOMN ST">WOMN ST . . . . Women's Studies (until 2014 SS2)</option>
                            <option value="WRITING">WRITING . . . . . Writing</option>
                        </select>
                    </div>
                    <div className="group-elements">
                        <input type="text" className="input-elements" id="course-number" onChange={event => setCourseNumber(event.target.value)} placeholder="Course Number" />
                    </div>
                    <div className="group-elements">
                        <input type="text" className="input-elements" id="course-code" onChange={event => setCourseCode(event.target.value)} placeholder="Course Code" />
                    </div>
                </div>

                <div className="form-group">
                    <div className="group-elements">
                        <InstructorAutocomplete instructor={instructor} setInstructor={setInstructor} />
                    </div>
                    <div className="group-elements" id="aggregate-view-area">
                        <input type="checkbox" id="aggregate-view" onChange={event => setAggregate(event.target.checked)} />
                        <label htmlFor="aggregate-view">Aggregate View</label>
                    </div>
                </div>

                <div className="form-group" id="search-button-area">
                    <button className="group-elements" id="search-button" onClick={event => submitForm(event)}>
                        <Search theme="outline" size="18" fill="#ffffff" />
                        Search
                    </button>
                </div>
            </form>
        </SearchFormAreaElement>
    );
};

export default SearchForm;
