import * as React from 'react';
import { AutoSizer } from 'react-virtualized/dist/es/AutoSizer';
import { Chance } from 'chance';
import { times } from 'lodash/fp';
import { Surface } from 'src/components/Surface';
import { XScale } from 'src/components/XScale';
import { YScale } from 'src/components/YScale';
import { Line } from 'src/components/Line';
import { XAxis } from 'src/components/XAxis';

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
    return (
      <Surface width={width} height={400} padding={[30, 30, 30, 30]}>
        {({ width: paddedWidth, height: paddedHeight }) => (
          <XScale domain={[0, COUNT]} width={paddedWidth}>
            {xScale => (
              <YScale domain={[MIN_Y, MAX_Y]} height={paddedHeight}>
                {yScale => (
                  <React.Fragment>
                    <XAxis
                      width={paddedWidth}
                      height={paddedHeight}
                      xScale={xScale}
                    />
                    <Line
                      points={seriesA}
                      color={colors.primary}
                      xScale={xScale}
                      yScale={yScale}
                    />
                  </React.Fragment>
                )}
              </YScale>
            )}
          </XScale>
        )}
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
