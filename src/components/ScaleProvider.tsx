import * as React from 'react';
import { scaleLinear } from 'd3-scale';
import { SurfaceContext, ISurfaceContext } from 'src/components/Surface';

export interface IScaleContext {
  xScale: any;
  yScale: any;
}

interface IScaleProviderProps {
  xDomain: [number, number];
  yDomain: [number, number];
}

export const ScaleContext = React.createContext<IScaleContext>({
  xScale: null,
  yScale: null
});

const ScaleProvider: React.SFC<IScaleProviderProps & ISurfaceContext> = ({
  xDomain,
  yDomain,
  width,
  height,
  children
}) => (
  <ScaleContext.Provider
    value={{
      xScale: scaleLinear()
        .domain(xDomain)
        .range([0, width]),
      yScale: scaleLinear()
        .domain(yDomain)
        .range([height, 0])
    }}
  >
    {children}
  </ScaleContext.Provider>
);

const ScaleProviderWithContext: React.SFC<IScaleProviderProps> = props => (
  <SurfaceContext.Consumer>
    {surfaceContext => <ScaleProvider {...props} {...surfaceContext} />}
  </SurfaceContext.Consumer>
);

export default ScaleProviderWithContext;
