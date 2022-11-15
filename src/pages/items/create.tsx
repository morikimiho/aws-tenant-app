import Head from "next/head";

export default function ItemRegistration() {
    return(
        <>
            <Head>
                <title>商品新規登録</title>
            </Head>
            <article>
                <h1>商品新規登録</h1>
                <span>商品名:</span>
                <input type="text" />
                    <br />
                <span>商品情報:</span>
                <input type="text" />
                    <br />
                <span>商品価格:</span>
                <input type="text" />
                    <br />
                <p>下記から画像をアップロードしてください。</p>
                <input type="file" />
            </article>
            <div>
                <br />
                <button type="submit" value="送信">送信</button>
                <button type="reset" value="リセット">リセット</button>
            </div>
        </>
    );

}
