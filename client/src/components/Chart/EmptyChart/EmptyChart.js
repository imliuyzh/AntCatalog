import { EmptyState, EmptyStateBody, EmptyStateVariant, Title } from '@patternfly/react-core';
import styled from '@emotion/styled';
import { ReactComponent as GithubIcon } from '../../../assets/images/github.svg';

const GitHubLinkContainerElement = styled.div`
    #github-button {
        align-items: center;
        background-color: transparent;
        color: #000000;
        cursor: pointer;
        display: flex;
        font-family: RedHatText, Arial, sans-serif;
        font-size: 14px;
        gap: 5px;
        justify-content: center;
        margin-top: 24px;
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
                AntCatalog allows its users to check for grade statistics of graduate-level courses in the University of California, Irvine (UCI).
                Currently, AntCatalog does not plan to include statistics from courses under the Law department and undergraduate division due to
                significant efforts on data cleaning. The range of data begins from Fall 2013 (Summer sessions are excluded). I will attempt to
                update the statistics once every quarter. In order to get this data, I must make a request to UCI's Public Records Office (PRO).
                Sometimes, you may not find the data for a particular course due to a variety of circumstances such as late grade submittal. If this
                happens, please contact me through GitHub issues.

                <GitHubLinkContainerElement>
                    <a href="https://github.com/imliuyzh/AntCatalog" id="github-button" target="_blank" rel="noreferrer">
                        <GithubIcon fill="#000000" id="github-icon" />
                    </a>
                </GitHubLinkContainerElement>
            </EmptyStateBody>
        </EmptyState>
    );
}
