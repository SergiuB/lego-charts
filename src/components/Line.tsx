import * as React from 'react';
import { curveCardinal } from 'd3-shape';
import { line } from 'd3-shape';
// import withContext from './withContext';

type Point = [number, number];

interface ILineProps {
  points: Point[];
  color: string;
  xScale: any;
  yScale: any;
}

const Line: React.SFC<ILineProps> = ({ color, xScale, yScale, points }) => {
  const linePath = line()
    .x(d => xScale(d[0]))
    .y(d => yScale(d[1]))
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

export default Line;
