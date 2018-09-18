import * as React from 'react';
import { curveCardinal } from 'd3-shape';
import { line } from 'd3-shape';
import { XYScalesContext, IXYScalesContext } from 'src/components/XYScales';
import { Point } from 'src/types';

interface ILineProps {
  points: Point[];
  color: string;
}

export const Line: React.SFC<ILineProps & IXYScalesContext> = ({
  color,
  xScale,
  yScale,
  points
}) => {
  const linePath = line()
    .x(d => xScale(d[0]) || 0)
    .y(d => yScale(d[1]) || 0)
    .curve(curveCardinal.tension(0.1));

  return (
    <g>
      <path
        d={linePath(points)!}
        stroke={color}
        strokeLinecap="round"
        fill="none"
        strokeWidth={3}
      />
    </g>
  );
};

const LineWithContext: React.SFC<ILineProps> = props => (
  <XYScalesContext.Consumer>
    {xyScalesContext => <Line {...props} {...xyScalesContext} />}
  </XYScalesContext.Consumer>
);

export default LineWithContext;
