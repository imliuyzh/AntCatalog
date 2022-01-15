import { EmptyState, EmptyStateBody, EmptyStateVariant, Title } from '@patternfly/react-core';

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
            </EmptyStateBody>
        </EmptyState>
    );
}
