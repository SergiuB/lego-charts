import * as React from 'react';
import Surface from 'src/components/Surface';
import Line from 'src/components/Line';
import XAxis from 'src/components/XAxis';
import YAxis from 'src/components/YAxis';
import XYScales from 'src/components/XYScales';
import Animation from 'src/components/Animation';
import Bars from 'src/components/Bars';
import Dots from 'src/components/Dots';
import { AutoSizer } from 'react-virtualized/dist/es/AutoSizer';
import { Chance } from 'chance';
import { times, zipWith } from 'lodash/fp';
import PointAtCoordinates from 'src/components/PointAtCoordinates';

const COUNT = 10;
const MIN_Y = 10;
const MAX_Y = 200;

const chance = new Chance();

const colors = {
  primary: '#5A5997',
  secondary: '#9E80B7',
  tertiary: '#F2BEFC'
};
const generateValues = (count: number): Array<[number, number]> =>
  times(() => chance.integer({ min: MIN_Y, max: MAX_Y }), count).map((y, x) => [
    x,
    y
  ]) as Array<[number, number]>;

class App extends React.Component {
  public state = {
    seriesA: generateValues(COUNT),
    seriesB: generateValues(COUNT)
  };
  public render() {
    return (
      <div>
        <button style={{ margin: '10px auto' }} onClick={this.updateValues}>
          Update values
        </button>
        <AutoSizer pureBreaker={chance.integer()} disableHeight={true}>
          {this.renderChart}
        </AutoSizer>
      </div>
    );
  }

  private renderChart = ({ width }: { width: number }) => {
    const { seriesA, seriesB } = this.state;
    return (
      <Surface width={width} height={400} padding={[10, 10, 20, 30]}>
        <XYScales
          yDomain={[MIN_Y, MAX_Y]}
          xDomain={['apples', 'oranges', 'pears']}
          xType="band"
        >
          <XAxis />
          <Bars
            color={colors.tertiary}
            points={[['apples', 50], ['oranges', 20], ['pears', 90]]}
          />
        </XYScales>
        <XYScales yDomain={[MIN_Y, MAX_Y]} xDomain={[0, COUNT]}>
          <XAxis />
          <YAxis />
          <Animation values={seriesA.map(([_, y]) => y)}>
            {({ values: yValues }) => (
              <React.Fragment>
                <Line
                  color={colors.primary}
                  points={
                    zipWith(
                      ([x, y], newY) => [x, newY],
                      seriesA,
                      yValues
                    ) as Array<[number, number]>
                  }
                />
                <Dots
                  color={colors.primary}
                  points={
                    zipWith(
                      ([x, y], newY) => [x, newY],
                      seriesA,
                      yValues
                    ) as Array<[number, number]>
                  }
                />
              </React.Fragment>
            )}
          </Animation>
          <PointAtCoordinates points={seriesB}>
            {point => (
              <React.Fragment>
                <Line color={colors.secondary} points={seriesB} />
                <Dots
                  color={colors.secondary}
                  points={seriesB}
                  highlight={point}
                />
              </React.Fragment>
            )}
          </PointAtCoordinates>
        </XYScales>
      </Surface>
    );
  };

  private updateValues = () => {
    this.setState({
      seriesA: generateValues(COUNT),
      seriesB: generateValues(COUNT)
    });
  };
}

export default App;
