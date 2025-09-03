import { useMemo, useState } from 'react';
import {
    useGetBooksQuery,
    useAddBookMutation,
    useUpdateBookMutation,
    useDeleteBookMutation
} from '@/redux/features/books/booksApi';
import type { Book } from '@/types';
import BookForm, { BookFormValues } from '@/components/modules/books/BookForm';
import BorrowBookForm from "@/components/modules/borrow/BorrowBookForm"
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function BooksPage() {
    const { data: books = [], isLoading, isFetching } = useGetBooksQuery();
    const [addBook, { isLoading: creating }] = useAddBookMutation();
    const [updateBook, { isLoading: updating }] = useUpdateBookMutation();
    const [deleteBook, { isLoading: deleting }] = useDeleteBookMutation();

    const [search, setSearch] = useState('');
    const [sortBy, setSortBy] = useState<'title' | 'author' | 'copies'>('title');
    const [editBook, setEditBook] = useState<Book | null>(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [borrowBookId, setBorrowBookId] = useState<string | null>(null);

    const filtered = useMemo(() => {
        const q = search.toLowerCase();
        return books
            .filter((b) => b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q))
            .sort((a, b) => {
                if (sortBy === 'copies') return b.copies - a.copies;
                return a[sortBy].localeCompare(b[sortBy]);
            });
    }, [books, search, sortBy]);

    const handleCreate = async (v: BookFormValues): Promise<{ success: boolean; message: string }> => {
        try {
            if (v.copies === 0) v.available = false
            await addBook(v).unwrap()
            return { success: true, message: "Book created successfully" }
        } catch (err: any) {
            return { success: false, message: err?.data?.message || "Failed to create book" }
        }
    }

    const handleUpdate = async (v: BookFormValues): Promise<{ success: boolean; message: string }> => {
        if (!editBook) return { success: false, message: "No book selected" }
        try {
            if (v.copies === 0) v.available = false
            await updateBook({ id: editBook._id, data: v }).unwrap();
            return { success: true, message: "Book updated successfully" }
        } catch (err: any) {
            return { success: false, message: err?.data?.message || "Failed to update book" }
        }
    }

    const handleDelete = async (id: string) => {
        if (confirm('Delete this book?')) await deleteBook(id).unwrap();
    };

    const handleEditClick = (book: Book) => {
        setEditBook(book);
        setOpenDialog(true);
    };

    return (
        <>
            <div className="relative h-[60vh] flex items-center justify-center bg-gradient-to-t from-black via-gray-900 to-black text-white antialiased">
                <div className="ccontainer mx-auto px-8 text-center">
                   
                    <h1 className="text-4xl font-extrabold tracking-tight md:text-3xl lg:text-4xl">
                        <span className="bg-gradient-to-b from-gray-200 via-white to-gray-400 bg-clip-text text-transparent">
                            Your Gateway to Infinite Worlds
                        </span>
                    </h1>

                    <p className="mx-auto mt-6 max-w-3xl text-lg text-gray-400 md:text-xl">
                        Discover timeless classics, modern masterpieces, and hidden gems. Your next great read awaits in our carefully curated collection.
                    </p>
                </div>
            </div>

            <div className="grid gap-6 mt-6  mb-8 max-w-7xl mx-auto ">
                <Card >
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="font-bold text-xl">
                            Our Library History
                        </CardTitle>
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
                                {filtered.map((b) => (
                                    <TableRow key={b._id}>
                                        <TableCell>{b.title}</TableCell>
                                        <TableCell>{b.author}</TableCell>
                                        <TableCell>{b.genre}</TableCell>
                                        <TableCell>{b.isbn}</TableCell>
                                        <TableCell className="text-right">{b.copies}</TableCell>
                                        <TableCell>
                                            {b.copies > 0 ? "Available" : "Unavailable"}
                                        </TableCell>
                                        <TableCell className="space-x-2">
                                            <Button
                                                variant="secondary"
                                                size="sm"
                                                onClick={() => handleEditClick(b)}
                                            >
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

                                            {/* Borrow or Unavailable */}
                                            {b.copies > 0 ? (
                                                <Dialog
                                                    open={borrowBookId === b._id}
                                                    onOpenChange={(open) => setBorrowBookId(open ? b._id : null)}
                                                >
                                                    <DialogTrigger asChild>
                                                        <Button size="sm">
                                                            Borrow
                                                        </Button>
                                                    </DialogTrigger>
                                                    <DialogContent className="sm:max-w-[400px]">
                                                        <DialogHeader>
                                                            <DialogTitle>Borrow Book</DialogTitle>
                                                        </DialogHeader>
                                                        <BorrowBookForm bookId={b._id} maxQuantity={b.copies} />
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
