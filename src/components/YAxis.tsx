import * as React from 'react';
import { axisLeft } from 'd3-axis';
import { SurfaceContext, ISurfaceContext } from 'src/components/Surface';
import Axis from './Axis';

interface IYAxisProps {
  yScale: any;
}

const YAxis: React.SFC<IYAxisProps & ISurfaceContext> = ({
  width,
  height,
  yScale
}) => {
  const yAxis = axisLeft(yScale).ticks(Math.floor(width / 100));
  return <Axis height={height} axis={yAxis} axisType="y" />;
};

const YAxisWithContext: React.SFC<IYAxisProps> = props => (
  <SurfaceContext.Consumer>
    {surfaceContext => <YAxis {...props} {...surfaceContext} />}
  </SurfaceContext.Consumer>
);

export default YAxisWithContext;
