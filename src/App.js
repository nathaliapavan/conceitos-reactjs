import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `Novo projeto ${ Date.now() }`,
      url: "http://localhost/teste",
      techs: ["PHP", "ReactJS", "CSS"]
    });

    const repository = response.data;
    setRepositories([ ...repositories, repository ]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`).then(response => {
      const newRepositories = repositories.filter((repository) => repository.id !== id);
      setRepositories(newRepositories);
    });
  }

  return (
    <div>
      <button onClick={handleAddRepository}>Adicionar</button>

      <ul data-testid="repository-list">
          {
            repositories.map(repository => {
              return (
                <li key={ repository.id }>{ repository.title }
                  <button onClick={() => handleRemoveRepository(repository.id)}>
                    Remover
                  </button>
                </li>
              )
            })
          }
      </ul>
    </div>
  );
}

export default App;
