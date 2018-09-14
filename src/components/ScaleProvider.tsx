import * as React from 'react';
import { scaleLinear } from 'd3-scale';
import { SurfaceContext, IDimensions } from 'src/components/Surface';
// import withContext from './withContext';

export interface IScaleContext {
  xScale: any;
  yScale: any;
}


interface IScaleProviderProps {
  xMin: number;
  xMax: number;
  yMin: number;
  yMax: number;
}

export const ScaleContext = React.createContext<IScaleContext>({
  xScale: null,
  yScale: null
});

const ScaleProvider: React.SFC<IScaleProviderProps & IDimensions> = ({
  xMin,
  xMax,
  yMin,
  yMax,
  width,
  height,
  children
}) => (
    <ScaleContext.Provider
      value={{
        xScale: scaleLinear()
          .domain([xMin, xMax])
          .rangeRound([0, width]),
        yScale: scaleLinear()
          .domain([yMin, yMax])
          .range([height, 0])
      }}
    >
      {children}
    </ScaleContext.Provider>
  );

// type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

// function merge<T, P extends keyof T>(props: Omit<T, P>, context: T): P {
//   return Object.assign(props, context) as P;
// }

const ScaleProviderWithContext: React.SFC<IScaleProviderProps> = props => (
  <SurfaceContext.Consumer>
    {(surfaceContext) =>
      <ScaleProvider {...props} {...surfaceContext} />
    }
  </SurfaceContext.Consumer>
)

export default ScaleProviderWithContext;

// export default withContext<IDimensions, IScaleProviderProps>(SurfaceContext, ScaleProvider);

// export default class Series extends React.PureComponent<IScaleProviderProps> {
//   public render() {
//     const { points, children } = this.props;
//     return (
//       <SurfaceContext.Consumer>
//         {({ width, height }) => {
//           const { xScale, yScale } = getXYScales(width, height, points);
//           return (
//             <SeriesContext.Provider value={{ xScale, yScale, points }}>
//               {children}
//             </SeriesContext.Provider>
//           );
//         }}
//       </SurfaceContext.Consumer>
//     );
//   }
// }

// cla
