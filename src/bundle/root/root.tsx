import { Global } from '@emotion/react';
import * as React from 'react';
import { App } from './app';
import "@fontsource/poppins";

export const RootApp = () => {
  return (
    <>
    <Global styles={{
      '*': {
        boxSizing: 'border-box',
      },
      body: {
        margin: 0,
        padding: 0,
        background: "#000",
        color: "#DFDFDF",
        fontFamily: "Poppins, sans-serif"
      },
    }} />
    <App />
    </>
  );
};