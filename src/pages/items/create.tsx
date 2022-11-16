import Head from "next/head";
import React,{ useState } from "react";
import { useRouter } from "next/router";

// 表示画面
export default function ItemRegistration({item}) {
    return(
        <>
            <Head>
                <title>商品新規登録</title>
            </Head>
            <form>
                <h1>商品新規登録</h1>
                <span>商品名:</span>
                <input type="text" value={name} onChange ={handleOnChange}/>
                    <br />
                <span>商品情報:</span>
                <input type="text" value={description} onChange ={handleOnChange}/>
                    <br />
                <span>商品価格:</span>
                <input type="text" value={price} onChange ={handleOnChange}/>
                    <br />
                <p>下記から画像をアップロードしてください。</p>
                <input type="file" value={file} onChange ={handleOnChange}/>
            </form>
            <div>
                <br />
                <button type="submit" value="送信">送信</button>
                <button type="reset" value="リセット">リセット</button>
            </div>
        </>
    );

}

//stateの宣言
    const [state, setState] = useState({
        name: '',
        description: '',
        price : 0
    });


//onChange関数
function handleOnChange(e) {
    return setState(e.target.value);
};

//router
const router = useRouter();
const handleClick = (e) => {
    e.preventDefault()
    router.push('http://localhost:3000/items')
}
