import { Card, CardBody, CardFooter, CardTitle, Text, TextContent, TextVariants } from '@patternfly/react-core';
import ErrorIllustration from '../../assets/images/error-bg.jpg';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { useEffect } from 'react';

const ErrorPageContainerElement = styled.main`
    background-image: url(${ErrorIllustration});
    background-repeat: no-repeat;
    background-size: cover;
    display: grid;
    height: 100vh;
    place-items: center;
    width: 100vw;

    a, a:hover {
        text-decoration: none;
    }

    .pf-c-card {
        box-shadow: var(--pf-global--BoxShadow--xl);
        margin: 2rem;
    }

    .pf-c-card__title {
        font-family: var(--pf-global--FontFamily--sans-serif);
    }
`;

const HomePageButtonElement = styled.button`
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
                        <HomePageButtonElement>Return to Home</HomePageButtonElement>  
                    </Link>
                </CardFooter>
            </Card>
        </ErrorPageContainerElement>
    );
}
