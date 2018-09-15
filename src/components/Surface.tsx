import * as React from 'react';

interface IDimensions {
  width: number;
  height: number;
}

interface ISurfaceProps extends IDimensions {
  padding: [number, number, number, number];
}

export type ISurfaceContext = IDimensions;

export const SurfaceContext = React.createContext<ISurfaceContext>({
  width: 100,
  height: 100
});

const Surface: React.SFC<ISurfaceProps> = ({
  width,
  height,
  padding,
  children
}) => {
  const paddedWidth = width - (padding[1] + padding[3]);
  const paddedHeight = height - (padding[0] + padding[2]);
  return (
    <svg style={{ width, height }}>
      <g transform={`translate(${padding[3]} ,${padding[0]})`}>
        <SurfaceContext.Provider
          value={{ width: paddedWidth, height: paddedHeight }}
        >
          {children}
        </SurfaceContext.Provider>
      </g>
    </svg>
  );
};

export default Surface;
