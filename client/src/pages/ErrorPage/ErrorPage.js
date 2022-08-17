import ErrorIllustration from '../../assets/images/error-bg.jpg';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { Title } from '@patternfly/react-core';
import { useEffect } from 'react';

const ErrorPageContainerElement = styled.div`
    a, a:hover {
        text-decoration: none;
    }
    
    #figure {
        line-height: 0;
        margin: 0;
    }

    #content {
        align-items: center;
        display: flex;
        flex-direction: column;
        height: 512px;
        justify-content: center;
        text-align: center;
    }
    
    #title {
        font-size: 4rem;
    }

    #message {
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
        transition: all 0.5s;
        width: 100%;
    }
    
    #home-button:hover {
        background-color: transparent;
        color: rgb(170, 179, 188);
        text-decoration: none;
    }
`;

export default function ErrorPage() {
    useEffect(() => document.title = 'Error | AntCatalog', []);
    return (
        <ErrorPageContainerElement>
            <figure id="figure">
                <img src={ErrorIllustration} alt="" />
            </figure>

            <main id="content">
                <div id="message">
                    <Title headingLevel="h1" id="title">Error</Title>
                    <p id="description">Apologies, the page you're looking for cannot be found.</p>
                </div>
                
                <Link to="/">
                    <button id="home-button">Return to Home</button>  
                </Link>
            </main>
        </ErrorPageContainerElement>
    );
}
