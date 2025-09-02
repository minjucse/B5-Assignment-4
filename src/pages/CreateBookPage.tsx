import { useNavigate } from "react-router-dom";
import { useAddBookMutation } from "@/redux/features/books/booksApi";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BookForm, { BookFormValues } from "@/components/modules/books/BookForm";

export default function CreateBookPage() {
  const navigate = useNavigate();
  const [createBook, { isLoading }] = useAddBookMutation();

  const handleSubmit = async (values: BookFormValues) => {
    // Ensure backend format
    const payload = {
      title: values.title,
      author: values.author,
      genre: values.genre,
      isbn: values.isbn,
      description: values.description,
      copies: values.copies,
      available: values.available ?? true,
    };

    await createBook(payload).unwrap();
    navigate("/books"); // redirect after creation
  };

  return (
    <Card className="max-w-lg mx-auto mt-8">
      <CardHeader>
        <CardTitle>Add New Book</CardTitle>
      </CardHeader>
      <CardContent>
        <BookForm onSubmit={handleSubmit} submitting={isLoading} />
      </CardContent>
    </Card>
  );
}
