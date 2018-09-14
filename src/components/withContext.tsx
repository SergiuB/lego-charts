import * as React from 'react';
import { Context } from 'react';

export default function withContext<T, P>(
  context: Context<T>,
  WrappedComponent: React.SFC<P & T>
) {
  const WithContext: React.SFC<P> = (props) => (
    <context.Consumer>
      {(contextValue: T) => <WrappedComponent {...props} {...contextValue} />}
    </context.Consumer>
  );

  return WithContext;
}