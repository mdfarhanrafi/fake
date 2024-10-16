'use client'
import { useContext } from "react"
import { AuthContext } from "@/context/auth-context"
import { useRouter } from "next/navigation"
export default function Instructor(){
    const { auth, loading } = useContext(AuthContext)
    const role = auth?.user?.role
    const router = useRouter()
    if (loading) return <div>Loading...</div>
    if (!auth) {
        router.push("/auth")
        return null
    }
    if (role !== "Admin") {
        router.push("/")
        return null
    }
    console.log(auth)

    return (
        <div>
            {
                auth.user.role === "Admin" && auth.Authenticate ? <div>Welcome {auth.user.username}</div> : router.push("/")
            }
            <h1>Instructor Page</h1>
        </div>
    )
}
