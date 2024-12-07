
import axios from './axios-config'

export async function handleUserSignup(firstname, lastname, email, username, password) {
  // Create the payload object
  const payload = {
    firstname,
    lastname,
    email,
    username,
    password,
  };

  try {
    // Send the POST request using axios
    const response = await axios.post('/api/user', payload);

    // Return the response data
    return response.data;
  } catch (error) {
    // Handle errors
    if (error.response) {
      // Server responded with a status outside the 2xx range
      console.error('Response error:', error.response.data.detail);
      throw new Error(error.response.data.detail);
    } else if (error.request) {
      // No response received from the server
      console.error('Request error:', error.request);
      throw new Error('No response from server.');
    } else {
      // Error setting up the request
      console.error('Unexpected error:', error.message);
      throw new Error('Something went wrong.');
    }
  }
}
