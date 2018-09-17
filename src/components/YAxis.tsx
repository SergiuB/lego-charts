import * as React from 'react';
import { axisLeft } from 'd3-axis';
import { SurfaceContext, ISurfaceContext } from 'src/components/Surface';
import Axis from './Axis';
import { XYScalesContext, IXYScalesContext } from 'src/components/XYScales';

const YAxis: React.SFC<IXYScalesContext & ISurfaceContext> = ({
  width,
  height,
  yScale
}) => {
  const yAxis = axisLeft(yScale).ticks(Math.floor(width / 100));
  return <Axis height={height} axis={yAxis} axisType="y" />;
};

const YAxisWithContext: React.SFC<{}> = props => (
  <SurfaceContext.Consumer>
    {surfaceContext => (
      <XYScalesContext.Consumer>
        {xyScalesContext => (
          <YAxis {...props} {...surfaceContext} {...xyScalesContext} />
        )}
      </XYScalesContext.Consumer>
    )}
  </SurfaceContext.Consumer>
);

export default YAxisWithContext;
