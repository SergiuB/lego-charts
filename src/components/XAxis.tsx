import * as React from 'react';
import { axisBottom } from 'd3-axis';
import { SurfaceContext, ISurfaceContext } from 'src/components/Surface';
import Axis from './Axis';

interface IXAxisProps {
  xScale: any;
}

const XAxis: React.SFC<ISurfaceContext & IXAxisProps> = ({
  width,
  height,
  xScale
}) => {
  const xAxis = axisBottom(xScale).ticks(Math.floor(width / 100));
  return <Axis height={height} axis={xAxis} axisType="x" />;
};

const XAxisWithContext: React.SFC<IXAxisProps> = props => (
  <SurfaceContext.Consumer>
    {surfaceContext => <XAxis {...props} {...surfaceContext} />}
  </SurfaceContext.Consumer>
);

export default XAxisWithContext;
