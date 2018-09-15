import * as React from 'react';
import { axisLeft } from 'd3-axis';
import { ScaleContext, IScaleContext } from 'src/components/ScaleProvider';
import { SurfaceContext, ISurfaceContext } from 'src/components/Surface';
import Axis from './Axis';

interface IYAxisProps {
  ticks: number;
}

const YAxis: React.SFC<IYAxisProps & ISurfaceContext & IScaleContext> = ({
  width,
  height,
  yScale,
  ticks
}) => {
  const yAxis = axisLeft(yScale).ticks(ticks);
  return <Axis height={height} axis={yAxis} axisType="y" />;
};

const YAxisWithContext: React.SFC<IYAxisProps> = props => (
  <SurfaceContext.Consumer>
    {surfaceContext => (
      <ScaleContext.Consumer>
        {scaleContext => (
          <YAxis {...props} {...scaleContext} {...surfaceContext} />
        )}
      </ScaleContext.Consumer>
    )}
  </SurfaceContext.Consumer>
);

export default YAxisWithContext;
