import * as React from 'react';
import Surface from 'src/components/Surface';
import ScaleProvider from 'src/components/ScaleProvider';
import Series from 'src/components/Series';
import Line from 'src/components/Line';

class App extends React.Component {
  public render() {
    return (
      <Surface width={600} height={400}>
        <ScaleProvider xMin={1} xMax={3} yMin={10} yMax={130}>
          <Series points={[[1, 10], [2, 30], [3, 130]]}>
            <Line color="red" />
          </Series>
          <Series points={[[1, 50], [2, 20], [3, 90]]}>
            <Line color="blue" />
          </Series>
        </ScaleProvider>
      </Surface>
    );
  }
}

export default App;
