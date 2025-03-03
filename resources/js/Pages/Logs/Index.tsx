import { useState } from "react";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/Components/ui/dialog";
import { Button } from "@/Components/ui/button";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

interface Log {
    id: number;
    category: string;
    severity: string;
    steamname: string;
    message: string;
    created_at: string;
}

interface LogsProps {
    Logs: Log[];
}

export default function Index({ Logs }: LogsProps) {
    const [selectedLog, setSelectedLog] = useState<Log | null>(null);

    return (
        <AuthenticatedLayout>
            <Head title="All Logs" />
            <div className="p-6 bg-gray-900 text-gray-300 min-h-screen">
                <div className="overflow-x-auto shadow-md rounded-lg">
                    <form method="get" className="my-4">
                        <input
                            type="text"
                            name="search"
                            placeholder="Search logs..."
                            className="w-full p-2 rounded bg-gray-800 border border-gray-700 text-gray-300"
                        />
                        <button type="submit" className="hidden"></button>
                    </form>
                    <table className="min-w-full bg-gray-800 border border-gray-700 rounded-lg">
                        <thead className="bg-gray-700 text-gray-300">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                    ID
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                    Category
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                    Severity
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                    Steam Name
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                    Message
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                    Date
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700">
                            {Logs.map((log) => (
                                <tr
                                    key={log.id}
                                    className="hover:bg-gray-700 cursor-pointer"
                                    onClick={() => setSelectedLog(log)}
                                >
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        {log.id}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        {log.category}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        {log.severity}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        {log.steamname}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        {log.message}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        {new Date(
                                            log.created_at
                                        ).toLocaleString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {selectedLog && (
                    <Dialog
                        open={!!selectedLog}
                        onOpenChange={() => setSelectedLog(null)}
                    >
                        <DialogContent className="sm:max-w-[500px] bg-gray-800 text-gray-200">
                            <DialogHeader>
                                <DialogTitle>Log Details</DialogTitle>
                                <DialogDescription>
                                    Bekijk de details van het geselecteerde
                                    log-item.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <p>
                                    <strong>ID:</strong> {selectedLog.id}
                                </p>
                                <p>
                                    <strong>Category:</strong>{" "}
                                    {selectedLog.category}
                                </p>
                                <p>
                                    <strong>Severity:</strong>{" "}
                                    {selectedLog.severity}
                                </p>
                                <p>
                                    <strong>Steam Name:</strong>{" "}
                                    {selectedLog.steamname}
                                </p>
                                <p>
                                    <strong>Message:</strong>{" "}
                                    {selectedLog.message}
                                </p>
                                <p>
                                    <strong>Date:</strong>{" "}
                                    {new Date(
                                        selectedLog.created_at
                                    ).toLocaleString()}
                                </p>
                            </div>
                            <DialogFooter>
                                <Button
                                    variant="outline"
                                    className="bg-red-500 border-red-500 hover:bg-red-300 text-gray-200"
                                    onClick={() => setSelectedLog(null)}
                                >
                                    Sluiten
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
