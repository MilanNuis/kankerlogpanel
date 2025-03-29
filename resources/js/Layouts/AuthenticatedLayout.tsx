import {
    FileText,
    HelpCircle,
    Home,
    Logs,
    Settings,
    Users,
} from "lucide-react";
import { Link, usePage } from "@inertiajs/react";
import { PropsWithChildren, ReactNode } from "react";

export default function Authenticated({
    header,
    children,
}: PropsWithChildren<{ header?: ReactNode }>) {
    const user = usePage().props.auth.user;

    return (
        <div className="flex h-screen bg-gray-900 text-gray-200">
            <aside className="w-64 bg-gray-800 p-4 flex flex-col">
                <div className="border-b border-gray-700 pb-4 mb-4">
                    <h1 className="text-3xl font-semibold">Log paneel</h1>
                </div>

                <nav className="flex-1">
                    <p className="text-gray-400 mb-4">Logcategorien</p>
                    <ul className="flex gap-2 flex-col">
                        <li>
                            <Link
                                href={route("dashboard")}
                                className={`flex items-center gap-4 p-2 rounded-lg ${
                                    route().current("dashboard")
                                        ? "bg-gray-700 text-white"
                                        : "hover:bg-gray-700 hover:text-white"
                                }`}
                            >
                                <Home className="h-4 w-4" />
                                <span>Dashboard</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                href={route("logs.index")}
                                className={`flex items-center gap-4 p-2 rounded-lg ${
                                    route().current("logs.index")
                                        ? "bg-gray-700 text-white"
                                        : "hover:bg-gray-700 hover:text-white"
                                }`}
                            >
                                <Logs className="h-4 w-4" />
                                <span>Speler Logs</span>
                            </Link>
                        </li>

                        {user && user.is_admin ? (
                            <>
                                <li>
                                    <Link
                                        href={route("admin.users.index")}
                                        className={`flex items-center gap-4 p-2 rounded-lg ${
                                            route().current("admin.users.index")
                                                ? "bg-gray-700 text-white"
                                                : "hover:bg-gray-700 hover:text-white"
                                        }`}
                                    >
                                        <Settings className="h-4 w-4" />
                                        <span>Gebruikers</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href={route("admin.roles.index")}
                                        className={`flex items-center gap-4 p-2 rounded-lg ${
                                            route().current("admin.roles.index")
                                                ? "bg-gray-700 text-white"
                                                : "hover:bg-gray-700 hover:text-white"
                                        }`}
                                    >
                                        <Settings className="h-4 w-4" />
                                        <span>Rollen</span>
                                    </Link>
                                </li>
                            </>
                        ) : null}
                    </ul>
                </nav>

                {/* Help Section */}
                <div className="mt-auto">
                    <a
                        href="#"
                        className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-700"
                    >
                        <HelpCircle className="h-4 w-4" />
                        <span>Hulp nodig?</span>
                    </a>
                </div>
            </aside>

            <main className="flex-1 p-4 overflow-auto">{children}</main>
        </div>
    );
}
