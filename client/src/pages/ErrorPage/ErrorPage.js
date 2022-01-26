import { Link } from 'react-router-dom';
import Logo from '../../assets/images/logo.png';
import styled from '@emotion/styled';
import { useEffect } from 'react';

const ErrorPageContainerElement = styled.div`
    display: grid;
    height: 100vh;
    place-items: center;

    #content {
        align-items: center;
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        justify-content: center;
        text-align: center;
    }

    #message {
        margin-top: 3rem;
        padding: 0 36px;
    }

    #title {
        font-family: FFKievitSlabWebProBook, 'Times New Roman', serif;
    }

    #description {
        font-family: RedHatText, Arial, sans-serif;
        line-height: 28px;
    }

    @media (min-width: 641px) {
        #logo {
            max-width: 1024px;
            width: 70%;
        }
    
        #title {
            font-size: 5rem;
        }
    }

    @media (max-width: 640px) {
        #logo {
            width: 80vw;
        }
    
        #title {
            font-size: 4rem;
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
                    <h1 id="title">Error</h1>
                    <p id="description">Apologies, the page you're looking for cannot be found.</p>
                </div>
            </main>
        </ErrorPageContainerElement>
    );
}