import * as React from 'react';

export interface IDimensions {
  width: number;
  height: number;
}

export const SurfaceContext = React.createContext<IDimensions>({
  width: 100,
  height: 100
});

const Surface: React.SFC<IDimensions> = ({ width, height, children }) => (
  <svg style={{ width, height }}>
    <SurfaceContext.Provider value={{ width, height }}>
      {children}
    </SurfaceContext.Provider>
  </svg>
);

// styled<{ width: number; height: number }, 'svg'>('svg')`
//   width: ${props => props.width}px;
//   height: ${props => props.height}px;
// `;

export default Surface;

// export default class Surface extends Component {
//   state = {
//     mouseScreenCoordinates: null
//   };

//   handleMouseMove = evt => {
//     const mouseScreenCoordinates = evt.currentTarget.createSVGPoint();
//     mouseScreenCoordinates.x = evt.clientX;
//     mouseScreenCoordinates.y = evt.clientY;
//     this.setState({ mouseScreenCoordinates });
//   };

//   handleMouseLeave = () => {
//     this.setState({ mouseScreenCoordinates: null });
//   };

//   render() {
//     const { mouseScreenCoordinates } = this.state;
//     const { width, height, padding, children: renderFn } = this.props;
//     const calculatedWidth = width - (padding[1] + padding[3]);
//     const calculatedHeight = height - (padding[0] + padding[2]);

//     return (
//       <Broadcast
//         channel="mouseScreenCoordinates"
//         value={mouseScreenCoordinates}
//         >
//         <svg
//           className="chart"
//           style={{ width, height }}
//           ref={svgEl => (this.svgEl = svgEl)}
//           onMouseMove={this.handleMouseMove}
//           onMouseLeave={this.handleMouseLeave}
//           >
//           <g transform={`translate(${padding[3]} ,${padding[0]})`}>
//             {renderFn({ width: calculatedWidth, height: calculatedHeight, surfaceDimensions: { width, height, padding } })}
//           </g>
//         </svg>
//       </Broadcast>
//     );
//   }
// };
