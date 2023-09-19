import { useState, useEffect } from 'react'
import axios from 'axios'


function App() {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    const fetchPets = async () => {
      const response = await axios.get('http://localhost:3000/api/pets')
      setPets(response.data)
    }
    fetchPets();
  }, []);

  return (
    <>
    <h1> Pets ({pets.length})</h1>
    <ul>
      {
        pets.map((pet) => {
         return (
          <>
           <li key = {pet.id}> {pet.name} {pet.is_favorite === true ? '*favorite pet*' : ''} </li>
           
         </>
         )
        })
      }
    </ul>
    </>
  )
}

export default App
