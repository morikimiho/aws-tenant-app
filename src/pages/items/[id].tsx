import { GetStaticProps } from "next";
import Head from "next/head";

export default function ItemDetail() {
    return (
        <>
            <Head>
                <title>商品詳細画面</title>
            </Head>
            <article>
                <h1>{item.name}</h1>
                <h2>{item.description}</h2>
                <p>{item.price}</p>
            </article>
        </>
    );
}
