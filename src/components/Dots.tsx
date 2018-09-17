import * as React from 'react';
import { ISurfaceContext, SurfaceContext } from 'src/components/Surface';
import { XYScalesContext, IXYScalesContext } from 'src/components/XYScales';

type Point = [any, number];

interface IDotsProps {
  points: Point[];
  color: string;
  radius?: number;
}

const Dots: React.SFC<IDotsProps & ISurfaceContext & IXYScalesContext> = ({
  color,
  radius = 5,
  xScale,
  yScale,
  height,
  points
}) => {
  const dots = points.map(([x, y]) => {
    return (
      <circle
        key={x}
        r={radius}
        cx={xScale(x) || 0}
        cy={yScale(y) || 0}
        fill={color}
      />
    );
  });

  return <g>{dots}</g>;
};

const DotsWithContext: React.SFC<IDotsProps> = props => (
  <SurfaceContext.Consumer>
    {surfaceContext => (
      <XYScalesContext.Consumer>
        {xyScalesContext => (
          <Dots {...props} {...surfaceContext} {...xyScalesContext} />
        )}
      </XYScalesContext.Consumer>
    )}
  </SurfaceContext.Consumer>
);

export default DotsWithContext;
