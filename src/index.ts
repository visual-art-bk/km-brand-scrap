import { initPlaywright } from "./services/WebAction/init/init";
import WebAction from "./services/WebAction";

export const handler = async () => {
  await WebAction.init();

  const response = {
    statusCode: 200,
    body: JSON.stringify("하이 병관! 테스트중"),
  };
  return response;
};
