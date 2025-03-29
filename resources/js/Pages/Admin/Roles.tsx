import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/Components/ui/alert-dialog";
import { Button } from "@/Components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/Components/ui/dialog";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { useForm } from "@inertiajs/react";
import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";

interface Role {
    id: number;
    name: string;
}

interface RolesPageProps {
    roles: Role[];
}

export default function RolesPage({ roles }: RolesPageProps) {
    const [selectedRole, setSelectedRole] = useState<Role | null>(null);
    const { data, setData, post, put, reset } = useForm({
        name: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedRole) {
            // Update existing role
            put(route("admin.roles.update", selectedRole.id), {
                onSuccess: () => {
                    reset();
                    setSelectedRole(null);
                },
            });
        } else {
            // Create new role
            post(route("admin.roles.store"), {
                onSuccess: () => {
                    reset();
                },
            });
        }
    };

    return (
        <Authenticated>
            <div className="flex flex-col gap-4">
                <h1 className="text-3xl font-semibold">Roles</h1>
                <p className="text-gray-400">Manage roles and permissions.</p>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>#</TableHead>
                        <TableHead>Role Name</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {roles.map((role, index) => (
                        <TableRow key={role.id}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{role.name}</TableCell>
                            <TableCell className="flex gap-2">
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Trash2 className="size-4 text-red-500 cursor-pointer" />
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>
                                                Weet je het zeker?
                                            </AlertDialogTitle>
                                            <AlertDialogDescription>
                                                Deze actie kan niet ongedaan
                                                gemaakt worden.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>
                                                Cancel
                                            </AlertDialogCancel>
                                            <AlertDialogAction>
                                                <Button
                                                    variant="destructive"
                                                    onClick={() =>
                                                        post(
                                                            route(
                                                                "admin.roles.destroy",
                                                                role.id
                                                            )
                                                        )
                                                    }
                                                >
                                                    Verwijderen
                                                </Button>
                                            </AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Pencil
                                            className="size-4 cursor-pointer"
                                            onClick={() =>
                                                setSelectedRole(role)
                                            }
                                        />
                                    </DialogTrigger>
                                    {selectedRole && (
                                        <DialogContent>
                                            <form
                                                onSubmit={handleSubmit}
                                                className="space-y-4"
                                            >
                                                <h2 className="text-lg font-semibold">
                                                    Update Role
                                                </h2>
                                                <div className="space-y-2">
                                                    <Label htmlFor="name">
                                                        Role Name
                                                    </Label>
                                                    <Input
                                                        id="name"
                                                        value={data.name}
                                                        onChange={(e) =>
                                                            setData(
                                                                "name",
                                                                e.target.value
                                                            )
                                                        }
                                                        required
                                                    />
                                                </div>
                                                <Button
                                                    type="submit"
                                                    className="w-full"
                                                >
                                                    Update Role
                                                </Button>
                                            </form>
                                        </DialogContent>
                                    )}
                                </Dialog>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <Dialog>
                <DialogTrigger asChild>
                    <Button
                        variant="outline"
                        className="mt-6 border-primary bg-primary"
                    >
                        Add Role
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <h2 className="text-lg font-semibold">Create Role</h2>
                        <div className="space-y-2">
                            <Label htmlFor="name">Role Name</Label>
                            <Input
                                id="name"
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                required
                            />
                        </div>
                        <Button type="submit" className="w-full">
                            Create Role
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>
        </Authenticated>
    );
}
