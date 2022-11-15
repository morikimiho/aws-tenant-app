import Link from 'next/link';
import useSWR from 'swr';

const fetcher = (resource, init) => fetch(resource, init).then((res) => res.json());
function ItemList() {
    const {data, error} = useSWR('/api/items', fetcher);

    if(error) return <div>failed to load</div>

    if(!data) return <div>loading...</div>

    return(
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>商品名</th>
                    <th>説明</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody>
                {data.map((item: { id: string; name: string; description: string; }) => {
                    return (
                        // eslint-disable-next-line react/jsx-key
                        <tr>
                            <td>{item.id}</td>
                            <td>
                                <Link href='../pages/items/[id]' >
                                    {item.name}
                                </Link>
                            </td>
                            <td>{item.description}</td>
                            <td>[削除]</td>
                        </tr>
                    );
                })}

            </tbody>
        </table>
    );
}

export default ItemList;

// 商品
type Item = {
    // 識別子
    id: number;
    // 商品名
    name: string;
    // 商品の説明
    description: string;
    // 商品の価格
    price: number;
    // 商品画像のURL
    imageUrl: string;
    // 削除フラグ
    deleted: boolean;
    // 商品に付随するオプション
    options: Option[];
  };
