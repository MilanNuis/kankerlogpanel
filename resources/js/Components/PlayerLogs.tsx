import { useState } from "react";
import {
    Search,
    Download,
    X,
    User,
    Calendar,
    Clock,
    MapPin,
    Shield,
    Info,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";

// Mock data for player logs
const playerLogs = [
    {
        id: "1",
        timestamp: "2025-03-17 20:32:14",
        player: "Player123",
        steamId: "STEAM_0:1:12345678",
        action: "Connect",
        details: "IP: 192.168.x.x",
        location: "Spawn",
        severity: "info",
    },
    {
        id: "2",
        timestamp: "2025-03-17 20:28:05",
        player: "Player456",
        steamId: "STEAM_0:0:87654321",
        action: "Disconnect",
        details: "Quit",
        location: "Downtown",
        severity: "info",
    },
    {
        id: "3",
        timestamp: "2025-03-17 20:25:47",
        player: "Player789",
        steamId: "STEAM_0:1:23456789",
        action: "Death",
        details: "Killed by Player456 using Weapon_Pistol",
        location: "Police Station",
        severity: "warning",
    },
    {
        id: "4",
        timestamp: "2025-03-17 20:22:31",
        player: "Player321",
        steamId: "STEAM_0:0:98765432",
        action: "Chat",
        details: "Message: 'Hey everyone, what's up?'",
        location: "Beach",
        severity: "info",
    },
    {
        id: "5",
        timestamp: "2025-03-17 20:18:22",
        player: "Player654",
        steamId: "STEAM_0:1:34567890",
        action: "Inventory",
        details: "Added item: Weapon_SMG, Count: 1",
        location: "Ammunition Store",
        severity: "warning",
    },
    {
        id: "6",
        timestamp: "2025-03-17 20:15:09",
        player: "Player987",
        steamId: "STEAM_0:0:09876543",
        action: "Vehicle",
        details: "Spawned vehicle: Adder (ABC123)",
        location: "Garage",
        severity: "info",
    },
    {
        id: "7",
        timestamp: "2025-03-17 20:12:55",
        player: "Player123",
        steamId: "STEAM_0:1:12345678",
        action: "Money",
        details: "Received $50,000 from bank robbery",
        location: "Bank",
        severity: "warning",
    },
    {
        id: "8",
        timestamp: "2025-03-17 20:08:41",
        player: "Player456",
        steamId: "STEAM_0:0:87654321",
        action: "Admin",
        details: "Received warning from Admin1: 'Stop spamming chat'",
        location: "City Center",
        severity: "error",
    },
    {
        id: "9",
        timestamp: "2025-03-17 20:05:33",
        player: "Player789",
        steamId: "STEAM_0:1:23456789",
        action: "Job",
        details: "Changed job: Unemployed -> Police",
        location: "Police Department",
        severity: "info",
    },
    {
        id: "10",
        timestamp: "2025-03-17 20:02:19",
        player: "Player321",
        steamId: "STEAM_0:0:98765432",
        action: "Property",
        details: "Purchased property: Apartment 123",
        location: "Alta Street",
        severity: "info",
    },
    {
        id: "11",
        timestamp: "2025-03-17 19:58:07",
        player: "Player654",
        steamId: "STEAM_0:1:34567890",
        action: "Ban",
        details: "Banned by system for: Cheating detected",
        location: "N/A",
        severity: "error",
    },
    {
        id: "12",
        timestamp: "2025-03-17 19:55:42",
        player: "Player987",
        steamId: "STEAM_0:0:09876543",
        action: "Report",
        details: "Reported Player123 for: Suspicious behavior",
        location: "Downtown",
        severity: "warning",
    },
];

// Additional player details for the selected log
const playerDetails = {
    Player123: {
        name: "John Doe",
        playTime: "523 hours",
        firstJoin: "2024-01-15",
        lastJoin: "2025-03-17",
        warnings: 2,
        bans: 0,
        notes: "Regular player, active in community events",
    },
    Player456: {
        name: "Jane Smith",
        playTime: "342 hours",
        firstJoin: "2024-02-20",
        lastJoin: "2025-03-17",
        warnings: 1,
        bans: 0,
        notes: "Helpful to new players",
    },
    Player789: {
        name: "Mike Johnson",
        playTime: "198 hours",
        firstJoin: "2024-03-05",
        lastJoin: "2025-03-17",
        warnings: 0,
        bans: 0,
        notes: "Plays mostly on weekends",
    },
    Player321: {
        name: "Sarah Williams",
        playTime: "412 hours",
        firstJoin: "2024-01-30",
        lastJoin: "2025-03-17",
        warnings: 3,
        bans: 0,
        notes: "Frequent rule violations, on final warning",
    },
    Player654: {
        name: "David Brown",
        playTime: "156 hours",
        firstJoin: "2024-04-10",
        lastJoin: "2025-03-17",
        warnings: 4,
        bans: 1,
        notes: "Temporary ban history for chat abuse",
    },
    Player987: {
        name: "Emily Davis",
        playTime: "278 hours",
        firstJoin: "2024-02-28",
        lastJoin: "2025-03-17",
        warnings: 0,
        bans: 0,
        notes: "Active roleplayer, positive community member",
    },
};

// Related logs for the selected player
const getRelatedLogs = (playerId: string) => {
    return playerLogs.filter((log) => log.player === playerId).slice(0, 5);
};

export function PlayerLogs() {
    const [selectedLog, setSelectedLog] = useState<any>(null);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    // Function to get badge color based on severity
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

    // Filter logs based on search query and filters
    const filteredLogs = playerLogs.filter((log) => {
        const matchesSearch =
            log.player.toLowerCase().includes(searchQuery.toLowerCase()) ||
            log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
            log.details.toLowerCase().includes(searchQuery.toLowerCase());

        return matchesSearch;
    });

    // Handle log selection and open details
    const handleLogSelect = (log: any) => {
        setSelectedLog(log);
        setIsDetailsOpen(true);
    };

    return (
        <div className="flex-1 overflow-auto p-6 bg-[#0a0e1a]">
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
                    <Button className="bg-[#131b2e] border-0 hover:bg-[#1e2a45]">
                        <Download size={16} className="mr-2" />
                        <span>Exporteren</span>
                    </Button>
                </div>
            </div>

            <div className="hidden gap-4 mb-6">
                <div className="w-1/4">
                    <Select value={""}>
                        <SelectTrigger className="bg-[#131b2e] border-0">
                            <SelectValue placeholder="Filter op actie" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#131b2e] border-[#1e2a45]">
                            <SelectItem value="all">Alle acties</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="w-1/4">
                    <Select value={""}>
                        <SelectTrigger className="bg-[#131b2e] border-0">
                            <SelectValue placeholder="Filter op ernst" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#131b2e] border-[#1e2a45]">
                            <SelectItem value="all">
                                Alle ernst niveaus
                            </SelectItem>
                            <SelectItem value="info">Info</SelectItem>
                            <SelectItem value="warning">
                                Waarschuwing
                            </SelectItem>
                            <SelectItem value="error">Fout</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <Card className="bg-[#131b2e] border-0">
                <CardHeader className="pb-3">
                    <CardTitle className="text-white">Speler Logs</CardTitle>
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
                                    Details
                                </TableHead>
                                <TableHead className="w-[150px] text-white">
                                    Locatie
                                </TableHead>
                                <TableHead className="w-[100px] text-right text-white">
                                    Acties
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredLogs.map((log) => (
                                <TableRow
                                    key={log.id}
                                    className="cursor-pointer border-[#1e2a45] hover:bg-[#1e2a45] text-white"
                                    onClick={() => handleLogSelect(log)}
                                >
                                    <TableCell className="font-mono text-xs">
                                        {log.timestamp}
                                    </TableCell>
                                    <TableCell>{log.player}</TableCell>
                                    <TableCell>{log.action}</TableCell>
                                    <TableCell>
                                        <Badge
                                            variant={
                                                getSeverityColor(
                                                    log.severity
                                                ) as any
                                            }
                                        >
                                            {log.severity}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="max-w-md truncate">
                                        {log.details}
                                    </TableCell>
                                    <TableCell>{log.location}</TableCell>
                                    <TableCell className="text-right">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleLogSelect(log);
                                            }}
                                        >
                                            Details
                                        </Button>
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
                            Gedetailleerde informatie over de geselecteerde log
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
                                            {
                                                selectedLog.timestamp.split(
                                                    " "
                                                )[0]
                                            }
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
                                            {
                                                selectedLog.timestamp.split(
                                                    " "
                                                )[1]
                                            }
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
                                            {selectedLog.player}
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
                                </div>
                            </div>

                            <div className="space-y-2">
                                <h3 className="text-lg text-white font-semibold">
                                    Details
                                </h3>
                                <Card className="p-4 text-sm bg-[#1e2a45] border-0">
                                    <p className="text-white">
                                        {selectedLog.details}
                                    </p>
                                </Card>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}
