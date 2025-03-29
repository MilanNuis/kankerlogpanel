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
import { useEffect, useState } from "react";

interface Role {
    id: number;
    name: string;
}

interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    is_admin: boolean;
    roles: Role[];
}

interface UsersPageProps {
    users: User[];
    roles: Role[];
}

export default function UsersPage({ users, roles }: UsersPageProps) {
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [showCreateUserDialog, setShowCreateUserDialog] = useState(false);
    const { data, setData, post, put, reset } = useForm({
        name: "",
        email: "",
        password: "",
        is_admin: false as boolean,
        roles: [] as number[],
    });

    useEffect(() => {
        if (selectedUser) {
            setData({
                name: selectedUser.name || "",
                email: selectedUser.email || "",
                is_admin: selectedUser.is_admin || false,
                password: "",
                roles: selectedUser.roles.map((role) => role.id) || [],
            });
        }
    }, [selectedUser]);

    const handleUpdateSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedUser) return;
        put(route("admin.users.update", selectedUser.id), {
            onSuccess: () => {
                reset();
                setSelectedUser(null);
            },
        });
    };

    const handleCreateSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route("admin.users.store"), {
            onSuccess: () => {
                reset();
                setShowCreateUserDialog(false);
            },
        });
    };

    return (
        <Authenticated>
            <div className="flex flex-col gap-4">
                <h1 className="text-3xl font-semibold">Users</h1>
                <p className="text-gray-400">
                    Manage users and their permissions.
                </p>
            </div>

            {/* Users Table */}
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>#</TableHead>
                        <TableHead>Voornaam</TableHead>
                        <TableHead>Admin</TableHead>
                        <TableHead>Acties</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {users.map((user, index) => (
                        <TableRow key={user.id}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>
                                {user.is_admin ? "Ja" : "Nee"}
                            </TableCell>
                            <TableCell className="flex gap-2">
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Trash2 className="size-4 text-red-500 cursor-pointer" />
                                    </AlertDialogTrigger>
                                    <AlertDialogContent className="bg-gray-700 border-gray-700 text-white">
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
                                            <AlertDialogCancel className="bg-gray-500 hover:bg-gray-600 border-gray-500 hover:border-gray-600 text-white">
                                                Cancel
                                            </AlertDialogCancel>
                                            <AlertDialogAction
                                                className="bg-red-500 hover:bg-red-600 text-white"
                                                onClick={() =>
                                                    post(
                                                        route(
                                                            "admin.users.destroy",
                                                            user.id
                                                        )
                                                    )
                                                }
                                            >
                                                Verwijderen
                                            </AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Pencil
                                            className="size-4 cursor-pointer"
                                            onClick={() =>
                                                setSelectedUser(user)
                                            }
                                        />
                                    </DialogTrigger>
                                    {selectedUser && (
                                        <DialogContent>
                                            <form
                                                onSubmit={handleUpdateSubmit}
                                                className="space-y-4"
                                            >
                                                <h2 className="text-lg font-semibold">
                                                    Update User
                                                </h2>
                                                <div className="space-y-2">
                                                    <Label htmlFor="name">
                                                        First Name
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
                                                <div className="space-y-2">
                                                    <Label htmlFor="email">
                                                        Email
                                                    </Label>
                                                    <Input
                                                        id="email"
                                                        type="email"
                                                        value={data.email}
                                                        onChange={(e) =>
                                                            setData(
                                                                "email",
                                                                e.target.value
                                                            )
                                                        }
                                                        required
                                                    />
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <Label htmlFor="is_admin">
                                                        Admin
                                                    </Label>
                                                    <input
                                                        type="checkbox"
                                                        id="is_admin"
                                                        checked={data.is_admin}
                                                        onChange={() =>
                                                            setData(
                                                                "is_admin",
                                                                !data.is_admin
                                                            )
                                                        }
                                                    />
                                                </div>
                                                <h3 className="text-md font-medium">
                                                    Roles
                                                </h3>
                                                {roles.map((role) => (
                                                    <div
                                                        key={role.id}
                                                        className="flex items-center gap-2"
                                                    >
                                                        <input
                                                            type="checkbox"
                                                            id={`role-${role.id}`}
                                                            checked={data.roles.includes(
                                                                role.id
                                                            )}
                                                            onChange={() => {
                                                                setData(
                                                                    "roles",
                                                                    data.roles.includes(
                                                                        role.id
                                                                    )
                                                                        ? data.roles.filter(
                                                                              (
                                                                                  id
                                                                              ) =>
                                                                                  id !==
                                                                                  role.id
                                                                          )
                                                                        : [
                                                                              ...data.roles,
                                                                              role.id,
                                                                          ]
                                                                );
                                                            }}
                                                        />
                                                        <Label
                                                            htmlFor={`role-${role.id}`}
                                                        >
                                                            {role.name}
                                                        </Label>
                                                    </div>
                                                ))}
                                                <Button
                                                    type="submit"
                                                    className="w-full"
                                                >
                                                    Update User
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
            <Dialog
                open={showCreateUserDialog}
                onOpenChange={setShowCreateUserDialog}
            >
                <DialogTrigger asChild>
                    <Button onClick={() => setShowCreateUserDialog(true)}>
                        Gebruiker aanmaken
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <form onSubmit={handleCreateSubmit} className="space-y-4">
                        <h2 className="text-lg font-semibold">Create User</h2>
                        <div className="space-y-2">
                            <Label htmlFor="name">First Name</Label>
                            <Input
                                id="name"
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                value={data.email}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Wachtwoord</Label>
                            <Input
                                id="password"
                                type="password"
                                value={data.password}
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                                required
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <Label htmlFor="is_admin">Admin</Label>
                            <input
                                type="checkbox"
                                id="is_admin"
                                checked={data.is_admin}
                                onChange={() =>
                                    setData("is_admin", !data.is_admin)
                                }
                            />
                        </div>
                        <h3 className="text-md font-medium">Roles</h3>
                        {roles.map((role) => (
                            <div
                                key={role.id}
                                className="flex items-center gap-2"
                            >
                                <input
                                    type="checkbox"
                                    id={`role-${role.id}`}
                                    checked={data.roles.includes(role.id)}
                                    onChange={() => {
                                        setData(
                                            "roles",
                                            data.roles.includes(role.id)
                                                ? data.roles.filter(
                                                      (id) => id !== role.id
                                                  )
                                                : [...data.roles, role.id]
                                        );
                                    }}
                                />
                                <Label htmlFor={`role-${role.id}`}>
                                    {role.name}
                                </Label>
                            </div>
                        ))}
                        <Button type="submit" className="w-full">
                            Create User
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>
        </Authenticated>
    );
}
