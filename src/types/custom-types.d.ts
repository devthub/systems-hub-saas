import { ReactChild, ReactNodeArray, ReactPortal } from 'react';

export type StrictReactFragment =
  | {
      key?: string | number | null;
      ref?: null;
      props?: {
        children?: StrictReactNode;
      };
    }
  | ReactNodeArray;

export type StrictReactNode = ReactChild | StrictReactFragment | ReactPortal | boolean | null | undefined;
