import { createContext, useState } from 'react'

interface IAuthContext {
    auth: any
    setAuth: (auth: any) => void
    authToken: string
    setAuthToken: (auth: string) => void
}

const AuthContext = createContext<IAuthContext>(null!)

function AuthProvider({ children } : { children: React.ReactNode }) {
    const tokenString = localStorage.getItem('token');
    const [auth, setAuth] = useState<any>({})
    const [authToken, setAuthToken] = useState<any>(tokenString)
    
    return(
        <AuthContext.Provider value={{auth, setAuth, authToken, setAuthToken}}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthProvider, AuthContext }
