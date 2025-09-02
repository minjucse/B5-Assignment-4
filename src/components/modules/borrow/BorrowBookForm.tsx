import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBorrowBookMutation } from "@/redux/features/borrow/borrowApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner"
interface BorrowFormProps {
  bookId: string;
  maxQuantity: number;
}

export default function BorrowBookForm({ bookId, maxQuantity }: BorrowFormProps) {
  const navigate = useNavigate();
  const [borrowBook, { isLoading }] = useBorrowBookMutation();

  const [quantity, setQuantity] = useState(1);
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (quantity < 1 || quantity > maxQuantity)
      return toast.error(`Quantity must be between 1 and ${maxQuantity}`);

    // Correct payload for backend
    const payload = {
      book: bookId,
      quantity,
      dueDate,
    };

    try {
      await borrowBook(payload).unwrap();
      toast.success("Book borrowed successfully!");
      navigate("/borrow-summary");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to borrow book.");
    }
  };

  return (
    <Card className="max-w-md mx-auto mt-8">
      <CardHeader>
        <CardTitle>Borrow Book</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="grid gap-4" onSubmit={handleSubmit}>
          <div className="grid gap-1">
            <Label htmlFor="quantity">Quantity</Label>
            <Input
              id="quantity"
              type="number"
              min={1}
              max={maxQuantity}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              required
            />
          </div>

          <div className="grid gap-1">
            <Label htmlFor="dueDate">Due Date</Label>
            <Input
              id="dueDate"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required
            />
          </div>

          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Borrowing…" : "Borrow Book"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
