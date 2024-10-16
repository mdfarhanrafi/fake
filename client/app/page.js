'use client'
import { AuthContext } from "@/context/auth-context";
import { useRouter } from "next/navigation";
import { useContext,useEffect } from "react";

export default function Home() {
  const { auth, loading,login,logout} = useContext(AuthContext)
  const router = useRouter()

  console.log(auth)
  
  return (
    <>
    {
      loading ? <div>Loading...</div> : auth.Authenticate ? <div>Welcome {auth.user.username}</div> : router.push("/auth")

    }

    {/* // log out button using the logout function from the context */}
    <button onClick={logout}>Logout</button>
    </>
  )
  
}
