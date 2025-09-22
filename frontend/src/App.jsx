import React, { useState, useEffect } from 'react';

/**
 * Composant principal de l'application de Jeûne et Prière 2026.
 * Thème : 21 Jours de CÉLÉBRATIONS À L’ÉTERNEL (21 Sept. au 12 Oct. 2025).
 * Gère les 7 moments quotidiens avec textes bibliques et timer.
 */
function App() {
  const [currentMoment, setCurrentMoment] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60); // 1 minute en secondes
  const [isActive, setIsActive] = useState(false);
  const [currentSection, setCurrentSection] = useState('moments'); // Sections : moments, matins, soirs, veillées, reconnaissances

  const moments = [
    { title: "Moment 1", text: "Psaume 23:1 - L'Éternel est mon berger, je ne manquerai de rien." },
    { title: "Moment 2", text: "Matthieu 6:33 - Cherchez premièrement le royaume de Dieu." },
    { title: "Moment 3", text: "Philippiens 4:13 - Je peux tout par celui qui me fortifie." },
    { title: "Moment 4", text: "Josué 1:9 - Sois fort et courageux." },
    { title: "Moment 5", text: "Psaume 46:10 - Arrêtez, et sachez que je suis Dieu." },
    { title: "Moment 6", text: "Romains 8:28 - Toutes choses concourent au bien." },
    { title: "Moment 7", text: "Jean 14:6 - Je suis le chemin, la vérité, et la vie." }
  ];

  const matins = [
    { title: "Matin 1", text: "Psaume 119:164 - Sept fois le jour je te célèbre, à cause des lois de ta justice." },
    { title: "Matin 2", text: "Psaume 30:5 - Chantez en l'honneur de l'Eternel, vous qui l'aimez." }
  ];

  const soirs = [
    { title: "Soir 1", text: "Psaume 55:18 - Le soir, et le matin, et à midi, je crierai et je gémirai." },
    { title: "Soir 2", text: "Psaume 92:2-3 - Il est bon de te louer, Eternel, et de célébrer ton nom." }
  ];

  const veillees = [
    { title: "Veillée 1", text: "Psaume 34:4-7 - Dites avec moi la grandeur de l’Eternel, célébrons tous son nom !" },
    { title: "Veillée 2", text: "Psaume 99:1-3 - L’Eternel règne: les peuples tremblent; il siège entre les chérubins." }
  ];

  const reconnaissances = [
    { title: "Reconnaissance 1", text: "Psaume 113:1-3 - Louez l’Eternel ! Serviteurs de l’Eternel, louez le nom de l’Eternel !" },
    { title: "Reconnaissance 2", text: "Psaume 66:1-2 - Chantez la gloire de son nom, célébrez sa gloire par vos louanges !" }
  ];

  const sections = { moments, matins, soirs, veillees, reconnaissances };
  const currentItems = sections[currentSection];

  useEffect(() => {
    document.title = 'Jeûne et Prière 2026';
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft => {
          if (timeLeft === 1) {
            // Notification quand le timer arrive à zéro
            alert("Temps écoulé ! Passez au moment suivant.");
          }
          return timeLeft - 1;
        });
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const startTimer = () => {
    setTimeLeft(60);
    setIsActive(true);
  };

  const nextMoment = () => {
    setCurrentMoment((prev) => (prev + 1) % currentItems.length);
    setTimeLeft(60);
    setIsActive(false);
  };

  const changeSection = (section) => {
    setCurrentSection(section);
    setCurrentMoment(0);
    setTimeLeft(60);
    setIsActive(false);
  };

  return (
    <div className="app">
      <h1>🙏 21 Jours de CÉLÉBRATIONS À L’ÉTERNEL</h1>
      <p>21 Sept. au 12 Oct. 2025 - Célébrer : Faire, Chanter, Jeter, Briller, Fêter, Danser, Pèlerinage</p>
      <div className="buttons">
        <button onClick={() => changeSection('moments')}>7 Moments</button>
        <button onClick={() => changeSection('matins')}>Matins</button>
        <button onClick={() => changeSection('soirs')}>Soirs</button>
        <button onClick={() => changeSection('veillees')}>Veillées</button>
        <button onClick={() => changeSection('reconnaissances')}>Reconnaissances</button>
      </div>
      <p className="moment-counter">{currentSection.charAt(0).toUpperCase() + currentSection.slice(1)} {currentMoment + 1}/{currentItems.length}</p>
      <h2>{currentItems[currentMoment].title}</h2>
      <p>{currentItems[currentMoment].text}</p>
      <p className="timer">Temps restant : {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</p>
      <div className="buttons">
        <button onClick={startTimer} disabled={isActive}>
          Démarrer
        </button>
        <button onClick={nextMoment} disabled={isActive}>
          Suivant
        </button>
      </div>
      <p className="footer">Thème : 14 Matins et Soirs (22/09-05/10), 7 Jours de Reconnaissances (06/10-12/10).</p>
    </div>
  );
}

export default App;
