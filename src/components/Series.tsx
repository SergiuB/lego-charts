import * as React from 'react';

type Point = [number, number];

export interface ISeriesContext {
  points: Point[];
}

interface ISeriesProps {
  points: Point[];
}

export const SeriesContext = React.createContext<ISeriesContext>({
  points: []
});

export default class Series extends React.PureComponent<ISeriesProps> {
  public render() {
    const { points, children } = this.props;
    return (
      <SeriesContext.Provider value={{ points }}>
        {children}
      </SeriesContext.Provider>
    );
  }
}
