import * as React from 'react';
import { scaleBand, scaleLinear } from 'd3-scale';

export interface IScaleProps {
  domain: any[];
  range: [number, number];
  type?: string;
  children: (scale: any) => JSX.Element;
}

const scaleTypeToGeneratorMap = {
  linear: scaleLinear,
  band: scaleBand
};

const Scale: React.SFC<IScaleProps> = ({
  domain,
  range,
  type = 'linear',
  children: renderFn
}) =>
  renderFn(
    scaleTypeToGeneratorMap[type]()
      .domain(domain)
      .range(range)
  );

export default Scale;
