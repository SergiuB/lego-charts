import * as React from 'react';
import { AutoSizer } from 'react-virtualized/dist/es/AutoSizer';
import { Chance } from 'chance';
import { times } from 'lodash/fp';
import Surface from 'src/components/Surface';
import XYScales from 'src/components/XYScales';
import Line from 'src/components/Line';
import XAxis from 'src/components/XAxis';
import YAxis from 'src/components/YAxis';
import Dots from 'src/components/Dots';
import Animation from 'src/components/Animation';
import { Point } from 'src/types';
import { zipWith } from 'lodash/fp';
import PointAtCoordinates from 'src/components/PointAtCoordinates';
import Dot from 'src/components/Dot';

const COUNT = 10;
const MIN_Y = 10;
const MAX_Y = 200;

const chance = new Chance();

const colors = {
  primary: '#5A5997',
  secondary: '#9E80B7',
  tertiary: '#F2BEFC'
};

const generateValues = (count: number): Point[] =>
  times(() => chance.integer({ min: MIN_Y, max: MAX_Y }), count).map((y, x) => [
    x,
    y
  ]) as Point[];

class App extends React.Component {
  public state = {
    seriesA: generateValues(COUNT),
    seriesB: generateValues(COUNT)
  };

  public render() {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <button
          style={{ margin: '10px auto', width: 200, height: 50, fontSize: 24 }}
          onClick={this.updateValues}
        >
          Update values
        </button>
        <AutoSizer pureBreaker={chance.integer()} disableHeight={true}>
          {this.renderChart}
        </AutoSizer>
      </div>
    );
  }

  private renderChart = ({ width }: { width: number }) => {
    const { seriesA } = this.state;
    const opacity = 1;
    return (
      <Surface
        width={width}
        height={400}
        padding={[30, 30, 30, 30]}
        opacity={opacity}
      >
        <XYScales xDomain={[0, COUNT]} yDomain={[MIN_Y, MAX_Y]}>
          <XAxis />
          <YAxis />
          <Animation values={seriesA.map(([_, y]) => y)}>
            {({ values }) => {
              const animatedSeriesA = zipWith(
                ([x, y], newY) => [x, newY],
                seriesA,
                values
              ) as Point[];
              return (
                <React.Fragment>
                  <Line points={animatedSeriesA} color={colors.primary} />
                  <Dots points={animatedSeriesA} color={colors.primary} />
                  <PointAtCoordinates points={animatedSeriesA}>
                    {point =>
                      point ? (
                        <Dot point={point} color={colors.primary} radius={10} />
                      ) : null
                    }
                  </PointAtCoordinates>
                </React.Fragment>
              );
            }}
          </Animation>
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
