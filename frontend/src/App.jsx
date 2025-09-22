import React, { useState, useEffect } from 'react';

/**
 * Composant principal de l'application de Jeûne et Prière 2026.
 * Gère les 7 moments quotidiens avec persistance et timer.
 */
function App() {
  const [currentMoment, setCurrentMoment] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60); // 1 minute en secondes
  const [isActive, setIsActive] = useState(false);
  const [completedMoments, setCompletedMoments] = useState(() => {
    const saved = localStorage.getItem('completedMoments');
    return saved ? JSON.parse(saved) : [];
  });

  const moments = [
    { title: "Moment 1", text: "Psaume 23:1 - L'Éternel est mon berger, je ne manquerai de rien." },
    { title: "Moment 2", text: "Matthieu 6:33 - Cherchez premièrement le royaume de Dieu." },
    { title: "Moment 3", text: "Philippiens 4:13 - Je peux tout par celui qui me fortifie." },
    { title: "Moment 4", text: "Josué 1:9 - Sois fort et courageux." },
    { title: "Moment 5", text: "Psaume 46:10 - Arrêtez, et sachez que je suis Dieu." },
    { title: "Moment 6", text: "Romains 8:28 - Toutes choses concourent au bien." },
    { title: "Moment 7", text: "Jean 14:6 - Je suis le chemin, la vérité, et la vie." }
  ];

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
          }
          return timeLeft - 1;
        });
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, currentMoment, completedMoments]);

  const startTimer = () => {
    setTimeLeft(60);
    setIsActive(true);
  };

  const nextMoment = () => {
    if (currentMoment < moments.length - 1) {
      setCurrentMoment(currentMoment + 1);
      setTimeLeft(60);
      setIsActive(false);
    }
  };

  return (
    <div className="app">
      <h1>🙏 21 Jours de CÉLÉBRATIONS À L’ÉTERNEL</h1>
      <p>21 Sept. au 12 Oct. 2025 - Célébrer : Faire, Chanter, Jeter, Briller, Fêter, Danser, Pèlerinage</p>
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
      <p className="footer">Moments terminés : {completedMoments.length}/7. Progress sauvegardé localement.</p>
    </div>
  );
}

export default App;
