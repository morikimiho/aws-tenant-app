import { Item } from '../../../type/type'
import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'

export default function ItemDetail({ item }: { item: Item }) {
  return (
    <>
      <Head>
        <title>商品詳細画面</title>
      </Head>
      <article>
        <h3>{item.name.S}</h3>
        <p>
          {item.imageUrl.S === 'null' ? (
            '画像が未登録です。'
          ) : (
            <img src={item.imageUrl.S} width={250} />
          )}
        </p>
        <p>{item.description.S}</p>
        <p>【価格】{item.price.S}円</p>
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
  //   return {
  //     params: { id: item.id.toString() },
  //   }
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
  // console.log(params)
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
