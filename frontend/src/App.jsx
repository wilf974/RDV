import React, { useState, useEffect } from 'react';

/**
 * Composant principal de l'application de Jeûne et Prière 2026.
 * Gère les 7 moments quotidiens avec persistance serveur via cookies.
 */
function App() {
  const [currentMoment, setCurrentMoment] = useState(() => {
    const saved = localStorage.getItem('currentMoment');
    return saved ? parseInt(saved) : 0;
  });
  const [timeLeft, setTimeLeft] = useState(60); // 1 minute en secondes
  const [isActive, setIsActive] = useState(false);
  const [completedMoments, setCompletedMoments] = useState(() => {
    const saved = localStorage.getItem('completedMoments');
    return saved ? JSON.parse(saved) : [];
  });
  const [userId, setUserId] = useState(() => {
    let id = localStorage.getItem('userId');
    if (!id) {
      id = 'user_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('userId', id);
    }
    return id;
  });
  const [isLoading, setIsLoading] = useState(true);
  const [currentDay, setCurrentDay] = useState(() => {
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    const saved = localStorage.getItem('currentDay');
    return saved || today;
  });

  const moments = [
    {
      title: "Moment 1",
      text: "Psaume 23:1-6 - L'Éternel est mon berger: je ne manquerai de rien. Il me fait reposer dans de verts pâturages, il me dirige près des eaux paisibles. Il restaure mon âme, il me conduit dans les sentiers de la justice, à cause de son nom. Quand je marche dans la vallée de l'ombre de la mort, je ne crains aucun mal, car tu es avec moi: ta houlette et ton bâton me rassurent. Tu dresses devant moi une table, en face de mes adversaires; tu oins d'huile ma tête, et ma coupe déborde. Oui, le bonheur et la grâce m'accompagneront tous les jours de ma vie, et j'habiterai dans la maison de l'Éternel jusqu'à la fin de mes jours."
    },
    {
      title: "Moment 2",
      text: "Matthieu 6:33 - Cherchez premièrement le royaume et la justice de Dieu; et toutes ces choses vous seront données par-dessus."
    },
    {
      title: "Moment 3",
      text: "Philippiens 4:13 - Je peux tout par celui qui me fortifie."
    },
    {
      title: "Moment 4",
      text: "Josué 1:9 - Ne t'ai-je pas donné cet ordre: Fortifie-toi et prends courage? Ne t'effraie point et ne t'épouvante point, car l'Éternel, ton Dieu, est avec toi dans tout ce que tu entreprendras."
    },
    {
      title: "Moment 5",
      text: "Psaume 46:10 - Arrêtez, et sachez que je suis Dieu: je domine sur les nations, je domine sur la terre."
    },
    {
      title: "Moment 6",
      text: "Romains 8:28 - Nous savons, du reste, que toutes choses concourent au bien de ceux qui aiment Dieu, de ceux qui sont appelés selon son dessein."
    },
    {
      title: "Moment 7",
      text: "Jean 14:6 - Jésus lui dit: Je suis le chemin, la vérité, et la vie. Nul ne vient au Père que par moi."
    }
  ];

  useEffect(() => {
    setIsLoading(true);
    // Charger les moments terminés depuis l'API
    fetch(`http://localhost:12001/api/progress/${userId}`)
      .then(res => res.json())
      .then(data => {
        setCompletedMoments(data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error('Erreur chargement :', err);
        setIsLoading(false);
      });
  }, [userId]);

  useEffect(() => {
    document.title = 'Jeûne et Prière 2026';
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft => {
          if (timeLeft === 1) {
            // Notification et marquer comme terminé
            alert("Temps écoulé ! Moment terminé.");
            const newCompleted = [...completedMoments, currentMoment];
            setCompletedMoments(newCompleted);
            localStorage.setItem('completedMoments', JSON.stringify(newCompleted));
            // Sauvegarder sur l'API
            if (userId) {
              fetch('http://localhost:12001/api/progress', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId, completedMoments: newCompleted })
              });
            }
            markMomentCompleted();
          }
          return timeLeft - 1;
        });
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, currentMoment, completedMoments, userId]);

  const startTimer = () => {
    setTimeLeft(60);
    setIsActive(true);
  };

  const nextMoment = () => {
    if (currentMoment < moments.length - 1) {
      const newMoment = currentMoment + 1;
      setCurrentMoment(newMoment);
      localStorage.setItem('currentMoment', newMoment);
      setTimeLeft(60);
      setIsActive(false);
    }
  };

  const markMomentCompleted = () => {
    const newCompleted = [...completedMoments, currentMoment];
    setCompletedMoments(newCompleted);
    localStorage.setItem('completedMoments', JSON.stringify(newCompleted));
    // Si tous les moments du jour sont terminés, passer au jour suivant
    if (newCompleted.length === moments.length) {
      const nextDay = new Date(currentDay);
      nextDay.setDate(nextDay.getDate() + 1);
      const nextDayStr = nextDay.toISOString().split('T')[0];
      setCurrentDay(nextDayStr);
      localStorage.setItem('currentDay', nextDayStr);
      setCurrentMoment(0);
      localStorage.setItem('currentMoment', 0);
      alert('Félicitations ! Tous les moments terminés. Jour suivant débloqué.');
    }
  };

  // Générer les jours du challenge (21 jours)
  const startDate = new Date('2025-09-21');
  const days = [];
  for (let i = 0; i < 21; i++) {
    const day = new Date(startDate);
    day.setDate(startDate.getDate() + i);
    const dayStr = day.toISOString().split('T')[0];
    const isCompleted = completedMoments.length === moments.length && currentDay >= dayStr;
    days.push({ date: dayStr, isCompleted });
  }

  return (
    <div className="app">
      <h1>🙏 21 Jours de CÉLÉBRATIONS À L’ÉTERNEL</h1>
      <p>21 Sept. au 12 Oct. 2025 - Célébrer : Faire, Chanter, Jeter, Briller, Fêter, Danser, Pèlerinage</p>
      <p style={{ fontSize: '0.9rem', color: '#7f8c8d' }}>ID Appareil : {userId}</p>
      {isLoading ? (
        <p>Chargement des données...</p>
      ) : (
        <>
          <p className="moment-counter">Moment {currentMoment + 1}/7 {completedMoments.includes(currentMoment) ? '✅ Terminé' : ''}</p>
          <h2>{moments[currentMoment].title}</h2>
          <p>{moments[currentMoment].text}</p>
          <p className="timer">Temps restant : {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</p>
          <div className="buttons">
            <button onClick={startTimer} disabled={isActive || completedMoments.includes(currentMoment)}>
              Démarrer
            </button>
            <button onClick={nextMoment} disabled={currentMoment >= moments.length - 1}>
              Suivant
            </button>
          </div>
          <p className="footer">Moments terminés : {completedMoments.length}/7. Progress sauvegardé sur le serveur pour cet appareil.</p>
          <h3>Calendrier des 21 Jours</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '10px', margin: '20px 0' }}>
            {days.map((day, index) => (
              <div
                key={day.date}
                style={{
                  padding: '10px',
                  backgroundColor: day.isCompleted ? '#4caf50' : '#f1f1f1',
                  color: day.isCompleted ? 'white' : 'black',
                  borderRadius: '5px',
                  textAlign: 'center'
                }}
              >
                Jour {index + 1} ({day.date})
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
