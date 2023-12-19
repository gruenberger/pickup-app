import { User } from "@prisma/client"

interface ProfileHomeSelectComponentProps {
    user: User
}

export default function ProfileHomeSelectComponent({user}: ProfileHomeSelectComponentProps){
    return <p>MAP HERE</p>
}