/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from '../api/axios-instance';

export const fetchGames = async (filters: Record<string, string>) => {
  try {
    const response = await axiosInstance.get('/games', { params: filters });
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

export const fetchGameScreenshots = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/games/${id}/screenshots`);
    if (response.data.results.length > 0) {
      return response.data.results;
    }

    const gameDetails = await fetchGameDetails(id);
    return [
      { id: `${id}-bg1`, image: gameDetails.background_image },
      { id: `${id}-bg2`, image: gameDetails.background_image_additional },
    ];
  } catch (error: any) {
    throw (
      error.response?.data ||
      'An error occurred while fetching game screenshots.'
    );
  }
};

export const fetchGameStores = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/games/${id}/stores`);
    return response.data.results;
  } catch (error: any) {
    throw (
      error.response?.data || 'An error occurred while fetching game stores.'
    );
  }
};
