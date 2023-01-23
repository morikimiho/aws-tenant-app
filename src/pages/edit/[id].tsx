import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'

export default function ItemEdit({
  item,
}: {
  item: {
    id: number
    name: string
    imageUrl: string
    description: string
    price: number
  }
}) {
  const [id, setId] = useState(item.id)
  const [name, setName] = useState(item.name)
  const [description, setDes] = useState(item.description)
  const [price, setPrice] = useState(item.price)
  const [imageUrl, setUrl] = useState(item.imageUrl)

  const router = useRouter()
  const handleName = (e: any) => {
    setName(e.target.value)
  }
  const handleDes = (e: any) => {
    setDes(e.target.value)
  }
  const handlePrice = (e: any) => {
    setPrice(e.target.value)
  }
  const handleUrl = (e: any) => {
    setUrl(e.target.value)
  }

  const data = {
    name: name,
    description: description,
    price: price,
    imageUrl: imageUrl,
    deleted: false,
  }

  function HandleOnSubmit() {
    fetch(`http://localhost:3003/items/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        router.push('http://localhost:3000/items')
      })
      .catch((error) => {
        console.error('Error:', error)
      })
  }

  return (
    <>
      <Head>
        <title>商品情報編集</title>
      </Head>
      <article>
        <h1>商品情報編集</h1>
        <form>
          <span>商品名:</span>
          <input type="text" value={name} onChange={handleName} />
          <br />
          <span>商品情報:</span>
          <input
            type="text"
            value={description}
            onChange={handleDes}
          />
          <br />
          <span>商品価格:</span>
          <input type="text" value={price} onChange={handlePrice} />
          {/* <br />
                    <p>下記から画像をアップロードしてください。</p>
                    <input type="text" value={imageUrl} onChange ={handleUrl}/> */}
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
      </article>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch('http://localhost:3003/items/get')
  const items = await res.json()

  const paths = items.map((item: { id: number }) => {
    return { params: { id: item.id.toString() } }
  })

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const res = await fetch(
    `http://localhost:3003/items/get/${params?.id}`
  )
  const item = await res.json()

  return {
    props: { item },
  }
}
