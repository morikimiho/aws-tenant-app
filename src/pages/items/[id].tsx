import ItemList from "components/itemList";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";

export default function ItemDetail({item}:{item: any}) {
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
    const res = await fetch(`http://localhost:3000/items`);
    const items = await res.json();

    const paths = items.map((item: { id: number; }) => {
        return({
            params: {id: item.id.toString}
        });
    });

    return {
        paths,
        fallback: false,
    }
}

export const getStaticProps: GetStaticProps = async ({params}) => {
    const res = await fetch(`http://localhost:3000/items/${params?.id as string}`);
    const item = await res.json();

    return {
        props: {item}
    }
}
