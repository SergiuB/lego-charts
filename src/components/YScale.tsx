import * as React from 'react';
import Scale from './Scale';
import { SurfaceContext, ISurfaceContext } from './Surface';

interface IYScaleProps {
  domain: any[];
  type?: string;
  children: (scale: any) => JSX.Element;
}

const YScale: React.SFC<IYScaleProps & ISurfaceContext> = ({
  height,
  ...props
}) => <Scale {...props} range={[height, 0]} />;

const YScaleWithContext: React.SFC<IYScaleProps> = props => (
  <SurfaceContext.Consumer>
    {surfaceContext => <YScale {...props} {...surfaceContext} />}
  </SurfaceContext.Consumer>
);

export default YScaleWithContext;
