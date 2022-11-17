import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";

export default function ItemDetail({item}:{
    item: {
      name: string
      imageUrl: string
      description: string
      price: number
    }}) {
        return (
        <>
            <Head>
                <title>商品詳細画面</title>
            </Head>
            <article>
                <h3>{item.name}</h3>
                <p><Image src={item.imageUrl} alt={''} width={250} height={250}/></p>
                <p>{item.description}</p>
                <p>【価格】{item.price}円</p>
            </article>
        </>
    );
}

export const getStaticPaths:GetStaticPaths = async () => {
    const res = await fetch('http://localhost:8000/items');
    const items = await res.json();

    const paths = items.map((item:{id:number}) => {
        return({
            params: {id: item.id.toString()}
        });
    });

    return {
        paths,
        fallback: false,
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const res = await fetch(`http://localhost:8000/items/${params?.id}`);
    const item = await res.json();

    return {
        props: {item}
    }
}
