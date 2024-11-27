import { ProductApi } from "@/api/productApi/ProductApi";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Comment } from "@/types/commentTypes";

const productApi = new ProductApi();

export const getProductThunk = () => {
  return createAsyncThunk("getProduct", async (query: string) => {
    try {
      const response = await productApi.getProducts(query);
      return response;
    } catch (error: any) {
      return error.response.data;
    }
  });
};

export const getProductDetailThunk = () => {
  return createAsyncThunk("getProductDetail", async (productId: string) => {
    try {
      const response = await productApi.getProductDetail(productId);
      return response;
    } catch (error: any) {
      return error.response.data;
    }
  });
};

export const getCommentsThunk = () => {
  return createAsyncThunk("getComments", async (productId: string) => {
    try {
      const response = await productApi.getComments(productId);
      return response;
    } catch (error: any) {
      return error.response.data;
    }
  });
};

export const getAverageRatingThunk = () => {
  return createAsyncThunk("getAverageRating", async (productId: string) => {
    try {
      const response = await productApi.getAverageRating(productId);
      return response;
    } catch (error: any) {
      return error.response.data;
    }
  });
};

export const addCommentThunk = () => {
  return createAsyncThunk("addComment", async (comment: Comment) => {
    try {
      const response = await productApi.addComment(comment);
      return response;
    } catch (error: any) {
      return error.response.data;
    }
  });
};

export const getUserCommentsThunk = () => {
  return createAsyncThunk("getUserComments", async (query: string) => {
    try {
      const response = await productApi.getUserComments(query);
      return response;
    } catch (error: any) {
      return error.response.data;
    }
  });
};