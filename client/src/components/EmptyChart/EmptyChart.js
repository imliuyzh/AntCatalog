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
                AntCatalog is a tool for examining the grade distribution of graduate-level courses from Summer 2013 to
                Fall 2022 in the University of California, Irvine (UCI). The data is from the university's Public
                Records Office (PRO). AntCatalog does not include courses from the Law and undergraduate divisions due
                to significant amount of data cleaning. On a side note, AntCatalog will no longer to be maintained after
                the 2022-2023 academic year due to graduation. Please go to PeterPortal from now on.

                <GitHubLinkContainerElement>
                    <a href="https://github.com/imliuyzh/AntCatalog" id="github-button" target="_blank" title="GitHub" rel="noreferrer">
                        <GithubIcon fill="#000000" id="github-icon" />
                    </a>
                </GitHubLinkContainerElement>
            </EmptyStateBody>
        </EmptyState>
    );
}
