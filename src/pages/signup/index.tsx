import { useState, FormEvent, useContext } from 'react'

import Head from 'next/head'
import logoImg from '../../../public/logo.svg'
import Image from 'next/image'
import styles from '../../../styles/home.module.scss'
import { Input } from '../../components/ui/Input'
import { Button } from '../../components/ui/Button'
import Link from 'next/link'
import {toast} from 'react-toastify'
import { canSSRGuest } from '@/utils/canSSRGuest'

import { AuthContext } from '../../contexts/AuthContext'

export default function SignUp() {
  const {signUp} = useContext(AuthContext)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  const [loading, setLoading] = useState(false)

  async function handleSignUp(event: FormEvent){
    event.preventDefault()
    if (name ==='' || email === '' || password === ''){
      toast.error('preencha todos os campos')
      return;
    }
  
    setLoading(true);

    let data = {name,email,password}

    await signUp(data)

    setLoading(false)
  } 

  

  return (
    <>
      <Head>
        <title>Faça seu adastro</title>
      </Head>
      <div className={styles.containerCenter}>
          <Image src={logoImg} alt="Logo sujeito pizzaria" />
          <div className={styles.login}>
            <h1>Criando sua conta</h1>
            <form onSubmit={handleSignUp}>
              <Input 
                placeholder='Digite seu nome' 
                type="text"
                onChange={ (e) => setName(e.target.value)}
              />
              <Input 
                placeholder='Digite seu email' 
                type="email"
                onChange={ (e) => setEmail(e.target.value)}
              />

              <Input 
                placeholder='Digite sua senha' 
                type="password"
                onChange={ (e) => setPassword(e.target.value)}
              />

              <Button
                type="submit"
                loading={loading}
              >Cadastrar</Button>
            </form>
            <Link href='/' className={styles.text}>
              Ja possuí uma conta? Faça login!
            </Link>
            
          </div>
      </div>
    </>
  )
}

export const GetServerSideProps = canSSRGuest(async (ctx) => {

  return {
    props: {}
  }
})