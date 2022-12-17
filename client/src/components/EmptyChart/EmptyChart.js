import { EmptyState, EmptyStateBody, EmptyStateVariant, Title } from '@patternfly/react-core';
import { ReactComponent as GithubIcon } from '../../assets/images/github.svg';
import styled from '@emotion/styled';

const GitHubLinkContainerElement = styled.div`
    margin-top: 56px;
    transition: all 0.5s;

    &:hover {
        transform: scale(1.2);
    }

    #github-button {
        align-items: center;
        background-color: transparent;
        cursor: pointer;
        display: flex;
        font-size: 14px;
        gap: 5px;
        justify-content: center;
    }

    #github-button:hover {
        text-decoration: none;
    }

    #github-icon {
        height: 24px;
        width: 24px;
    }
`;

export default function EmptyChart() {
    return (
        <EmptyState variant={EmptyStateVariant.xl}>
            <Title headingLevel="h1" size="4xl">About</Title>
            <EmptyStateBody>
                AntCatalog allows its users to examine the grade distribution of graduate-level courses in the University of
                California, Irvine (UCI). Currently, AntCatalog does not plan to include either Law nor undergraduate division
                courses due to significant efforts on data cleaning. The range of data starts in Summer 2013 and ends in Fall 2022.
                Sometimes, you may not find the data for a particular course due to circumstances like late grade submittal.
                If this happens, please create an issue on GitHub.

                <GitHubLinkContainerElement>
                    <a href="https://github.com/imliuyzh/AntCatalog" id="github-button" target="_blank" title="GitHub" rel="noreferrer">
                        <GithubIcon fill="#000000" id="github-icon" />
                    </a>
                </GitHubLinkContainerElement>
            </EmptyStateBody>
        </EmptyState>
    );
}
