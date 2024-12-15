import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getProductDetailThunk,
  getProductThunk,
  getCommentsThunk,
  getAverageRatingThunk,
  addCommentThunk,
  getUserCommentsThunk,
} from "./productThunk";
import { Product, ProductState } from "@/types/productTypes";
import { Comment, CommentState } from "@/types/commentTypes";

const initialProductState: ProductState = {
  isLoading: false,
  isError: false,
  products: [],
  product: {
    id: 0,
    name: "",
    price: 0,
    stock: 0,
    description: "",
    image: "",
    average_rating: {
      rating: 0,
      count: 0,
    },
  },
  relatedProducts: [],
};

const initialCommentState: CommentState = {
  isLoading: false,
  isError: false,
  comments: [],
  averageRating: { rating: 0, count: 0 },
};

export const buildProductSlice = () => {
  const getProducts = getProductThunk();
  const getProductDetail = getProductDetailThunk();
  const getComments = getCommentsThunk();
  const getAverageRating = getAverageRatingThunk();
  const addComment = addCommentThunk();
  const getUserComments = getUserCommentsThunk();
  const productSlice = createSlice({
    name: "product",
    initialState: {
      productState: initialProductState,
      commentState: initialCommentState,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(getProducts.pending, (state) => {
          state.productState.isLoading = true;
          state.productState.isError = false;
        })
        .addCase(
          getProducts.fulfilled,
          (state, action: PayloadAction<Product[]>) => {
            state.productState.isLoading = false;
            state.productState.products = action.payload;
            state.productState.isError = false;
          }
        )
        .addCase(getProducts.rejected, (state) => {
          state.productState.isError = true;
          state.productState.isLoading = false;
        })
        .addCase(getProductDetail.pending, (state) => {
          state.productState.isLoading = true;
          state.productState.isError = false;
        })
        .addCase(getProductDetail.fulfilled, (state, action) => {
          state.productState.isLoading = false;
          state.productState.product = action.payload.product;
          state.productState.isError = false;
          state.productState.relatedProducts = action.payload.related_products;
        })
        .addCase(getProductDetail.rejected, (state) => {
          state.productState.isError = true;
          state.productState.isLoading = false;
        })
        // Handling Comment Thunks
        .addCase(getComments.pending, (state) => {
          state.commentState.isLoading = true;
          state.commentState.isError = false;
        })
        .addCase(
          getComments.fulfilled,
          (state, action: PayloadAction<Comment[]>) => {
            state.commentState.isLoading = false;
            state.commentState.comments = action.payload;
            state.commentState.isError = false;
          }
        )
        .addCase(getComments.rejected, (state) => {
          state.commentState.isError = true;
          state.commentState.isLoading = false;
        })
        .addCase(getAverageRating.pending, (state) => {
          state.commentState.isLoading = true;
          state.commentState.isError = false;
        })
        .addCase(
          getAverageRating.fulfilled,
          (state, action: PayloadAction<{ rating: number; count: number }>) => {
            state.commentState.isLoading = false;
            state.commentState.averageRating = action.payload;
            state.commentState.isError = false;
          }
        )
        .addCase(getAverageRating.rejected, (state) => {
          state.commentState.isError = true;
          state.commentState.isLoading = false;
        })
        .addCase(addComment.pending, (state) => {
          state.commentState.isLoading = true;
          state.commentState.isError = false;
        })
        .addCase(
          addComment.fulfilled,
          (state, action: PayloadAction<Comment>) => {
            state.commentState.isLoading = false;
            state.commentState.comments.push(action.payload);
            state.commentState.isError = false;
          }
        )
        .addCase(addComment.rejected, (state) => {
          state.commentState.isError = true;
          state.commentState.isLoading = false;
        })
        .addCase(getUserComments.pending, (state) => {
          state.commentState.isLoading = true;
          state.commentState.isError = false;
        })
        .addCase(
          getUserComments.fulfilled,
          (state, action: PayloadAction<Comment[]>) => {
            state.commentState.isLoading = false;
            state.commentState.comments = action.payload;
            state.commentState.isError = false;
          }
        )
        .addCase(getUserComments.rejected, (state) => {
          state.commentState.isError = true;
          state.commentState.isLoading = false;
        });
    },
  });
  return {
    productSlice,
    getProducts,
    getProductDetail,
    getComments,
    getAverageRating,
    addComment,
    getUserComments,
  };
};
