const generateData = {
  generateRandomId(): number {
    const randomId = Math.floor(Math.random() * 90000) + 10000;
    return randomId;
  },
};
export default { ...generateData };
