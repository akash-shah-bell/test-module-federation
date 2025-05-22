import { useHelloWorld2 } from "@explat-mfe/green-template/index";

export const useHelloWorld = () => {
  
  const data = useHelloWorld2();
  
  return {
    blueMsg: 'message from blue-template',
    greenMsg: data.msg,
  }
}