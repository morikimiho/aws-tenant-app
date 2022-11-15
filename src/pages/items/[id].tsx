import ItemList from "components/itemList";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";

export default function ItemDetail({post}) {
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

export const getStaticPaths:GetStaticPaths = async () => {
    const res = await fetch('http://localhost:8000/api/items');
    const posts = await res.json();

    const paths = posts.map((item: { id: number; }) => {
        {
        params: {id: item.id}
        }
    });

    return {
        paths,
        fallback: false,
    }
}

export const getStaticProps: GetStaticProps = async ({params}) => {
    return {
        props: {post:{}}
    }
}
