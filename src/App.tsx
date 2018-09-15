import * as React from 'react';
import Surface from 'src/components/Surface';
import ScaleProvider from 'src/components/ScaleProvider';
import Line from 'src/components/Line';
import XAxis from 'src/components/XAxis';

class App extends React.Component {
  public render() {
    return (
      <Surface width={600} height={400} padding={[10, 10, 20, 10]}>
        <ScaleProvider xDomain={[1, 3]} yDomain={[10, 130]}>
          <XAxis />
          <Line color="red" points={[[1, 10], [2, 30], [3, 130]]} />
          <Line color="blue" points={[[1, 50], [2, 20], [3, 90]]} />
        </ScaleProvider>
      </Surface>
    );
  }
}

export default App;
