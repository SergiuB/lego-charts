import * as React from 'react';
import { select } from 'd3-selection';
import { Axis as AxisType, AxisDomain } from 'd3-axis';

interface IAxis {
  height: number;
  axis: AxisType<AxisDomain>;
  axisType: 'x' | 'y';
}

export default class Axis extends React.Component<IAxis> {
  private gEl: any;
  public componentDidMount() {
    this.renderAxis();
  }

  public componentDidUpdate() {
    this.renderAxis();
  }

  public renderAxis = () => {
    select(this.gEl).call(this.props.axis);
  };

  public render() {
    const translate = `translate(0,${this.props.height})`;

    return (
      <g
        className="axis"
        transform={this.props.axisType === 'x' ? translate : ''}
        ref={el => {
          this.gEl = el;
        }}
      />
    );
  }
}
