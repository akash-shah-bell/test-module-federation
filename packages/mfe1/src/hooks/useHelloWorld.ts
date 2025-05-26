// @ts-ignore
import { useHelloWorld2 } from "@remote/mfe2/index";

export const useHelloWorld = () => {

  const data = useHelloWorld2();
  
  return {
    blueMsg: 'message from blue-template',
    greenMsg: data.msg,
  }
}