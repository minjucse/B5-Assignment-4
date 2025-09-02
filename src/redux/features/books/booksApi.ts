import { baseApi } from '../../baseApi'
import type { Book } from '../../../types'

export const booksApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ✅ Add Book
    addBook: builder.mutation<Book, Partial<Book>>({
      
      query: (bookData) => ({
        url: "/books",
        method: "POST",
        body: bookData,   // ✅ use "body" instead of "data"
      }),
      invalidatesTags: ["Book"],
    }),

    // ✅ Get All Books
    getBooks: builder.query<Book[], void>({
      query: () => ({
        url: "/books",
        method: "GET",
      }),
      providesTags: ["Book"],
      transformResponse: (response: { success: boolean; message: string; data: Book[] }) => response.data,
    }),

    // ✅ Get Single Book
    getBook: builder.query<Book, string>({
      query: (id) => `/books/${id}`,
      providesTags: (result, error, id) => [{ type: "Book", id }],
    }),

    // ✅ Update Book
    updateBook: builder.mutation<Book, { id: string; data: Partial<Book> }>({
      query: ({ id, data }) => ({
        url: `/books/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Book", id }],
    }),

    // ✅ Delete Book
    deleteBook: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({
        url: `/books/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Book", id }],
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
