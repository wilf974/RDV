import React, { useState, useEffect } from 'react';

/**
 * Composant principal de l'application de Jeûne et Prière 2026.
 * Affiche un message de bienvenue et un compteur simple.
 */
function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = 'Jeûne et Prière 2026';
  }, []);

  return (
    <div className="app">
      <h1>🙏 Bienvenue dans l'Application de Jeûne et Prière 2026</h1>
      <p>
        Cette application vous accompagnera dans vos 7 moments de prière quotidiens.
      </p>
      <button onClick={() => setCount(count + 1)}>
        Compteur : {count}
      </button>
      <p>
        Prochaine étape : Ajouter les fonctionnalités de prière et les textes bibliques.
      </p>
    </div>
  );
}

export default App;
