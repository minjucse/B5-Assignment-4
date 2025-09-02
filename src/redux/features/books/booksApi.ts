import { baseApi } from '../../baseApi'
import type { Book } from '../../../types'

export const booksApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    addBook: builder.mutation<Book, Partial<Book>>({
      query: (bookData) => ({
        url: "/books",
        method: "POST",
        body: bookData,
      }),
      invalidatesTags: ["Book"],
    }),

    getBooks: builder.query<Book[], void>({
      query: () => ({
        url: "/books",
        method: "GET",
      }),
      providesTags: ["Book"],
      transformResponse: (response: { success: boolean; message: string; data: Book[] }) => response.data,
    }),

    getBook: builder.query<Book, string>({
      query: (id) => `/books/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Book", id }],
    }),

    updateBook: builder.mutation<Book, { id: string; data: Partial<Book> }>({
      query: ({ id, data }) => ({
        url: `/books/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: "Book", id }],
    }),

    deleteBook: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({
        url: `/books/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, id) => [{ type: "Book", id }],
    }),
  }),
})


export const {
  useGetBooksQuery,
  useGetBookQuery,
  useAddBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
} = booksApi
