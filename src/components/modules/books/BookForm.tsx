import { useEffect } from "react"
import { useForm } from "react-hook-form"
import type { Book } from "@/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "sonner"

export type BookFormValues = Omit<Book, "id"> & { id?: string }

export default function BookForm({
  initial,
  onSubmit,
  submitting,
}: {
  initial?: Partial<BookFormValues>
  onSubmit: (v: BookFormValues) => Promise<{ success: boolean; message: string }>
  submitting?: boolean
}) {
  const { register, handleSubmit, reset } = useForm<BookFormValues>({
    defaultValues: {
      title: "",
      author: "",
      genre: "",
      isbn: "",
      description: "",
      copies: 1,
      available: true,
      ...initial,
    },
  })

  useEffect(() => {
    reset({
      title: "",
      author: "",
      genre: "",
      isbn: "",
      description: "",
      copies: 1,
      available: true,
      ...initial,
    })
  }, [initial, reset])

  const handleFormSubmit = async (values: BookFormValues) => {
    try {
      // business logic: mark unavailable if copies = 0
      if (values.copies === 0) values.available = false

      const res = await onSubmit(values)

      if (res.success) {
        toast.success(res.message || "Book saved successfully!")
      } else {
        toast.error(res.message || "Something went wrong.")
      }
    } catch (err) {
      toast.error("Failed to save book. Please try again.")
    }
  }

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

      {/* Genre */}
      <div className="grid gap-1">
        <Label htmlFor="genre">Genre</Label>
        <Input id="genre" {...register("genre", { required: true })} />
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

      {/* Available */}
      <div className="flex items-center gap-2">
        <Checkbox id="available" {...register("available")} />
        <Label htmlFor="available">Available</Label>
      </div>

      {/* Submit */}
      <Button type="submit" disabled={submitting}>
        {submitting ? "Saving…" : "Save"}
      </Button>
    </form>
  )
}
