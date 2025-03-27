import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import {
    Activity,
    AlertTriangle,
    Ban,
    Clock,
    Database,
    DollarSign,
    Search,
    Shield,
    Users,
} from "lucide-react";

const getBadgeVariant = (type: string) => {
    switch (type) {
        case "admin":
            return "destructive";
        case "player":
            return "default";
        case "economy":
            return "secondary";
        case "server":
            return "outline";
        default:
            return "default";
    }
};

const recentActivity = [
    {
        id: "1",
        timestamp: "2025-03-17 20:32:14",
        type: "admin",
        action: "Ban",
        user: "Admin1",
        target: "Player123",
        details: "Cheating - Using aimbot",
    },
    {
        id: "2",
        timestamp: "2025-03-17 20:28:05",
        type: "player",
        action: "Connect",
        user: "Player456",
        target: "-",
        details: "IP: 192.168.x.x",
    },
    {
        id: "3",
        timestamp: "2025-03-17 20:25:47",
        type: "economy",
        action: "Transaction",
        user: "Player789",
        target: "Player456",
        details: "€25,000 transferred",
    },
    {
        id: "4",
        timestamp: "2025-03-17 20:22:31",
        type: "server",
        action: "Warning",
        user: "System",
        target: "-",
        details: "High memory usage detected",
    },
    {
        id: "5",
        timestamp: "2025-03-17 20:18:22",
        type: "admin",
        action: "Kick",
        user: "Admin2",
        target: "Player321",
        details: "Inappropriate behavior",
    },
    {
        id: "6",
        timestamp: "2025-03-17 20:15:09",
        type: "player",
        action: "Disconnect",
        user: "Player654",
        target: "-",
        details: "Timed out",
    },
    {
        id: "7",
        timestamp: "2025-03-17 20:12:55",
        type: "economy",
        action: "Purchase",
        user: "Player987",
        target: "-",
        details: "Vehicle purchased for €120,000",
    },
    {
        id: "8",
        timestamp: "2025-03-17 20:08:41",
        type: "server",
        action: "Info",
        user: "System",
        target: "-",
        details: "Resource started: es_extended",
    },
];

export default function Dashboard() {
    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />
            <div className="flex-1 overflow-auto p-6 bg-[#0a0e1a]">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold">Dashboard</h1>
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="Zoeken..."
                                className="w-64 pl-8 bg-[#131b2e] border-0"
                            />
                        </div>
                        <Button className="bg-[#131b2e] hover:bg-[#1e2a45] text-white border-0">
                            Vernieuwen
                        </Button>
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
                    <Card className="dashboard-card shadow-none text-white bg-[#131b2e] border-none">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">
                                Bans
                            </CardTitle>
                            <Ban className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">24</div>
                            <p className="text-xs text-muted-foreground">
                                Afgelopen 7 dagen
                            </p>
                        </CardContent>
                    </Card>
                    <Card className="dashboard-card shadow-none bg-[#131b2e] text-white border-none">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">
                                Economie
                            </CardTitle>
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">€8.2M</div>
                            <p className="text-xs text-muted-foreground">
                                In omloop
                            </p>
                        </CardContent>
                    </Card>
                    <Card className="dashboard-card shadow-none bg-[#131b2e] text-white border-none">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">
                                Database Grootte
                            </CardTitle>
                            <Database className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">4.7 GB</div>
                            <p className="text-xs text-muted-foreground">
                                +0.3 GB deze maand
                            </p>
                        </CardContent>
                    </Card>
                    <Card className="dashboard-card shadow-none bg-[#131b2e] text-white border-none">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">
                                Server Activiteit
                            </CardTitle>
                            <Activity className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">Hoog</div>
                            <p className="text-xs text-muted-foreground">
                                CPU: 42% | RAM: 68%
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
