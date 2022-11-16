
const data = {name: '', description: '', price: '', file: ''};

export default function postAllData () {
    const postData = async () => {
      await fetch('http://localhost:8000/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
        };
}

export default function getData(e) {
    return e.target.value;
}
