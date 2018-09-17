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
  const xScaleWPadding = xScale.padding(0.5);

  const bars = points.map(([x, y]) => {
    return (
      <rect
        key={x}
        x={xScaleWPadding(x) || 0}
        y={yScale(y) || 0}
        height={height - (yScale(y) || 0)}
        width={xScaleWPadding.bandwidth() || 0}
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
