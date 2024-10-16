'use client'
import { useContext } from "react"
import { AuthContext } from "@/context/auth-context"
import { useRouter } from "next/navigation"
export default function Instructor(){
    const { auth, loading } = useContext(AuthContext)
    const role = auth?.user?.role
    console.log(role) 
    console.log(auth.Authenticate)
    return (
        <div>
           {
           auth.Authenticate ? <p>I am at Instructor</p> : useRouter().push('/auth')      
           }
        </div>
    )
}