import { Link } from 'react-router-dom';
import Logo from '../../assets/images/logo.png';
import styled from '@emotion/styled';
import { useEffect } from 'react';

const ErrorPageContainerElement = styled.div`
    display: grid;
    height: 100vh;
    place-items: center;

    #content {
        align-items: flex-start;
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        justify-content: center;
        padding: 56px 56px;
    }

    #logo {
	width: 16rem;
    }

    #message {
        margin-bottom: 20rem;
    }

    #title {
        font-family: FFKievitSlabWebProBook, 'Times New Roman', serif;
        font-size: 6rem;
    }

    #description {
        font-family: RedHatText, Arial, sans-serif;
        line-height: 28px;
    }
`;

export default function ErrorPage() {
    useEffect(() => document.title = 'Error | AntCatalog', []);
    return (
        <ErrorPageContainerElement>
            <main id="content">
                <div id="message">
                    <h1 id="title">Error</h1>
                    <p id="description">Apologies, the page you're looking for cannot be found.</p>
                </div>

                <Link to="/">
                    <img src={Logo} id="logo" alt="AntCatalog Logo" />
                </Link>
            </main>
        </ErrorPageContainerElement>
    );
}