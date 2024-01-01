import { faker } from '@faker-js/faker/locale/en_GB';
import { UserData } from '../models/userData.model';

export const UserDataGenerator = () => {
  const createRandomUser = async () => {
    // if (!userData) {
    const countries = ["United Kingdom", "Poland", "Germany", "United States", "Italy", "India", "China", "Afghanistan", "Albania"];
    const randomCountry = countries[Math.floor(Math.random() * countries.length)];
    
    let userData: UserData = {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.person.firstName() + '@gmail.com',
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
