import { Card, CardBody, CardFooter, CardTitle } from '@patternfly/react-core';
import ErrorIllustration from '../../assets/images/error-bg.jpg';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { Text, TextContent, TextVariants } from '@patternfly/react-core';
import { useEffect } from 'react';

const ErrorPageContainerElement = styled.main`
    background-image: url(${ErrorIllustration});
    background-size: cover;
    background-repeat: no-repeat;
    display: grid;
    height: 100vh;
    padding: 2rem;
    place-items: center;
    width: 100vw;

    a, a:hover {
        text-decoration: none;
    }

    #description {
        color: #6a6e73;
        line-height: 2rem;
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
        padding: 8px 20px;
    }
`;

export default function ErrorPage() {
    useEffect(() => document.title = 'Error | AntCatalog', []);
    return (
        <ErrorPageContainerElement>
            <Card isLarge>
                <CardTitle>Error</CardTitle>
                <CardBody>
                    <TextContent>
                        <Text component={TextVariants.small}>
                            Apologies, the page you're looking for cannot be found.
                            Please go back to the home page using the button below.
                        </Text>
                    </TextContent>
                </CardBody>
                <CardFooter>
                    <Link to="/">
                        <button id="home-button">Return to Home</button>  
                    </Link>
                </CardFooter>
            </Card>
        </ErrorPageContainerElement>
    );
}
