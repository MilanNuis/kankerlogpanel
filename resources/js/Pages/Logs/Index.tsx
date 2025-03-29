import { useState } from "react";
import {
    Search,
    Download,
    X,
    User,
    Calendar,
    Clock,
    Shield,
} from "lucide-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { Badge } from "@/Components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogClose,
} from "@/Components/ui/dialog";
import { Separator } from "@/Components/ui/separator";
import Authenticated from "@/Layouts/AuthenticatedLayout";

const getSeverityColor = (severity: string) => {
    switch (severity) {
        case "error":
            return "destructive";
        case "warning":
            return "default";
        case "info":
            return "secondary";
        default:
            return "outline";
    }
};

export default function PlayerLogs({ logs }: { logs: any[] }) {
    console.log(logs);
    const [selectedLog, setSelectedLog] = useState<any>(null);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const filteredLogs = logs.filter((log: any) => {
        const matchesSearch =
            (log.player_identifier
                ?.toLowerCase()
                .includes(searchQuery.toLowerCase()) ??
                false) ||
            (log.severity?.toLowerCase().includes(searchQuery.toLowerCase()) ??
                false) ||
            (log.action?.toLowerCase().includes(searchQuery.toLowerCase()) ??
                false);

        return matchesSearch;
    });

    const handleLogSelect = (log: any) => {
        setSelectedLog(log);
        setIsDetailsOpen(true);
    };

    return (
        <Authenticated>
            <div className="flex-1 overflow-auto p-6">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold">Speler Logs</h1>
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-white" />
                            <Input
                                type="search"
                                placeholder="Zoeken op speler, actie of details..."
                                className="w-80 pl-8 bg-[#131b2e] border-0"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <Card className="bg-[#131b2e] border-0">
                    <CardHeader className="pb-3">
                        <CardTitle className="text-white">
                            Speler Logs
                        </CardTitle>
                        <CardDescription>
                            Bekijk alle speler-gerelateerde activiteiten en
                            gebeurtenissen
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow className="border-[#1e2a45]">
                                    <TableHead className="w-[180px] text-white">
                                        Tijdstip
                                    </TableHead>
                                    <TableHead className="w-[150px] text-white">
                                        Speler
                                    </TableHead>
                                    <TableHead className="w-[120px] text-white">
                                        Actie
                                    </TableHead>
                                    <TableHead className="w-[120px] text-white">
                                        Ernst
                                    </TableHead>
                                    <TableHead className="w-[120px] text-white">
                                        Bericht
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredLogs.map((log: any) => (
                                    <TableRow
                                        key={log.id}
                                        className="cursor-pointer border-[#1e2a45] hover:bg-[#1e2a45] text-white"
                                        onClick={() => handleLogSelect(log)}
                                    >
                                        <TableCell className="font-mono text-xs">
                                            {new Date(
                                                log.created_at
                                            ).toLocaleString("nl-NL")}
                                        </TableCell>
                                        <TableCell>
                                            {log.player_identifier}
                                        </TableCell>
                                        <TableCell>{log.action}</TableCell>
                                        <TableCell>
                                            <Badge
                                                variant={getSeverityColor(
                                                    log.severity
                                                )}
                                            >
                                                {log.severity}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="max-w-md truncate">
                                            {log.message}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
                    <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-[#131b2e] border-[#1e2a45]">
                        <DialogHeader className="mb-4">
                            <div className="flex items-center justify-between">
                                <DialogTitle className="text-white">
                                    Log Details
                                </DialogTitle>
                                <DialogClose asChild>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="hover:bg-[#1e2a45]"
                                    >
                                        <X size={18} />
                                    </Button>
                                </DialogClose>
                            </div>
                            <DialogDescription>
                                Gedetailleerde informatie over de geselecteerde
                                log
                            </DialogDescription>
                        </DialogHeader>

                        {selectedLog && (
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <h3 className="text-lg font-semibold text-white">
                                        Log Informatie
                                    </h3>
                                    <div className="grid grid-cols-2 gap-2 text-sm">
                                        <div className="flex items-center gap-2">
                                            <Calendar
                                                size={16}
                                                className="text-white"
                                            />
                                            <span className="text-white">
                                                Datum:
                                            </span>
                                            <span className="text-white">
                                                {new Date(
                                                    selectedLog.created_at
                                                ).toLocaleDateString("nl-NL")}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Clock
                                                size={16}
                                                className="text-white"
                                            />
                                            <span className="text-white">
                                                Tijd:
                                            </span>
                                            <span className="text-white">
                                                {new Date(
                                                    selectedLog.created_at
                                                ).toLocaleDateString("nl-NL")}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <User
                                                size={16}
                                                className="text-white"
                                            />
                                            <span className="text-white">
                                                Speler:
                                            </span>
                                            <span className="text-white">
                                                {selectedLog.player_identifier}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Shield
                                                size={16}
                                                className="text-white"
                                            />
                                            <span className="text-white">
                                                Actie:
                                            </span>
                                            <span className="text-white">
                                                {selectedLog.action}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <User
                                                size={16}
                                                className="text-white"
                                            />
                                            <span className="text-white">
                                                Player Identifier:
                                            </span>
                                            <span className="text-white">
                                                {selectedLog.player_identifier}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <h3 className="text-lg text-white font-semibold">
                                        Details
                                    </h3>
                                    <Card className="p-4 text-sm bg-[#1e2a45] border-0">
                                        <pre className="text-white whitespace-pre-wrap">
                                            {JSON.stringify(
                                                selectedLog.data,
                                                null,
                                                2
                                            )}
                                        </pre>
                                    </Card>
                                </div>
                            </div>
                        )}
                    </DialogContent>
                </Dialog>
            </div>
        </Authenticated>
    );
}
