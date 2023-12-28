import { expect, request } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();

export const ApiPrioticket = () => {
  const url = process.env.PRIO_ENDPOINT;
  const username = process.env.PRIO_USERNAME;
  const password = process.env.PRIO_PASSWORD;
  const distributorId = process.env.DISTRIBUTOR_ID;

  const createToken = async () => {
    const contextRequest = await request.newContext();
    const response = await contextRequest.post(url + 'oauth2/token', {
      headers: {
        Accept: 'application/json',
        Authorization: `Basic ${Buffer.from(`${username}:${password}`).toString(
          'base64',
        )}`,
      },
    });
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    const token = responseBody.access_token;
    return token;
  };

  const getOrderStatus = async (confirmationCode: string) => {
    const token = await createToken();
    const contextRequest = await request.newContext();
    const response = await contextRequest.get(
      url +
        'orders?distributor_id=' +
        distributorId +
        '&order_reference=' +
        confirmationCode +
        '&items_per_page=10&start_index=1&page=1&cache=true',
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      },
    );
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    const orderItems = await responseBody.data.items;
    const orderStatus = await orderItems[0].order_status;
    return orderStatus;
  };

  return { getOrderStatus };
};
