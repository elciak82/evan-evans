import { expect, request } from '@playwright/test';
import dotenv from 'dotenv';
// dotenv.config();

export const ApiPrioticket = () => {
  const url = process.env.PRIO_ENDPOINT;
  const username = 'evanevans-cmsdemo@prioapi.com';
  // const username = process.env.PRIO_USERNAME;
  const password = 'O*eXM#XG?Z8cSSi';
  // const password = process.env.PRIO_PASSWORD;
  const distributorId = process.env.DISTRIBUTOR_ID;
  let token = '';

  const createToken = async (): Promise<string> => {
    const contextRequest = await request.newContext();
    console.log(contextRequest);
    console.log(url);
    console.log(username);
    console.log(password);
    const response = await contextRequest.post(url + 'oauth2/token', {
      headers: {
        Accept: 'application/json',
        Authorization: `Basic ${Buffer.from(`${username}:${password}`).toString(
          'base64',
        )}`,
      },
    });
    console.log(response);
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    const token = responseBody.access_token;
    return token;
  };

  const getOrderStatus = async (confirmationCode: string): Promise<string> => {
    if (!token) {
      token = await createToken();
    }
    const contextRequest = await request.newContext();
    const response = await contextRequest.get(
      // url +
      //   'orders?distributor_id=' +
      //   distributorId +
      //   '&order_reference=' +
      //   confirmationCode +
      //   '&items_per_page=10&start_index=1&page=1&cache=true',
      url +
        'orders/' + confirmationCode + '',
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      },
    );
    console.log(confirmationCode);
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    console.log(responseBody);
    const orderItems = await responseBody.data.order.items;
    console.log(orderItems);
    const orderStatus = await orderItems[0].order_status;
    console.log(orderStatus);
    return orderStatus;

  };

  return { getOrderStatus };
};
