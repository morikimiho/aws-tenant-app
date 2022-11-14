import ItemList from "components/itemList";
import Head from "next/head";
import Link from "next/link";

export default function Page () {
    return (
        <>
            <Head>
                <title>商品一覧</title>
            </Head>
            <Link href='/create.tsx' legacyBehavior>
               <a>新規登録</a>
            </Link>
            <ItemList />
        </>
    );
}
