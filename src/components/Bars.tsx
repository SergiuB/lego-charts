import * as React from 'react';
import { ISurfaceContext, SurfaceContext } from 'src/components/Surface';
// import withContext from './withContext';

type Point = [any, number];

interface IBarsProps {
  points: Point[];
  color: string;
  xScale: any;
  yScale: any;
}

const Bars: React.SFC<IBarsProps & ISurfaceContext> = ({
  color,
  xScale,
  yScale,
  height,
  points
}) => {
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
    {surfaceContext => <Bars {...props} {...surfaceContext} />}
  </SurfaceContext.Consumer>
);

export default BarsWithContext;
