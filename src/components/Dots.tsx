import * as React from 'react';
import { XYScalesContext, IXYScalesContext } from 'src/components/XYScales';
import { Dot } from 'src/components/Dot';

type Point = [any, number];

interface IDotsProps {
  points: Point[];
  color: string;
  radius?: number;
}

export const Dots: React.SFC<IDotsProps & IXYScalesContext> = ({
  color,
  radius = 5,
  xScale,
  yScale,
  points
}) => {
  const dots = points.map(point => {
    return (
      <Dot
        key={point[0]}
        radius={radius}
        color={color}
        xScale={xScale}
        yScale={yScale}
        point={point}
      />
    );
  });

  return <g>{dots}</g>;
};

const DotsWithContext: React.SFC<IDotsProps> = props => (
  <XYScalesContext.Consumer>
    {xyScalesContext => <Dots {...props} {...xyScalesContext} />}
  </XYScalesContext.Consumer>
);

export default DotsWithContext;
