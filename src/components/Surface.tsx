import * as React from 'react';

interface IDimensions {
  width: number;
  height: number;
}

interface IRenderProps {
  children(props: ISurfaceContext): JSX.Element;
}

interface ISurfaceProps extends IDimensions {
  padding: [number, number, number, number];
}

export type ISurfaceContext = IDimensions;

export const SurfaceContext = React.createContext<ISurfaceContext>({
  width: 100,
  height: 100
});

export const Surface: React.SFC<ISurfaceProps & IRenderProps> = ({
  width,
  height,
  padding,
  children: renderFn
}) => {
  const paddedWidth = width - (padding[1] + padding[3]);
  const paddedHeight = height - (padding[0] + padding[2]);
  return (
    <svg style={{ width, height }}>
      <g transform={`translate(${padding[3]} ,${padding[0]})`}>
        {renderFn({ width: paddedWidth, height: paddedHeight })}
      </g>
    </svg>
  );
};

const SurfaceProvider: React.SFC<ISurfaceProps> = props => {
  return (
    <Surface width={props.width} height={props.height} padding={props.padding}>
      {paddedDimensions => (
        <SurfaceContext.Provider value={paddedDimensions}>
          {props.children}
        </SurfaceContext.Provider>
      )}
    </Surface>
  );
};

export default SurfaceProvider;
