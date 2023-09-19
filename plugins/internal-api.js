export default function ({ $axios }, inject) {
  // Create a custom axios instance
  const internalApi = $axios.create();

  // Set baseURL to something different
  internalApi.setBaseURL('/api/');

  // Inject to context as $personalApi
  inject('internalApi', internalApi);
}
