import Head from 'next/head'
import styles from './styles.module.scss'
import { Header } from '../../components/Header'
import { canSSRAuth } from '@/utils/canSSRAuth'


export default function product(){
    return(
        <>
            <Head>
                <title>Novo produto</title>
            </Head>
            
            <div>
                <Header/>
                <main className={styles.container}>
                    <h1>Novo produto:</h1>


                    <form className={styles.form}>


                        <select>
                            <option>
                                Bebidas
                            </option>
                            <option>
                                Pizzas
                            </option>
                        </select>

                        <input
                        type="text"
                        placeholder='Nome do produto'
                        className={styles.input}
                        />

                        <input
                        type="text"
                        placeholder='Preço do produto'
                        className={styles.input}
                        />

                        <textarea
                        placeholder='Descreva o produto'
                        className={styles.input}
                        />

                        <button className={styles.buttonAdd} type="submit">
                            Cadastrar
                        </button>

                    </form>
                </main>
            </div>
        </>
    )
}

export const getServerSideProps = canSSRAuth(async(ctx) => {
    return {props:{}}
})