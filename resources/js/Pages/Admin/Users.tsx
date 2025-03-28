import { Button } from "@/Components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/Components/ui/dialog";
import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { useForm } from "@inertiajs/react";
import { Pencil } from "lucide-react";

export default function users({ users }: { users: any[] }) {
    const { data, setData, post, processing, errors } = useForm({
        first_name: "",
        last_name: "",
        email: "",
    });

    const updateUser = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    return (
        <Authenticated>
            <div className="flex flex-col gap-4">
                <h1 className="text-3xl font-semibold">Users</h1>
                <p className="text-gray-400">
                    Manage users and their permissions.
                </p>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>#</TableHead>
                        <TableHead>Voornaam</TableHead>
                        <TableHead>Achternaam</TableHead>
                        <TableHead>Acties</TableHead>
                    </TableRow>
                    <TableBody>
                        {users.map((user, index) => (
                            <TableRow key={user.id}>
                                <TableHead>{index + 1}</TableHead>
                                <TableHead>{user.first_name}</TableHead>
                                <TableHead>{user.last_name}</TableHead>
                                <TableHead>
                                    <Dialog>
                                        <DialogTrigger>
                                            <Button>
                                                <Pencil />
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <form onSubmit={updateUser}></form>
                                        </DialogContent>
                                    </Dialog>
                                </TableHead>
                            </TableRow>
                        ))}
                    </TableBody>
                </TableHeader>
            </Table>
        </Authenticated>
    );
}
