import { useEffect } from "react";
import { useForm } from "react-hook-form";
import type { Book } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

export const GENRES = {
  FICTION: "FICTION",
  NON_FICTION: "NON_FICTION",
  SCIENCE: "SCIENCE",
  HISTORY: "HISTORY",
  BIOGRAPHY: "BIOGRAPHY",
  FANTASY: "FANTASY",
} as const;

export type Genre = (typeof GENRES)[keyof typeof GENRES];

export type BookFormValues = Omit<Book, "id"> & { id?: string };

export default function BookForm({
  initial,
  onSubmit,
  submitting,
}: {
  initial?: Partial<BookFormValues>;
  onSubmit: (v: BookFormValues) => Promise<{ success: boolean; message: string }>;
  submitting?: boolean;
}) {
  const { register, handleSubmit, watch, setValue, reset } = useForm<BookFormValues>({
    defaultValues: {
      title: "",
      author: "",
      genre: GENRES.FICTION,
      isbn: "",
      description: "",
      copies: 1,
      available: true,
      ...initial,
    },
  });

  // ✅ Refill form when initial data changes
  useEffect(() => {
    if (initial) {
      reset({
        title: initial.title ?? "",
        author: initial.author ?? "",
        genre: initial.genre ?? GENRES.FICTION,
        isbn: initial.isbn ?? "",
        description: initial.description ?? "",
        copies: initial.copies ?? 1,
        available: initial.copies === 0 ? false : true,
      });
    }
  }, [initial, reset]);

  // ✅ Real-time sync: copies → available
  const copies = watch("copies");
  useEffect(() => {
    if (typeof copies === "number") {
      setValue("available", copies > 0);
    }
  }, [copies, setValue]);

  const handleFormSubmit = async (values: BookFormValues) => {
    try {
      if (values.copies === 0) values.available = false;

      const res = await onSubmit(values);
      if (res.success) {
        toast.success(res.message || "Book saved successfully!");
      } else {
        toast.error(res.message || "Something went wrong.");
      }
    } catch {
      toast.error("Failed to save book. Please try again.");
    }
  };

  return (
    <form className="grid gap-3" onSubmit={handleSubmit(handleFormSubmit)}>
      {/* Title */}
      <div className="grid gap-1">
        <Label htmlFor="title">Title</Label>
        <Input id="title" {...register("title", { required: true })} />
      </div>

      {/* Author */}
      <div className="grid gap-1">
        <Label htmlFor="author">Author</Label>
        <Input id="author" {...register("author", { required: true })} />
      </div>

      {/* Genre (Dropdown) */}
      <div className="grid gap-1">
        <Label htmlFor="genre">Genre</Label>
        <select
          id="genre"
          {...register("genre", { required: true })}
          className="border border-input bg-background text-sm rounded-md px-3 py-2"
        >
          {Object.values(GENRES).map((genre) => (
            <option key={genre} value={genre}>
              {genre.replace("_", " ")}
            </option>
          ))}
        </select>
      </div>

      {/* ISBN */}
      <div className="grid gap-1">
        <Label htmlFor="isbn">ISBN</Label>
        <Input id="isbn" {...register("isbn", { required: true })} />
      </div>

      {/* Description */}
      <div className="grid gap-1">
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" {...register("description")} />
      </div>

      {/* Copies */}
      <div className="grid gap-1">
        <Label htmlFor="copies">Copies</Label>
        <Input
          id="copies"
          type="number"
          min={0}
          {...register("copies", { valueAsNumber: true })}
        />
      </div>

      {/* Available (auto synced) */}
      <div className="flex items-center gap-2">
        <Checkbox id="available" checked={watch("available")} disabled />
        <Label htmlFor="available">Available</Label>
      </div>

      {/* Submit */}
      <Button type="submit" disabled={submitting}>
        {submitting ? "Saving…" : "Save"}
      </Button>
    </form>
  );
}
