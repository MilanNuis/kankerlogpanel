import { PlayerLogs } from "@/Components/PlayerLogs";
import Authenticated from "@/Layouts/AuthenticatedLayout";

export default function Index() {
    return (
        <Authenticated>
            <PlayerLogs />
        </Authenticated>
    );
}
