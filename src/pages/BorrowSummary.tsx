import { useGetBorrowSummaryQuery } from "@/redux/features/borrow/borrowApi";

export default function BorrowSummary() {
  const { data, isLoading, isError } = useGetBorrowSummaryQuery();

  if (isLoading) return <p>Loading summary...</p>;
  if (isError) return <p>Failed to load summary</p>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Borrow Summary</h1>
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">Book Title</th>
            <th className="border px-4 py-2">ISBN</th>
            <th className="border px-4 py-2">Total Borrowed</th>
          </tr>
        </thead>
        <tbody>
          {data?.data?.map((item: any, index: number) => (
            <tr key={index}>
              <td className="border px-4 py-2">{item.book.title}</td>
              <td className="border px-4 py-2">{item.book.isbn}</td>
              <td className="border px-4 py-2 text-center font-semibold">
                {item.totalQuantity}
              </td>
            </tr>
          ))}
          
        </tbody>
      </table>
    </div>
  );
}
