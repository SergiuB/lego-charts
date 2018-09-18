import * as React from 'react';
import { AutoSizer } from 'react-virtualized/dist/es/AutoSizer';
import { Chance } from 'chance';
import { times } from 'lodash/fp';
import { Point } from 'src/types';

const COUNT = 10;
const MIN_Y = 10;
const MAX_Y = 200;

const chance = new Chance();

// const colors = {
//   primary: '#5A5997',
//   secondary: '#9E80B7',
//   tertiary: '#F2BEFC'
// };

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
          {({ width }) => (
            <h1 style={{ width, textAlign: 'center' }}>
              Hi, I'm a Lego chart wannabe, nice to meet y'all!
            </h1>
          )}
        </AutoSizer>
      </div>
    );
  }

  // {/* {this.renderChart} */}
  // private renderChart = ({ width }: { width: number }) => {
  //   return (
  //     <h1 style={{ width, textAlign: 'center' }}>
  //       Hi, I'm a Lego chart wannabe, nice to meet y'all!
  //     </h1>
  //   );
  // };

  private updateValues = () => {
    this.setState({
      seriesA: generateValues(COUNT),
      seriesB: generateValues(COUNT)
    });
  };
}

export default App;
