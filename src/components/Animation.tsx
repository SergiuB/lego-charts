import * as React from 'react';
import NodeGroup from 'react-move/NodeGroup';
import { easeBounceInOut } from 'd3-ease';

const timing = { ease: easeBounceInOut, duration: 1000 };

interface IAnimationProps {
  values: number[];
}

interface IRenderProps {
  children(props: IAnimationProps): JSX.Element;
}

const toObject = (v: number) => ({ v });
const fromObject = ({ v }: { v: number }) => v;

const keyAccessor = (d: any, i: number) => i.toString();

const start = () => ({
  v: 0
});

const enter = ({ v }: { v: number }) => ({
  v: [v],
  timing
});

const update = enter;

const Animation: React.SFC<IAnimationProps & IRenderProps> = ({
  values,
  children: renderFn
}) => (
  <NodeGroup
    data={values.map(toObject)}
    keyAccessor={keyAccessor}
    start={start}
    enter={enter}
    update={update}
  >
    {nodes => {
      const newData = nodes.map(({ data, state }) => ({
        ...data,
        v: state.v
      }));

      return renderFn({ values: newData.map(fromObject) });
    }}
  </NodeGroup>
);

export default Animation;
