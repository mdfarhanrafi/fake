"use client"
import { useRouter } from "next/navigation";
import {createContext, useState,useEffect} from "react"
import axios from "axios";
export const AuthContext = createContext() 

export default function AuthProvider({ children }){
    const [loading, setLoading] = useState(true);
    const [accessToken,setaccessToken] = useState('')
    const [auth,setAuth] = useState({
        Authenticate:false,
        user:null
    })
    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
    useEffect(()=>{
      const userInfo = JSON.parse(localStorage.getItem('user'));
      const token =JSON.parse(localStorage.getItem('acessToken'));
      if (userInfo) {
          setAuth({
            Authenticate:true,
            user:userInfo
        });
          setaccessToken(token)
      }
      setLoading(false);
    },[])
    
    const login =(userData)=>{
      localStorage.setItem('user', JSON.stringify(userData.user));
      localStorage.setItem('accessToken',JSON.stringify(userData.accessToken))
      setAuth({
        Authenticate:true,
        user:userData.user
    })
    }
  


    const logout =()=>{
        localStorage.clear()
        setAuth({
            Authenticate:false,
            user:null
        })
        useRouter().push('/auth')
    }

    return <AuthContext.Provider value={{auth,setAuth,login,logout,loading,setLoading}}>
         {children}
    </AuthContext.Provider>

}