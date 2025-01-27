import WebActionService  from './WebActionService'

export const handler = (async () => {

  await WebActionService.init()

  const response = {
    statusCode: 200,
    body: JSON.stringify("하이 병관!"),
  };
  return response;
})()
