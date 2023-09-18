import { createContext, ReactNode, useState } from "react";
import {destroyCookie,setCookie, parseCookies } from 'nookies'
import Router from "next/router";
import {api} from "../services/apiClient"
import { toast } from "react-toastify";

type AuthContextData = {
    user: UserProps | undefined;
    isAuthenticated: boolean;
    signIn: (credentials: SignInProps) => Promise<void>;
    signOut: ()=> void;
    signUp: (credentials: SignUpProps)=> void;
}

type UserProps = {
    id: string;
    name: string;
    email: string;
}
type SignInProps = {
    email: string;
    password: string;
}

type SignUpProps = {
    name: string;
    email: string;
    password: string;
}

type AuthProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData)

export function signOut(){
    try{
        destroyCookie(undefined, '@nextauth.token')
        Router.push('/')
    } catch{

    }
}


export function AuthProvider({children}: AuthProviderProps){

    const [user, setUser] = useState<UserProps>()
    const isAuthenticated = !!user;

    async function signIn({email,password}: SignInProps){
        try{
            const response = await api.post('/session', {
                email,
                password
            })

            const {id, name, token} = response.data

            setCookie(undefined,'@nextauth.token',token, {
                maxAge: 60 * 60 * 24 * 30,
                path: "/" //Quais caminhos terão acesso ao cookie
            } )

            setUser({
                id,
                name,
                email,
            })

            //Passar o token para proxs requisicoes
            api.defaults.headers['Authorization'] = `Bearer ${token}`;

            toast.success('Logado com sucesso.')

            //Redirecionar para /dashboard
            Router.push('/dashboard')

        } catch(err){
            toast.error('Erro ao acessar')
            console.log("ERRO AO LOGAR ", err)
        }
        
    }

    async function signUp({name, email, password}: SignUpProps){
        console.log(name)
        try{
            const response = await api.post('/users', {
                name,
                email,
                password
            })

            toast.success("cadastrado com sucesso")

            Router.push('/')
        }catch(err){
            toast.error('Erro ao cadastrar')
            console.log('erro ao cadastrar:', err)
        }
    }

    return(
        <AuthContext.Provider value={{ user, isAuthenticated, signIn , signOut, signUp}}>{children}</AuthContext.Provider>
    )
}

