import * as React from 'react';

interface IDimensions {
  width: number;
  height: number;
}

interface IMouseCoordinates {
  mouseX: number;
  mouseY: number;
}

interface IRenderProps {
  children: (props: ISurfaceContext) => JSX.Element;
}

interface ISurfaceProps extends IDimensions {
  padding?: [number, number, number, number];
  opacity?: number;
  onMouseMove?: React.MouseEventHandler;
}

export type ISurfaceContext = IDimensions & IMouseCoordinates;

export const SurfaceContext = React.createContext<ISurfaceContext>({
  width: 100,
  height: 100,
  mouseX: -1,
  mouseY: -1
});

export class Surface extends React.Component<ISurfaceProps & IRenderProps> {
  public state = {
    mouseX: -1,
    mouseY: -1
  };

  public render() {
    const {
      width,
      height,
      padding = [0, 0, 0, 0],
      opacity = 1,
      children: renderFn
    } = this.props;
    const [pt, pr, pb, pl] = padding;
    const paddedWidth = width - (pl + pr);
    const paddedHeight = height - (pt + pb);
    return (
      <svg
        style={{ width, height, opacity }}
        onMouseMove={this.handleMouseMove}
      >
        <g transform={`translate(${pl} ,${pt})`}>
          {renderFn({
            width: paddedWidth,
            height: paddedHeight,
            ...this.state
          })}
        </g>
      </svg>
    );
  }

  private handleMouseMove = (event: React.MouseEvent<Element>) => {
    const { left, top } = event.currentTarget.getBoundingClientRect();
    const { width, height, padding = [0, 0, 0, 0] } = this.props;
    const [pt, pr, pb, pl] = padding;
    const paddedWidth = width - (pl + pr);
    const paddedHeight = height - (pt + pb);

    const mouseX = event.clientX - left - pl;
    const mouseY = event.clientY - top - pt;

    if (
      mouseX < 0 ||
      mouseX >= paddedWidth ||
      mouseY < 0 ||
      mouseY >= paddedHeight
    ) {
      this.setState({ mouseX: -1, mouseY: -1 });
    } else {
      this.setState({ mouseX, mouseY });
    }
  };
}

const SurfaceProvider: React.SFC<ISurfaceProps> = props => {
  return (
    <Surface
      width={props.width}
      height={props.height}
      padding={props.padding}
      opacity={props.opacity}
      onMouseMove={props.onMouseMove}
    >
      {paddedDimensions => (
        <SurfaceContext.Provider value={paddedDimensions}>
          {props.children}
        </SurfaceContext.Provider>
      )}
    </Surface>
  );
};

export default SurfaceProvider;
