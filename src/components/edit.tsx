
export default function Submit () {
    async function HandleOnSubmit () {
        await fetch('http://localhost:8000/items/{params?.id}', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        })

        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            // router.push('http://localhost:3000/items')
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    const data = {
        name: name,
        description: description,
        price: price,
        imageUrl: imageUrl,
        deleted: false,
    };
}
