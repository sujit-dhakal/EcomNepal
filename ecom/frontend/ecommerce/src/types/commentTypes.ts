export interface Comment {
  id?: number;
  product_id?: number;
  product?: string;
  user?: string;
  content: string;
  rating: number;
}

export interface CommentState {
  isLoading: boolean;
  isError: boolean;
  comments: Comment[];
  averageRating: {
    rating: number;
    count: number;
  };
}
