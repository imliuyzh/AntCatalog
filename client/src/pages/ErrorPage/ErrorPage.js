import { Link } from 'react-router-dom';
import Logo from '../../assets/images/logo.png';
import styled from '@emotion/styled';
import { Title } from '@patternfly/react-core';
import { useEffect } from 'react';

const ErrorPageContainerElement = styled.div`
    display: grid;
    font-family: RedHatText, Arial, sans-serif;
    height: 100vh;
    place-items: center;
    
    a, a:hover {
        text-decoration: none;
    }

    #content {
        align-items: center;
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        justify-content: center;
        padding: 0 2rem;
        text-align: center;
    }

    #message {
        margin-top: 3rem;
        padding: 0 36px;
    }

    #description {
        color: #6a6e73;
        line-height: 2rem;
        margin: 1rem;
    }
    
    #home-button {
        align-items: center;
        background-color: #0064a4;
        border: 1px solid #efefef;
        color: #ffffff;
        cursor: pointer;
        display: flex;
        font-size: 14px;
        gap: 5px;
        justify-content: center;
        margin: 6rem 0 0;
        padding: 8px 28px;
        transition: all 0.8s;
        width: 100%;
    }
    
    #home-button:hover {
        background-color: transparent;
        color: rgb(170, 179, 188);
        text-decoration: none;
    }

    @media (min-width: 641px) {
        #logo {
            max-width: 1024px;
            width: 70%;
        }
        
        .pf-c-title {
            font-size: 72px;
        }
    }

    @media (max-width: 640px) {
        #logo {
            width: 80vw;
        }
        
        .pf-c-title {
            font-size: 36px;
        }
    }
`;

export default function ErrorPage() {
    useEffect(() => document.title = 'Error | AntCatalog', []);
    return (
        <ErrorPageContainerElement>
            <main id="content">
                <Link to="/">
                    <img src={Logo} id="logo" alt="AntCatalog Logo" />
                </Link>

                <div id="message">
                    <Title headingLevel="h1">Error</Title>
                    <p id="description">Apologies, the page you're looking for cannot be found.</p>
                </div>
                
                <Link to="/">
                    <button id="home-button">Return to Home</button>  
                </Link>
            </main>
        </ErrorPageContainerElement>
    );
}
