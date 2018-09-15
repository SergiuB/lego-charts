import * as React from 'react';
import Surface from 'src/components/Surface';
import ScaleProvider from 'src/components/ScaleProvider';
import Line from 'src/components/Line';
import XAxis from 'src/components/XAxis';
import YAxis from 'src/components/YAxis';
import Animation from 'src/components/Animation';

class App extends React.Component {
  public render() {
    return (
      <Surface width={600} height={400} padding={[10, 10, 20, 30]}>
        <ScaleProvider xDomain={[1, 3]} yDomain={[10, 130]}>
          <XAxis />
          <YAxis ticks={5} />
          <Animation values={[10, 30, 130]}>
            {({ values: yValues }) => (
              <Line
                color="red"
                points={[[1, yValues[0]], [2, yValues[1]], [3, yValues[2]]]}
              />
            )}
          </Animation>
          <Line color="blue" points={[[1, 50], [2, 20], [3, 90]]} />
        </ScaleProvider>
      </Surface>
    );
  }
}

export default App;
