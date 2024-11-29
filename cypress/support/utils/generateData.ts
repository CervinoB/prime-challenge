const generateData = {
  generateRandomId(): number {
    const randomId = Math.floor(Math.random() * 90000) + 10000;
    return randomId;
  },

  generateRandomData: () => {
    const randomString = (length: number) =>
      Math.random()
        .toString(36)
        .substring(2, 2 + length);
    const randomNumber = (length: number) =>
      Math.floor(Math.random() * Math.pow(10, length))
        .toString()
        .padStart(length, "0");

    return {
      name: `User ${randomString(5)}`,
      phone: randomNumber(11),
      email: `user${randomString(5)}@example.com`,
      cep: randomNumber(8),
      houseNumber: randomNumber(3),
      address: `Street ${randomString(10)}, City ${randomString(5)}`,
      complement: `Apt ${randomNumber(3)}`,
      country: "Brasil",
      gender: ["Masculino", "Feminino"][Math.floor(Math.random() * 2)],
      tools: ["Cypress", "Selenium", "Puppeteer"][
        Math.floor(Math.random() * 3)
      ],
      image: "cypress/fixtures/images/detective-1424831_640.png",
    };
  },
};
export default { ...generateData };
