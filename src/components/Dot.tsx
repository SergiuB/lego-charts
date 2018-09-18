import * as React from 'react';
import { XYScalesContext, IXYScalesContext } from 'src/components/XYScales';
import { Point } from 'src/types';

interface IDotProps {
  point: Point;
  color: string;
  radius?: number;
}

export const Dot: React.SFC<IDotProps & IXYScalesContext> = ({
  color,
  radius = 5,
  xScale,
  yScale,
  point
}) => {
  const [x, y] = point;
  const dot = (
    <circle
      key={x}
      r={radius}
      cx={xScale(x) || 0}
      cy={yScale(y) || 0}
      fill={color}
    />
  );

  return <g>{dot}</g>;
};

const DotWithContext: React.SFC<IDotProps> = props => (
  <XYScalesContext.Consumer>
    {xyScalesContext => <Dot {...props} {...xyScalesContext} />}
  </XYScalesContext.Consumer>
);

export default DotWithContext;
