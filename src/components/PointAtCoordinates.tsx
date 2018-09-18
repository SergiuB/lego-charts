import * as React from 'react';
import { SurfaceContext, ISurfaceContext } from 'src/components/Surface';
import { IXYScalesContext, XYScalesContext } from 'src/components/XYScales';
import { bisector } from 'd3-array';

type Point = [number, number];

interface IPointAtCoordinatesProps {
  points: Point[];
}

interface IRenderProps {
  children: (point?: Point) => JSX.Element;
}

const bis = bisector(d => d[0]).left;

const PointAtCoordinates: React.SFC<
  IPointAtCoordinatesProps & ISurfaceContext & IXYScalesContext & IRenderProps
> = ({ mouseX, mouseY, xScale, yScale, points, children: renderFn }) => {
  if (mouseX < 0 || mouseY < 0) {
    return renderFn();
  }

  // invert the scale to get the domain value
  const domainX = xScale.invert(mouseX);

  // bisect the data to get insertion position
  const pos = bis(points, domainX);

  // get the closest smaller and larger values in the data array
  const smaller = points[pos - 1];
  const larger = points[pos];

  if (!smaller) {
    return renderFn(larger);
  }

  if (!larger) {
    return renderFn(smaller);
  }

  // figure out which one is closer to the domain value
  const closest = domainX - smaller[0] < larger[0] - domainX ? smaller : larger;

  return renderFn(closest);
};

const PointAtCoordinatesWithContext: React.SFC<
  IPointAtCoordinatesProps & IRenderProps
> = props => (
  <SurfaceContext.Consumer>
    {surfaceContext => (
      <XYScalesContext.Consumer>
        {xyScalesContext => (
          <PointAtCoordinates
            {...props}
            {...surfaceContext}
            {...xyScalesContext}
          />
        )}
      </XYScalesContext.Consumer>
    )}
  </SurfaceContext.Consumer>
);

export default PointAtCoordinatesWithContext;
