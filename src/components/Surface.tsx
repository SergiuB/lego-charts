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
  const [pt, pr, pb, pl] = padding;
  const paddedWidth = width - (pl + pr);
  const paddedHeight = height - (pt + pb);
  return (
    <svg style={{ width, height }}>
      <g transform={`translate(${pl} ,${pt})`}>
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
