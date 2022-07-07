import axios from 'axios'

import {baseApiEndpoint} from '../config/config'

export const getAllArticles = async () => {
  try {
    const response = await axios.get(`${baseApiEndpoint}/articles/all`);
    if (response.data) {
      if (response.data.length > 0) {
        return response.data
      }
    }
    return [];
  } catch (error) {
    return [];
  }
}

export const getArticleById = async (id) => {
  try {
    const response = await axios.get(`${baseApiEndpoint}/articles/${id}`);
    console.log("response", response)
    if (response.data) {
        return response.data
    }
    return null;
  } catch (error) {
    return null;
  }
}

export const deleteArticleById = async (id) => {
  try {
    const response = await axios.delete(`${baseApiEndpoint}/articles/${id}`);
    if (response) {
      if (response.status === 200) {
        return true
      }
    }
    return null;
  } catch (error) {
    return null;
  }
}

export const updateArticleById = async (id, heading, content) => {
  try {
    const response = await axios.post(`${baseApiEndpoint}/articles/${id}`, {heading: heading, content: content});
    console.log(response)
    if (response) {
      if (response.status === 200) {
        return response.data[0]
      }
    }
    return null;
  } catch (error) {
    return null;
  }
}

export const createArticle = async (heading, content) => {
  try {
    const response = await axios.put(`${baseApiEndpoint}/articles`, {heading: heading, content:content});
    if (response) {
      if (response.status === 200) {
        return response.data.id
      }
    }
    return null;
  } catch (error) {
    return null;
  }
}