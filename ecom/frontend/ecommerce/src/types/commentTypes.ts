export interface Comment {
  id: number;
  productId: number;
  userId: string;
  content: string;
  rating: number;
}

export interface CommentState {
  isLoading: boolean;
  isError: boolean;
  comments: Comment[];
}
