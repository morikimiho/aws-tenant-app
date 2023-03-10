import Head from 'next/head'
import { useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
// 表示画面
export default function ItemRegistration() {
  //stateの宣言
  const [name, setName] = useState('')
  const [description, setDes] = useState('')
  const [price, setPrice] = useState('')
  // const [imageUrl, setUrl] = useState('')

  // const data = {
  //   name: name,
  //   description: description,
  //   price: price,
  //   imageUrl: imageUrl,
  //   deleted: false,
  // }

  //aws用のデータ
  const data = {
    name: name,
    description: description,
    price: price,
  }

  //router
  const router = useRouter()

  async function HandleOnSubmit() {
    //awsのAPI
    await fetch(
      'https://pg5xd7ybjd.execute-api.ap-northeast-1.amazonaws.com/items',
      {
        method: 'POST',
        body: JSON.stringify(data),
      }
    )

    router.push('http://localhost:3001/items')
    //Nest.jsのAPI
    // await axios
    //   .post(`${process.env.NEXT_PUBLIC_API_URL}/items/create`, data)
    //   .then((response) => response)
    //   .then((data) => {
    //     console.log(data)
    //     router.push('http://localhost:3000/items')
    //   })

    //JSONサーバーのAPI
    // await fetch('http://localhost:3003/items/create', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(data),
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log(data)
    //     router.push('http://localhost:3000/items')
    //   })
    //   .catch((error) => {
    //     console.error('Error:', error)
    //   })
  }

  return (
    <>
      <Head>
        <title>商品新規登録</title>
      </Head>
      <form>
        <h1>商品新規登録</h1>
        <span>商品名:</span>
        <input
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value)
          }}
        />
        <br />
        <span>商品情報:</span>
        <input
          type="text"
          value={description}
          onChange={(e) => {
            setDes(e.target.value)
          }}
        />
        <br />
        <span>商品価格:</span>
        <input
          type="text"
          value={price}
          onChange={(e) => {
            setPrice(e.target.value)
          }}
        />

        <span style={{ color: 'red' }}>
          *価格は半角数字で入力してください。
        </span>
        <br />
        {/* <p>下記から画像をアップロードしてください。</p>
        <input
          type="file"
          value={imageUrl}
          onChange={(e) => {
            setUrl(e.target.value)
          }}
        /> */}
      </form>
      <div>
        <br />
        <button type="submit" value="送信" onClick={HandleOnSubmit}>
          送信
        </button>
        <button type="reset" value="リセット">
          リセット
        </button>
      </div>
    </>
  )
}
