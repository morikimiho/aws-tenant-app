import axios from 'axios'
import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { Item } from '../../../type/type'

export default function ItemEdit({ item }: { item: Item }) {
  const [id, setId] = useState(item.id.S)
  const [name, setName] = useState(item.name.S)
  const [description, setDes] = useState(item.description.S)
  const [price, setPrice] = useState(item.price.S)

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

  const data = {
    id: id,
    name: name,
    description: description,
    price: price,
  }

  // console.log(data)
  // console.log(JSON.stringify(data))
  async function HandleOnSubmit() {
    await fetch(
      'https://pg5xd7ybjd.execute-api.ap-northeast-1.amazonaws.com/item/update',
      {
        method: 'PATCH',
        body: JSON.stringify(data),
      }
    )

    router.push('http://localhost:3001/items')

    // await axios
    //   .patch(`${process.env.NEXT_PUBLIC_API_URL}/items/${id}`, data)
    //   .then((response) => response)
    //   .then((data) => {
    //     console.log(data)
    //     router.push('http://localhost:3000/items')
    //   })
    // fetch(`http://localhost:3003/items/${id}`, {
    //   method: 'PATCH',
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
  // const res = await fetch(
  //   `${process.env.NEXT_PUBLIC_API_URL}/items/get`
  // )
  // const items = await res.json()

  // const paths = items.map((item: { id: number }) => {
  //   return { params: { id: item.id.toString() } }
  // })

  // return {
  //   paths,
  //   fallback: false,
  // }

  const response = await fetch(
    'https://pg5xd7ybjd.execute-api.ap-northeast-1.amazonaws.com/items'
  )
  const items = await response.json()
  // console.log(items)

  const paths = items.map((item: Item) => {
    return {
      params: { id: item.id },
    }
  })

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // const res = await fetch(
  //   `${process.env.NEXT_PUBLIC_API_URL}/items/get/${params?.id}`
  // )
  // const item = await res.json()

  // return {
  //   props: { item },
  // }

  const response = await fetch(
    `https://pg5xd7ybjd.execute-api.ap-northeast-1.amazonaws.com/items/detail?id=${params?.id}`
  )

  const item = await response.json()
  // console.log(item)
  // console.log(item.name)

  return {
    props: {
      item,
    },
  }
}
