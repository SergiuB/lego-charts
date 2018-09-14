import * as React from 'react';
import { curveCardinal } from 'd3-shape';
import { line } from 'd3-shape';
import { SeriesContext, ISeriesContext } from 'src/components/Series';
import { ScaleContext, IScaleContext } from 'src/components/ScaleProvider';
// import withContext from './withContext';

interface ILineProps {
  color: string;
}

const Line: React.SFC<ILineProps & ISeriesContext & IScaleContext> = ({ color, xScale, yScale, points }) => {
  const linePath = line()
    .x(d => xScale(d[0]))
    .y(d => yScale(d[1]))
    .curve(curveCardinal.tension(0.1));

  return (
    <g>
      <path
        d={linePath(points)!}
        stroke={color}
        strokeLinecap="round"
        fill="none"
        strokeWidth={3}
      />
    </g>
  );
}


// const LineSeries = withContext<ISeriesContext, ILineProps>(SeriesContext, Line);

// export withContext<IScaleContext, ISeriesContext & ILineProps>(ScaleContext, LineSeries);

const LineWithContext: React.SFC<ILineProps> = props => (
  <ScaleContext.Consumer>
    {(scaleContext) =>
      <SeriesContext.Consumer>
        {(seriesContext) =>
          <Line {...props} {...scaleContext} {...seriesContext} />
        }
      </SeriesContext.Consumer>
    }
  </ScaleContext.Consumer>
)

export default LineWithContext;

