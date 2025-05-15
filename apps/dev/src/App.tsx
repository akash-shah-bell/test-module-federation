import React, { lazy, Suspense } from 'react';

// @ts-ignore
const Button = lazy(() => import('mfe1/Button'));

// import {Button} from "mfe1"

export const App = () => {


setTimeout(() => {
  console.log('button: ', Button)
}, 3000)

  return (
    <div>
      <h1>Hello World</h1>
      <Suspense>
        {Button ? <Button title="Click Me!!!"></Button> : <p>...Loading</p>}
        {/* PLAT3 - ProductCard */}
        {/* PLAT2 - LoginButton */}
        {/* PLAT3 - Carousal */}
      </Suspense>
    </div>
  );
}
