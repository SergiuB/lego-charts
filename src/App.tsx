import * as React from 'react';
import Surface from 'src/components/Surface';
import Line from 'src/components/Line';
import XAxis from 'src/components/XAxis';
import YAxis from 'src/components/YAxis';
import XYScales from 'src/components/XYScales';
import Animation from 'src/components/Animation';
import Bars from 'src/components/Bars';

class App extends React.Component {
  public render() {
    return (
      <Surface width={600} height={400} padding={[10, 10, 20, 30]}>
        <XYScales
          yDomain={[10, 130]}
          xDomain={['apples', 'oranges', 'pears']}
          xType="band"
        >
          <XAxis />
          <Bars
            color="green"
            points={[['apples', 50], ['oranges', 20], ['pears', 90]]}
          />
        </XYScales>
        <XYScales yDomain={[10, 130]} xDomain={[1, 3]}>
          <XAxis />
          <YAxis />
          <Animation values={[10, 30, 130]}>
            {({ values: yValues }) => (
              <Line
                color="red"
                points={[[1, yValues[0]], [2, yValues[1]], [3, yValues[2]]]}
              />
            )}
          </Animation>
          <Line color="blue" points={[[1, 50], [2, 20], [3, 90]]} />
        </XYScales>
      </Surface>
    );
  }
}

export default App;
