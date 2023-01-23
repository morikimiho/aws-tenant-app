import Link from 'next/link'
import useSWR from 'swr'
import Image from 'next/image'
import axios from 'axios'

export default function ItemList() {
  const getItems = async () => {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/items/get`
    )
    return data
  }
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>画像</th>
          <th>商品名</th>
          <th>説明</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        {data.map(
          (item: {
            id: string
            name: string
            description: string
            imageUrl: string
            deleted: boolean
          }) => {
            const page = item.id.toString()
            const flag = { deleted: true }
            function isDeleted() {
              fetch(`http://localhost:8000/items/${page}`, {
                method: 'PATCH',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(flag),
              })
            }

            if (item.deleted === false) {
              return (
                // eslint-disable-next-line react/jsx-key
                <tr>
                  <td>{item.id}</td>
                  <td>
                    <Image
                      src={item.imageUrl}
                      alt={''}
                      width={150}
                      height={150}
                    />
                  </td>
                  <td>
                    <Link href={`../items/${item.id}`}>
                      {item.name}
                    </Link>
                  </td>
                  <td>{item.description}</td>
                  <td>
                    <Link href={`../edit/${item.id}`}>
                      <button>[編集]</button>
                    </Link>
                  </td>
                  <td>
                    <button onClick={isDeleted}>[削除]</button>
                  </td>
                </tr>
              )
            }
          }
        )}
      </tbody>
    </table>
  )
}
