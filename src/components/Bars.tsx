import * as React from 'react';
import { ISurfaceContext, SurfaceContext } from 'src/components/Surface';
import { XYScalesContext, IXYScalesContext } from 'src/components/XYScales';
// import withContext from './withContext';

type Point = [any, number];

interface IBarsProps {
  points: Point[];
  color: string;
}

const Bars: React.SFC<IBarsProps & ISurfaceContext & IXYScalesContext> = ({
  color,
  xScale,
  yScale,
  height,
  points
}) => {
  console.log(xScale, yScale);
  const xScaleWPadding = xScale.padding(0.5);

  const bars = points.map(([x, y]) => {
    console.log(x, xScaleWPadding(x));
    return (
      <rect
        key={x}
        x={xScaleWPadding(x)}
        y={yScale(y)}
        height={height - yScale(y)}
        width={xScaleWPadding.bandwidth()}
        fill={color}
      />
    );
  });

  return <g>{bars}</g>;
};

const BarsWithContext: React.SFC<IBarsProps> = props => (
  <SurfaceContext.Consumer>
    {surfaceContext => (
      <XYScalesContext.Consumer>
        {xyScalesContext => (
          <Bars {...props} {...surfaceContext} {...xyScalesContext} />
        )}
      </XYScalesContext.Consumer>
    )}
  </SurfaceContext.Consumer>
);

export default BarsWithContext;
