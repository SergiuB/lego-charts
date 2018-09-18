import * as React from 'react';
import { axisBottom } from 'd3-axis';
import { SurfaceContext, ISurfaceContext } from 'src/components/Surface';
import Axis from './Axis';
import { IXYScalesContext, XYScalesContext } from 'src/components/XYScales';

export const XAxis: React.SFC<
  Pick<ISurfaceContext, 'height' | 'width'> & Pick<IXYScalesContext, 'xScale'>
> = ({ width, height, xScale }) => {
  const xAxis = axisBottom(xScale).ticks(Math.floor(width / 100));
  return <Axis height={height} axis={xAxis} axisType="x" />;
};

const XAxisWithContext: React.SFC<{}> = props => (
  <SurfaceContext.Consumer>
    {surfaceContext => (
      <XYScalesContext.Consumer>
        {xyScalesContext => (
          <XAxis {...props} {...surfaceContext} {...xyScalesContext} />
        )}
      </XYScalesContext.Consumer>
    )}
  </SurfaceContext.Consumer>
);

export default XAxisWithContext;
