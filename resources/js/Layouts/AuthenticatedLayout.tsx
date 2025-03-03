import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Separator } from "@/Components/ui/separator";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarInset,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
    SidebarRail,
    SidebarTrigger,
} from "@/Components/ui/sidebar";
import { Link, usePage } from "@inertiajs/react";
import { FileText, HelpCircle, Home, Settings, Users } from "lucide-react";
import { PropsWithChildren, ReactNode, useState } from "react";

export default function Authenticated({
    header,
    children,
}: PropsWithChildren<{ header?: ReactNode }>) {
    const user = usePage().props.auth.user;

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    const mainNavItems = [
        { icon: Home, label: "Dashboard", href: "#", isActive: true },
        { icon: Users, label: "Gebruikers", href: "#" },
        { icon: FileText, label: "Documenten", href: "#" },
        { icon: Settings, label: "Instellingen", href: "#" },
    ];

    return (
        <SidebarProvider>
            <Sidebar className="bg-gray-900 text-gray-200">
                <SidebarHeader className="p-4 border-b border-gray-700">
                    <div className="flex items-center gap-2">
                        <h1 className="text-lg font-semibold">Mijn App</h1>
                    </div>
                </SidebarHeader>
                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupLabel className="text-gray-400">
                            Navigatie
                        </SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {mainNavItems.map((item) => (
                                    <SidebarMenuItem key={item.label}>
                                        <SidebarMenuButton
                                            asChild
                                            isActive={item.isActive}
                                            className="hover:bg-gray-700"
                                        >
                                            <a
                                                href={item.href}
                                                className="flex items-center gap-2 p-2 rounded-lg"
                                            >
                                                <item.icon className="h-4 w-4" />
                                                <span>{item.label}</span>
                                            </a>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>

                    <Separator className="my-2 border-gray-700" />

                    <SidebarGroup className="mt-auto">
                        <SidebarGroupContent>
                            <SidebarMenu>
                                <SidebarMenuItem>
                                    <SidebarMenuButton asChild>
                                        <a
                                            href="#"
                                            className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-700"
                                        >
                                            <HelpCircle className="h-4 w-4" />
                                            <span>Hulp nodig?</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>
                <SidebarRail />
            </Sidebar>
            <SidebarInset>
                <main className="bg-gray-900 text-gray-200 p-4">
                    {children}
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}
