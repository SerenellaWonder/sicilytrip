export default () => ({
  partnerSolution: {
    baseUrl: process.env.PARTNERSOLUTION_BASE_URL,
    apiKey: process.env.PARTNERSOLUTION_API_KEY,
    timeout: parseInt(
      process.env.PARTNERSOLUTION_TIMEOUT || '30000',
      10,
    ),
  },
});