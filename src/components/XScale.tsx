import * as React from 'react';
import Scale from './Scale';
import { SurfaceContext, ISurfaceContext } from './Surface';

interface IXScaleProps {
  domain: any[];
  type?: string;
  children: (scale: any) => JSX.Element;
}

export const XScale: React.SFC<
  IXScaleProps & Pick<ISurfaceContext, 'width'>
> = ({ width, ...props }) => <Scale {...props} range={[0, width]} />;

const XScaleWithContext: React.SFC<IXScaleProps> = props => (
  <SurfaceContext.Consumer>
    {surfaceContext => <XScale {...props} {...surfaceContext} />}
  </SurfaceContext.Consumer>
);

export default XScaleWithContext;
