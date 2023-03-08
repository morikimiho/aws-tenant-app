import Link from 'next/link'
import { Item } from '../../type/type'

export default function DisplayItem({ items }: { items: Item[] }) {
  return (
    <table>
      <thead>
        <tr>
          <th>画像</th>
          <th>商品名</th>
          <th>説明</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => {
          // JSONサーバー、Nest.jsのAPI
          //   const page = item.id.toString()
          //   const flag = { deleted: true }
          //   async function isDeleted() {
          //     //   await axios
          //     //     .patch(
          //     //       `${process.env.NEXT_PUBLIC_API_URL}/items/delete/${page}`,
          //     //       flag
          //     //     )
          //     //     .then((response) => {
          //     //       location.reload()
          //     //       return response
          //     //     })
          //   }

          //awsのAPI
          async function isDeleted(req: string) {
            const deleteId = { id: req }
            console.log(deleteId)

            await fetch(
              'https://pg5xd7ybjd.execute-api.ap-northeast-1.amazonaws.com/items',
              {
                method: 'PATCH',
                body: JSON.stringify(deleteId),
              }
            )
            location.reload()
          }

          if (item.deleted === false) {
            return (
              <>
                <tr key={item.id}>
                  <td>
                    {item.imageUrl === 'null' ? (
                      '画像が未登録です。'
                    ) : (
                      <img src={item.imageUrl} width={150} />
                    )}
                  </td>
                  <td>{item.name}</td>
                  <td>{item.description}</td>
                  <td>
                    <Link href={`../items/${item.id}`}>
                      <button>[詳細]</button>
                    </Link>
                  </td>
                  <td>
                    <Link href={`../edit/${item.id}`}>
                      <button>[編集]</button>
                    </Link>
                  </td>
                  <td>
                    <button onClick={() => isDeleted(item.id)}>
                      [削除]
                    </button>
                  </td>
                </tr>
              </>
            )
          }
        })}
      </tbody>
    </table>
  )
}
