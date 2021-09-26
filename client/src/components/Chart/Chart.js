import React from 'react';
import { Chart, ChartAxis, ChartBar, ChartGroup, ChartVoronoiContainer } from '@patternfly/react-charts';

import '@patternfly/react-core/dist/styles/base.css';

import './Chart.css';

export default function GradeChart() {
	return (
		<Chart
			containerComponent={<ChartVoronoiContainer labels={({ datum }) => `${datum.name}: ${datum.y}`} constrainToVisibleArea />}
			domainPadding={{ x: [30, 25] }}
			height={629}
			legendData={[{ name: 'Cats' }, { name: 'Dogs' }, { name: 'Birds' }, { name: 'Mice' }]}
			legendOrientation="horizontal"
			legendPosition="bottom"
			padding={{
				bottom: 100,
				left: 100,
				right: 100,
				top: 100
			}}
			width={700}
		>
			<ChartAxis />
			<ChartAxis dependentAxis showGrid />
			<ChartGroup offset={11}>
				<ChartBar data={[{ name: 'Cats', x: '2015', y: 1 }, { name: 'Cats', x: '2016', y: 2 }, { name: 'Cats', x: '2017', y: 5 }, { name: 'Cats', x: '2018', y: 3 }]} />
				<ChartBar data={[{ name: 'Dogs', x: '2015', y: 2 }, { name: 'Dogs', x: '2016', y: 1 }, { name: 'Dogs', x: '2017', y: 7 }, { name: 'Dogs', x: '2018', y: 4 }]} />
				<ChartBar data={[{ name: 'Birds', x: '2015', y: 4 }, { name: 'Birds', x: '2016', y: 4 }, { name: 'Birds', x: '2017', y: 9 }, { name: 'Birds', x: '2018', y: 7 }]} />
				<ChartBar data={[{ name: 'Mice', x: '2015', y: 3 }, { name: 'Mice', x: '2016', y: 3 }, { name: 'Mice', x: '2017', y: 8 }, { name: 'Mice', x: '2018', y: 5 }]} />
			</ChartGroup>
		</Chart>
	);
	/*return (
		<div id="chart">
			<Chart
				containerComponent={<ChartVoronoiContainer labels={({ datum }) => `${datum.name}: ${datum.y}`} constrainToVisibleArea />}
				legendData={[{ course: 'CS 261P' }]}
				legendOrientation="vertical"
				legendPosition="right"
			>
				<ChartAxis />
				<ChartAxis dependentAxis showGrid />
				<ChartGroup>
					<ChartBar data={[{ course: 'CS 261P', x: 'A', y: 46 }]} />
					<ChartBar data={[{ course: 'CS 261P', x: 'B', y: 2 }]} />
					<ChartBar data={[{ course: 'CS 261P', x: 'C', y: 0 }]} />
					<ChartBar data={[{ course: 'CS 261P', x: 'D', y: 0 }]} />
					<ChartBar data={[{ course: 'CS 261P', x: 'F', y: 0 }]} />
					<ChartBar data={[{ course: 'CS 261P', x: 'P', y: 0 }]} />
					<ChartBar data={[{ course: 'CS 261P', x: 'NP', y: 0 }]} />
				</ChartGroup>
			</Chart>
		</div>
	);*/
}