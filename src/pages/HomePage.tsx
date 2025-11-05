import { useMemo, useState } from 'react';
import {
  useGetBooksQuery,
  useAddBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
} from '@/redux/features/books/booksApi';
import type { Book } from '@/types';
import BookForm, { BookFormValues } from '@/components/modules/books/BookForm';
import BorrowBookForm from '@/components/modules/borrow/BorrowBookForm';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function BooksPage() {
  const { data: books = [], isLoading, isFetching, refetch } = useGetBooksQuery();
  const [addBook, { isLoading: creating }] = useAddBookMutation();
  const [updateBook, { isLoading: updating }] = useUpdateBookMutation();
  const [deleteBook, { isLoading: deleting }] = useDeleteBookMutation();

  const [editBook, setEditBook] = useState<Book | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [borrowBookId, setBorrowBookId] = useState<string | null>(null);

  const [sortBy] = useState<'title' | 'author' | 'copies'>('title');

  // ✅ FIX 1: Use useMemo instead of useEffect + useState
  const sortedBooks = useMemo(() => {
    return [...books].sort((a, b) => {
      if (sortBy === 'copies') return b.copies - a.copies;
      return a[sortBy].localeCompare(b[sortBy]);
    });
  }, [books, sortBy]);

  // ✅ Create Book
  const handleCreate = async (v: BookFormValues) => {
    try {
      if (v.copies === 0) v.available = false;
      await addBook(v).unwrap();

      setOpenDialog(false);
      setEditBook(null);
      await refetch();

      return { success: true, message: 'Book created successfully' };
    } catch (err: any) {
      return { success: false, message: err?.data?.message || 'Failed to create book' };
    }
  };

  // ✅ Update Book
  const handleUpdate = async (v: BookFormValues) => {
    if (!editBook) return { success: false, message: 'No book selected' };
    try {
      if (v.copies === 0) v.available = false;
      await updateBook({ id: editBook._id, data: v }).unwrap();

      setOpenDialog(false);
      setEditBook(null);
      await refetch();

      return { success: true, message: 'Book updated successfully' };
    } catch (err: any) {
      return { success: false, message: err?.data?.message || 'Failed to update book' };
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Delete this book?')) {
      await deleteBook(id).unwrap();
      await refetch();
    }
  };

  const handleEditClick = (book: Book) => {
    setEditBook(book);
    setOpenDialog(true);
  };

  // ✅ FIX 2: Reset editBook when opening Add dialog
  const handleAddClick = () => {
    setEditBook(null);
    setOpenDialog(true);
  };

  return (
    <>
      {/* Hero Section */}
      <div className="relative h-[60vh] flex items-center justify-center bg-gradient-to-t from-black via-gray-900 to-black text-white">
        <div className="container mx-auto px-8 text-center">
          <h1 className="text-4xl font-extrabold md:text-6xl lg:text-7xl">
            <span className="bg-gradient-to-b from-gray-200 via-white to-gray-400 bg-clip-text text-transparent">
              Your Gateway to Infinite Worlds
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg text-gray-400 md:text-xl">
            Discover timeless classics, modern masterpieces, and hidden gems.
          </p>
        </div>
      </div>

      {/* Books Section */}
      <div className="grid gap-6 mt-6 mb-8 max-w-7xl mx-auto">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="font-bold text-xl">Our Library History</CardTitle>
            <div className="flex gap-2 items-center">
              <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>{editBook ? 'Edit Book' : 'Add Book'}</DialogTitle>
                  </DialogHeader>
                  <BookForm
                    initial={editBook ?? undefined}
                    onSubmit={editBook ? handleUpdate : handleCreate}
                    submitting={creating || updating}
                  />
                </DialogContent>
              </Dialog>
              <Button onClick={handleAddClick}>Add Book</Button>
            </div>
          </CardHeader>

          <CardContent>
            {(isLoading || isFetching) && <p>Loading…</p>}
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>Genre</TableHead>
                  <TableHead>ISBN</TableHead>
                  <TableHead className="text-right">Copies</TableHead>
                  <TableHead>Availability</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {sortedBooks.map((b) => (
                  <TableRow key={b._id}>
                    <TableCell>{b.title}</TableCell>
                    <TableCell>{b.author}</TableCell>
                    <TableCell>{b.genre}</TableCell>
                    <TableCell>{b.isbn}</TableCell>
                    <TableCell className="text-right">{b.copies}</TableCell>
                    <TableCell>{b.copies > 0 ? 'Available' : 'Unavailable'}</TableCell>
                    <TableCell className="space-x-2">
                      <Button variant="secondary" size="sm" onClick={() => handleEditClick(b)}>
                        Edit
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(b._id)}
                        disabled={deleting}
                      >
                        Delete
                      </Button>

                      {/* ✅ FIX 3: Proper Dialog with DialogTrigger */}
                      {b.copies > 0 ? (
                        <Dialog
                          open={borrowBookId === b._id}
                          onOpenChange={(open) => setBorrowBookId(open ? b._id : null)}
                        >
                          <DialogTrigger asChild>
                            <Button size="sm">Borrow</Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[400px]">
                            <DialogHeader>
                              <DialogTitle>Borrow Book: {b.title}</DialogTitle>
                            </DialogHeader>
                            <BorrowBookForm 
                              bookId={b._id} 
                              maxQuantity={b.copies}
                              onSuccess={() => setBorrowBookId(null)}
                            />
                          </DialogContent>
                        </Dialog>
                      ) : (
                        <Button size="sm" variant="outline" disabled>
                          Unavailable
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </>
  );
}