'use client'
import { AuthContext } from "@/context/auth-context";
import { useRouter } from "next/navigation";
import { useContext,useEffect } from "react";

export default function Home() {
  const { auth, loading } = useContext(AuthContext)
  const router = useRouter()
  
  return (
    <>
    {
      !auth?.Authenticate ? router.push('/auth') : router.push('/student')   
      
    }
    </>
  )
  
}
