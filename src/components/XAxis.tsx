import * as React from 'react';
import { axisBottom } from 'd3-axis';
import { ScaleContext, IScaleContext } from 'src/components/ScaleProvider';
import { SurfaceContext, ISurfaceContext } from 'src/components/Surface';
import Axis from './Axis';

const XAxis: React.SFC<ISurfaceContext & IScaleContext> = ({
  width,
  height,
  xScale
}) => {
  const xAxis = axisBottom(xScale).ticks(Math.floor(width / 100));
  return <Axis height={height} axis={xAxis} axisType="x" />;
};

const XAxisWithContext: React.SFC<{}> = () => (
  <SurfaceContext.Consumer>
    {surfaceContext => (
      <ScaleContext.Consumer>
        {scaleContext => <XAxis {...scaleContext} {...surfaceContext} />}
      </ScaleContext.Consumer>
    )}
  </SurfaceContext.Consumer>
);

export default XAxisWithContext;
