import { Info } from "lucide-react";

export default function TableMovie2({ data = [], columns = [] }: { data: any[]; columns: { key: string; label: string }[] }) {
    console.log(data, columns) // Kiểm tra dữ liệu
    return (
        <div className="px-4 py-6">
            <table className="table-auto w-full border-collapse">
                <thead className="bg-gray-50 border-b-4 border-gray-300">
                    <tr>
                        {columns.map((col) => (
                            <th key={col.key} className="px-4 py-2 text-left font-bold">
                                {col.label}
                            </th>

                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index} className="odd:bg-gray-100 even:bg-white border-b-2 border-gray-200">
                            {columns.map((col) => (
                                <td key={col.key} className="px-4 py-2">
                                    {col.key === 'detail' && item[col.key] ? (
                                        <div className="text-[#146db5] cursor-pointer flex items-center gap-2">
                                            <div className="w-4 h-4 bg-[#146db5] rounded-full flex items-center justify-center">
                                                <Info className="w-4 h-4 text-white" />
                                            </div>
                                            <span>Seat detail</span>
                                        </div>
                                    ) : (
                                        item[col.key]
                                    )}

                                </td>

                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}