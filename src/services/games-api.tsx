import axiosInstance from '../api/axios-instance';

export const fetchGames = async () => {
  try {
    const response = await axiosInstance.get('/games');
    return response.data.results;
  } catch (error: any) {
    throw error.response?.data || 'An error occurred while fetching games.';
  }
};

export const fetchGameDetails = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/games/${id}`);
    return response.data;
  } catch (error: any) {
    throw (
      error.response?.data || 'An error occurred while fetching game details.'
    );
  }
};
