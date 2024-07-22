import { faker } from '@faker-js/faker/locale/en_GB';
import { UserData } from '../models/userData.model';

export const UserDataGenerator = () => {
  const createRandomUser = async () => {
    // if (!userData) {
    // const countries = ["United Kingdom", "Poland", "Germany", "Italy", "India", "China", "Afghanistan", "Albania"];
    const countries = ["Ireland"];
    const randomCountry = countries[Math.floor(Math.random() * countries.length)];

  //"United States" - region is required in the payment page
    
    const userData: UserData = {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(), //@params TODO
      phone: faker.phone.number(),
      country: randomCountry,
      street1: faker.location.street(),
      street2: faker.location.street(),
      city: faker.location.city(),
      zipCode: faker.location.zipCode(),
    };

    return userData;
  };
  return { createRandomUser };
};
