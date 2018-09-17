import * as React from 'react';
import Surface from 'src/components/Surface';
import Line from 'src/components/Line';
import XAxis from 'src/components/XAxis';
import YAxis from 'src/components/YAxis';
import XScale from 'src/components/XScale';
import YScale from 'src/components/YScale';
import Animation from 'src/components/Animation';
import Bars from 'src/components/Bars';

class App extends React.Component {
  public render() {
    return (
      <Surface width={600} height={400} padding={[10, 10, 20, 30]}>
        <YScale domain={[10, 130]}>
          {yScale => (
            <React.Fragment>
              <XScale domain={['apples', 'oranges', 'pears']} type="band">
                {xScale => (
                  <React.Fragment>
                    <XAxis xScale={xScale} />
                    <Bars
                      color="green"
                      points={[['apples', 50], ['oranges', 20], ['pears', 90]]}
                      xScale={xScale}
                      yScale={yScale}
                    />
                  </React.Fragment>
                )}
              </XScale>
              <XScale domain={[1, 3]}>
                {xScale => (
                  <React.Fragment>
                    <XAxis xScale={xScale} />
                    <YAxis yScale={yScale} />
                    <Animation values={[10, 30, 130]}>
                      {({ values: yValues }) => (
                        <Line
                          color="red"
                          points={[
                            [1, yValues[0]],
                            [2, yValues[1]],
                            [3, yValues[2]]
                          ]}
                          xScale={xScale}
                          yScale={yScale}
                        />
                      )}
                    </Animation>
                    <Line
                      color="blue"
                      points={[[1, 50], [2, 20], [3, 90]]}
                      xScale={xScale}
                      yScale={yScale}
                    />
                  </React.Fragment>
                )}
              </XScale>
            </React.Fragment>
          )}
        </YScale>
      </Surface>
    );
  }
}

export default App;
