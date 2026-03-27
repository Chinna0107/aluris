const config = {
  API_URL: import.meta.env.MODE === 'production'
    ? 'https://your-backend.vercel.app'
    : 'http://localhost:3000'
};

export default config;
