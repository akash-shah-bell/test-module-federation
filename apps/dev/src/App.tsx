import { Button, useHelloWorld } from "@explat-mfe/blue-template/index";

// {@link https://stackoverflow.com/a/76774967}
(global as any).$RefreshReg$ = () => { };
(global as any).$RefreshSig$ = () => () => { };

export const App = () => {

  const result = useHelloWorld()
  console.log('useHelloWorld: ', result)

  return (
    <div>
      <h1>Hello World</h1>
      <Button title="Click Me!!!" onClick={() => alert("hello world!!!")} />
    </div>
  );
}

export default App;