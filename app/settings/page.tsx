import { getServerSession } from "next-auth"

export default function Settings() {
    const session = getServerSession();
    return <p>Change your settings here or whatever.</p>
}