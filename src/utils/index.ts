import type { BrigdeData } from "@/types";

export const postMessageToWebView = (bridgeData: BrigdeData) => {
  try {
    if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage(JSON.stringify(bridgeData));
    }

    throw new Error('window.ReactNativeWebView가 존재하지 않습니다.');
  } catch (error) {
    console.error("postMessageToWebView post message failed"); 
    console.error(error); 
  }
};
