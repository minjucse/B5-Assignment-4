import { useState, useEffect } from "react";
import { useBorrowBookMutation } from "@/redux/features/borrow/borrowApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface BorrowFormProps {
  bookId: string;
  maxQuantity: number;
  onSuccess?: () => void;
}

// Get minimum date (today) *Moved outside the component for clarity and to prevent re-calculation on every render*
const today = new Date().toISOString().split("T")[0];

export default function BorrowBookForm({ bookId, maxQuantity, onSuccess }: BorrowFormProps) {
  const [borrowBook, { isLoading, isSuccess }] = useBorrowBookMutation();

  const [quantity, setQuantity] = useState(1);
  // Set the default value of dueDate to the current date ('today')
  const [dueDate, setDueDate] = useState(today);

  // Auto-close dialog on success
  useEffect(() => {
    if (isSuccess) {
      if (onSuccess) {
        onSuccess();
      }
      // Reset form (note: reset dueDate to 'today' as well)
      setQuantity(1);
      setDueDate(today); 
    }
  }, [isSuccess, onSuccess]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (quantity < 1 || quantity > maxQuantity) {
      return toast.error(`Quantity must be between 1 and ${maxQuantity}`);
    }

    if (!dueDate) {
      return toast.error("Please select a due date");
    }

    // Check if due date is in the past (This logic remains important for user modification)
    if (new Date(dueDate) < new Date(today)) {
      // This toast might be unnecessary if the 'min' attribute on the Input is working correctly, 
      // but it's good as a final client-side safeguard.
      return toast.error("Due date cannot be in the past");
    }

    const payload = {
      book: bookId,
      quantity,
      dueDate,
    };

    try {
      await borrowBook(payload).unwrap();
      toast.success("Book borrowed successfully!");
      
      // Optional: Navigate to borrow summary
      // navigate("/borrow-summary");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to borrow book.");
    }
  };

  return (
    <form className="grid gap-4" onSubmit={handleSubmit}>
      <div className="grid gap-2">
        <Label htmlFor="quantity">
          Quantity <span className="text-muted-foreground">(Available: {maxQuantity})</span>
        </Label>
        <Input
          id="quantity"
          type="number"
          min={1}
          max={maxQuantity}
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          required
          placeholder="Enter quantity"
        />
        <p className="text-xs text-muted-foreground">
          Maximum {maxQuantity} {maxQuantity === 1 ? "copy" : "copies"} available
        </p>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="dueDate">Due Date</Label>
        <Input
          id="dueDate"
          type="date"
          min={today}
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
        />
        <p className="text-xs text-muted-foreground">
          Select when you plan to return the book
        </p>
      </div>

      <div className="flex gap-2 pt-2">
        <Button type="submit" disabled={isLoading} className="flex-1">
          {isLoading ? "Borrowing…" : "Confirm Borrow"}
        </Button>
      </div>
    </form>
  );
}