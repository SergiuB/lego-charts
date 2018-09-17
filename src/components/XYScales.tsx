import * as React from 'react';
import { SurfaceContext, ISurfaceContext } from 'src/components/Surface';
import { XScale } from 'src/components/XScale';
import { YScale } from 'src/components/YScale';

export interface IXYScalesContext {
  xScale: any;
  yScale: any;
}

interface IXYScalesProps {
  xDomain: any[];
  yDomain: any[];
  xType?: string;
  yType?: string;
}

interface IRenderProps {
  children: (props: IXYScalesContext) => JSX.Element;
}

export const XYScalesContext = React.createContext<IXYScalesContext>({
  xScale: null,
  yScale: null
});

const XYScales: React.SFC<IXYScalesProps & ISurfaceContext & IRenderProps> = ({
  xDomain,
  yDomain,
  xType = 'linear',
  yType = 'linear',
  width,
  height,
  children: renderFn
}) => (
  <XScale domain={xDomain} width={width} type={xType}>
    {xScale => (
      <YScale domain={yDomain} height={height} type={yType}>
        {yScale => renderFn({ xScale, yScale })}
      </YScale>
    )}
  </XScale>
);

const XYScalesWithContext: React.SFC<IXYScalesProps> = props => (
  <SurfaceContext.Consumer>
    {surfaceContext => (
      <XYScales {...props} {...surfaceContext}>
        {scales => (
          <XYScalesContext.Provider value={scales}>
            {props.children}
          </XYScalesContext.Provider>
        )}
      </XYScales>
    )}
  </SurfaceContext.Consumer>
);

export default XYScalesWithContext;
