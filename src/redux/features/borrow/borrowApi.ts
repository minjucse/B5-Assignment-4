import { baseApi } from "../../baseApi";

interface BorrowBookDto {
  book: string;
  quantity: number;
  dueDate: string;
}

export const borrowApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    borrowBook: builder.mutation<{ success: boolean; message: string }, BorrowBookDto>({
      query: (body) => ({
        url: "/borrow",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Borrow"], // optional, for refetching summary
    }),

   getBorrowSummary: builder.query<any, void>({
      query: () => "/borrow",
      providesTags: ["Borrow"]
    }),
  }),
});

export const { useBorrowBookMutation, useGetBorrowSummaryQuery } = borrowApi;
