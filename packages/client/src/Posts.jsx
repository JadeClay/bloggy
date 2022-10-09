import React, { useEffect, useState } from 'react'

export default function Posts() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts?_limit=8')
    .then(response => { if(!response.ok){ throw new Error(`HTTP Error: ${response.status}`)  } return response.json() } )
    .then(data => {
      setData(data);
      setError(null);
    })
    .catch(error => {
      setData(null);
      setError(error);
    });
  });

  return (
    <div>
        <h1>Posts</h1>
        {error && (
          <div>{`There is a problem fetching the post data - ${error}`}</div>
        )}
        <ul>
        {data &&
          data.map(({ id, title }) => (
            <li key={id}>
              <h3>{title}</h3>
            </li>
          ))}
      </ul>
    </div>
  )
}


