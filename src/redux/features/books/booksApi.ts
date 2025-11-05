import { baseApi } from '../../baseApi'
import type { Book } from '../../../types'
interface BooksResponse {
  success: boolean
  message: string
  data: Book[]
}
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
      // ✅ unwrap "data" field from API response
      transformResponse: (response: BooksResponse) => response.data,
      providesTags: ["Book"],
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
      invalidatesTags: ["Book"],
    }),

    deleteBook: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({
        url: `/books/${id}`,
        method: "DELETE",
      }),
        invalidatesTags: ["Book"],
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
