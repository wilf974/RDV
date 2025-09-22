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
  const [completedDays, setCompletedDays] = useState(() => {
    const saved = localStorage.getItem('completedDays');
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
      title: "Moment 1 - Célébration Matinale",
      text: "Psaume 119:164 - Sept fois le jour je te célèbre, à cause des lois de ta justice. Psaume 92:2-3 - Il est bon de te louer, Eternel, et de célébrer ton nom, Très-Haut, d’annoncer le matin ta bonté et pendant les nuits ta fidélité."
    },
    {
      title: "Moment 2 - Louange et Prière",
      text: "Psaume 113:1-3 - Louez l’Eternel ! Serviteurs de l’Eternel, louez, louez le nom de l’Eternel ! Que le nom de l’Eternel soit béni, dès maintenant et pour toujours ! Du lever du soleil jusqu’à son coucher, que le nom de l’Eternel soit célébré !"
    },
    {
      title: "Moment 3 - Célébration Soirée",
      text: "Psaume 55:18 - Le soir, et le matin, et à midi, je crierai et je gémirai, et il entendra ma voix. Psaume 66:1-2 - Chantez la gloire de son nom, célébrez sa gloire par vos louanges !"
    },
    {
      title: "Moment 4 - Reconnaissance",
      text: "Psaume 33:1-3 - Justes, réjouissez-vous en l’Eternel ! La louange convient aux hommes droits. Célébrez l’Eternel avec la harpe, louez-le sur le luth à dix cordes ! Chantez-lui un cantique nouveau."
    },
    {
      title: "Moment 5 - Grandeur de Dieu",
      text: "Psaume 99:1-3 - L’Eternel règne: les peuples tremblent; il siège entre les chérubins: la terre tremble. L’Eternel est grand dans Sion, il domine tous les peuples. Qu’on célèbre ton nom grand et redoutable: il est saint !"
    },
    {
      title: "Moment 6 - Joie et Délivrance",
      text: "Psaume 34:4-7 - Dites avec moi la grandeur de l’Eternel, célébrons tous son nom ! J’ai cherché l’Eternel, et il m’a répondu, il m’a délivré de toutes mes frayeurs."
    },
    {
      title: "Moment 7 - Célébration Finale",
      text: "1 Chroniques 29:11-13 - A toi, Eternel, sont la grandeur, la puissance et la splendeur, l'éternité et la gloire... Maintenant, notre Dieu, nous te louons et nous célébrons ton nom glorieux."
    }
  ];

  useEffect(() => {
    setIsLoading(true);
    // Charger les moments terminés depuis l'API
    fetch(`http://localhost:12001/api/progress/${userId}`)
      .then(res => res.json())
      .then(data => {
        setCompletedMoments(data.completedMoments || []);
        setCompletedDays(data.completedDays || []);
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
                body: JSON.stringify({ userId, completedMoments: newCompleted, completedDays })
              });
            }
            // Validation automatique du jour
            if (newCompleted.length === moments.length) {
              markMomentCompleted();
            }
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
    // Si tous les moments du jour sont terminés, marquer le jour comme terminé et passer au suivant
    if (newCompleted.length === moments.length) {
      const newCompletedDays = [...completedDays, currentDay];
      setCompletedDays(newCompletedDays);
      localStorage.setItem('completedDays', JSON.stringify(newCompletedDays));
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

  // Générer les jours du challenge (14 jours : 22/09 au 05/10)
  const startDate = new Date('2025-09-22');
  const days = [];
  for (let i = 0; i < 14; i++) {
    const day = new Date(startDate);
    day.setDate(startDate.getDate() + i);
    const dayStr = day.toISOString().split('T')[0];
    const isCompleted = completedDays.includes(dayStr);
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
          <h3>Calendrier des 14 Jours (22/09 - 05/10)</h3>
          <div className="calendar">
            {days.map((day, index) => (
              <div
                key={day.date}
                className={`day ${day.isCompleted ? 'completed' : ''}`}
              >
                <span className="day-number">Jour {index + 1}</span>
                <span className="day-date">{day.date}</span>
                {day.isCompleted && <span className="check">✓</span>}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
