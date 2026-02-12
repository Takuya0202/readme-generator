import { useParams } from "react-router-dom"
import Sidebar from "./components/Sidebar";

export default function Detail() {
    const { projectId } = useParams<{ projectId : string }>();

    return (
        <main className="flex h-screen bg-white">
            <Sidebar />

        </main>
    )
}