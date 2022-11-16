import Link from 'next/link';
import useSWR from 'swr'; 

const fetcher = (resource: RequestInfo | URL, init: RequestInit | undefined) => fetch(resource, init).then((res) => res.json());
export default function ItemList() {
    const {data, error} = useSWR('/api/items', fetcher);

    if(error) return <div>failed to load</div>;

    if(!data) return <div>loading...</div>;


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
                {data.map((item: { id: string; name: string; description: string; deleted: boolean}) => {
                    const page = item.id.toString();
                    const flag = {deleted: true};
                    function isDeleted () {
                    fetch(`http://localhost:8000/items/${page}`, {
                        method: 'PATCH',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(flag)
                        })
                        .then(response => {
                        return response.json();
                        })
                        .then(data => {
                            console.log(data);
                            location.reload();
                        })

                    }
    
                    if(item.deleted === false) {
                        return (
                            // eslint-disable-next-line react/jsx-key
                            <tr>
                                <td>{item.id}</td>
                                <td><Link href={`../items/${item.id}`} >{item.name}</Link></td>
                                <td>{item.description}</td>
                                <td><button onClick={isDeleted}>[削除]</button></td>
                            </tr>
                        );
                    }
                })}
            </tbody>
        </table>
        );
}
