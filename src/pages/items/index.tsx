import DisplayItem from 'components/displayItem'
import Head from 'next/head'
import Link from 'next/link'
import { Item } from '../../../type/type'

export async function getStaticProps() {
  const response = await fetch(
    'https://pg5xd7ybjd.execute-api.ap-northeast-1.amazonaws.com/items'
  )
  const items = await response.json()

  // console.log(items)
  return {
    props: {
      items,
    },
  }
}

export default function Page({ items }: { items: Item[] }) {
  return (
    <>
      <Head>
        <title>商品一覧</title>
      </Head>
      <>
        <h1>商品一覧</h1>
        <h2>下記から商品登録ができます。</h2>
        <button>
          <Link href="/items/create" legacyBehavior>
            <a>新規登録</a>
          </Link>
        </button>
      </>
      <DisplayItem items={items} />
    </>
  )
}
