import React, { useState, useEffect } from 'react';

/**
 * Fonctions utilitaires pour la persistance multi-couches
 * Gère localStorage, sessionStorage et cookies comme fallback
 */
const isTelegramWebView = () => {
  return window.TelegramWebviewProxy || window.TelegramWebApp;
};

const setStoredValue = (key, value) => {
  try {
    localStorage.setItem(key, value);
    // Sauvegarde également en sessionStorage pour Telegram
    sessionStorage.setItem(key, value);
    // Sauvegarde en cookie comme fallback
    document.cookie = `${key}=${value}; path=/; max-age=86400`; // 24h
  } catch (error) {
    console.warn('Erreur sauvegarde localStorage:', error);
    try {
      sessionStorage.setItem(key, value);
      document.cookie = `${key}=${value}; path=/; max-age=86400`;
    } catch (sessionError) {
      console.warn('Erreur sauvegarde sessionStorage:', sessionError);
    }
  }
};

const getStoredValue = (key) => {
  try {
    // Essaie d'abord localStorage
    const localValue = localStorage.getItem(key);
    if (localValue) return localValue;

    // Fallback vers sessionStorage (utile pour Telegram)
    const sessionValue = sessionStorage.getItem(key);
    if (sessionValue) return sessionValue;

    // Fallback vers cookies
    const cookieValue = getCookieValue(key);
    return cookieValue;
  } catch (error) {
    console.warn('Erreur lecture localStorage:', error);
    try {
      const sessionValue = sessionStorage.getItem(key);
      if (sessionValue) return sessionValue;
      return getCookieValue(key);
    } catch (sessionError) {
      console.warn('Erreur lecture sessionStorage:', sessionError);
      return getCookieValue(key);
    }
  }
};

const getCookieValue = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
};

/**
 * Composant principal de l'application de Jeûne et Prière 2026.
 * Gère les 7 moments quotidiens avec persistance multi-couches.
 */
function App() {
  const [currentMoment, setCurrentMoment] = useState(() => {
    const saved = getStoredValue('currentMoment');
    return saved ? parseInt(saved) : 0;
  });
  const [timeLeft, setTimeLeft] = useState(60); // 1 minute en secondes
  const [isActive, setIsActive] = useState(false);
  const [completedMoments, setCompletedMoments] = useState(() => {
    const saved = getStoredValue('completedMoments');
    return saved ? JSON.parse(saved) : [];
  });
  const [completedDays, setCompletedDays] = useState(() => {
    const saved = getStoredValue('completedDays');
    return saved ? JSON.parse(saved) : [];
  });
  const [userId, setUserId] = useState(() => {
    let id = getStoredValue('userId');
    if (!id) {
      id = 'user_' + Math.random().toString(36).substr(2, 9);
      setStoredValue('userId', id);
    }
    return id;
  });
  const [isLoading, setIsLoading] = useState(true);
  const [currentDay, setCurrentDay] = useState(() => {
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    const saved = getStoredValue('currentDay');
    return saved || today;
  });

  // Vérifier et mettre à jour le jour actuel basé sur la date système
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    if (currentDay !== today) {
      console.log('Mise à jour jour détectée:', currentDay, '->', today);
      console.log('Environnement Telegram:', isTelegramWebView());

      // Vérifier si le jour actuel était déjà terminé
      const wasDayCompleted = completedDays.includes(currentDay);

      setCurrentDay(today);
      setStoredValue('currentDay', today);

      // Réinitialiser les moments pour le nouveau jour seulement si le jour précédent était terminé
      if (wasDayCompleted) {
        setCurrentMoment(0);
        setStoredValue('currentMoment', '0');
        setCompletedMoments([]);
        setStoredValue('completedMoments', JSON.stringify([]));
        console.log('Jour mis à jour automatiquement - Moments réinitialisés :', today);
      } else {
        console.log('Jour mis à jour mais moments conservés pour permettre la reprise :', today);
      }
    }
  }, [currentDay, completedDays]); // Ajout completedDays comme dépendance

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
    // Charger les moments terminés depuis le système de persistance multi-couches
    const savedCompletedMoments = getStoredValue('completedMoments');
    const savedCompletedDays = getStoredValue('completedDays');
    const savedCurrentDay = getStoredValue('currentDay');

    const loadedCompletedMoments = savedCompletedMoments ? JSON.parse(savedCompletedMoments) : [];
    const loadedCompletedDays = savedCompletedDays ? JSON.parse(savedCompletedDays) : [];

    // Vérifier si le jour sauvegardé correspond au jour actuel
    const today = new Date().toISOString().split('T')[0];
    if (savedCurrentDay && savedCurrentDay !== today) {
      // Jour différent - vérifier si le jour sauvegardé était terminé
      if (loadedCompletedDays.includes(savedCurrentDay)) {
        // Le jour précédent était terminé - réinitialiser pour aujourd'hui
        console.log('Jour précédent terminé - réinitialisation pour aujourd\'hui');
        setCompletedMoments([]);
        setStoredValue('completedMoments', JSON.stringify([]));
        setCurrentMoment(0);
        setStoredValue('currentMoment', '0');
      } else {
        // Jour précédent non terminé - conserver les moments en cours
        console.log('Reprise des moments en cours du jour précédent');
      }
    }

    setCompletedMoments(loadedCompletedMoments);
    setCompletedDays(loadedCompletedDays);

    console.log('Données chargées:', {
      completedMoments: loadedCompletedMoments,
      completedDays: loadedCompletedDays,
      currentDay: savedCurrentDay,
      today: today,
      telegram: isTelegramWebView()
    });
    setIsLoading(false);
  }, []); // Pas de dépendance sur userId pour éviter rechargement

  // Sauvegarde automatique lors du déchargement (important pour Telegram)
  useEffect(() => {
    const handleBeforeUnload = () => {
      console.log('Sauvegarde avant fermeture...');
      setStoredValue('currentMoment', currentMoment.toString());
      setStoredValue('completedMoments', JSON.stringify(completedMoments));
      setStoredValue('completedDays', JSON.stringify(completedDays));
      setStoredValue('currentDay', currentDay);
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [currentMoment, completedMoments, completedDays, currentDay]);

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
  }, [isActive, timeLeft, currentMoment, completedMoments]);

  const startTimer = () => {
    setTimeLeft(60);
    setIsActive(true);
  };

  const nextMoment = () => {
    if (currentMoment < moments.length - 1) {
      const newMoment = currentMoment + 1;
      setCurrentMoment(newMoment);
      setStoredValue('currentMoment', newMoment.toString());
      setTimeLeft(60);
      setIsActive(false);
    }
  };

  const markMomentCompleted = () => {
    const newCompleted = [...completedMoments, currentMoment];
    setCompletedMoments(newCompleted);
    setStoredValue('completedMoments', JSON.stringify(newCompleted));

    // Si tous les moments du jour actuel sont terminés, marquer le jour comme terminé
    if (newCompleted.length === moments.length) {
      console.log('Tous les moments du jour terminés, validation du jour :', currentDay);
      const newCompletedDays = [...completedDays, currentDay];
      setCompletedDays(newCompletedDays);
      setStoredValue('completedDays', JSON.stringify(newCompletedDays));

      // Préparer le jour suivant
      const nextDay = new Date(currentDay);
      nextDay.setDate(nextDay.getDate() + 1);
      const nextDayStr = nextDay.toISOString().split('T')[0];

      // Vérifier si c'est un jour de challenge (dans les 14 jours)
      const startDate = new Date('2025-09-22');
      const endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + 13); // 14 jours total

      if (nextDay <= endDate) {
        // Jour suivant disponible dans le challenge
        setCurrentDay(nextDayStr);
        setStoredValue('currentDay', nextDayStr);
        setCurrentMoment(0);
        setStoredValue('currentMoment', '0');
        setCompletedMoments([]); // Réinitialiser pour le nouveau jour
        setStoredValue('completedMoments', JSON.stringify([]));
        alert('Félicitations ! Tous les moments terminés. Jour suivant débloqué.');
      } else {
        // Challenge terminé
        alert('🎉 Félicitations ! Vous avez terminé tous les 14 jours du challenge !');
      }
    }
  };

  // Générer les jours du challenge (14 jours : jour 1 = 22/09/2025)
  const startDate = new Date('2025-09-22'); // Jour 1 fixe
  const today = new Date();
  const days = [];
  for (let i = 0; i < 14; i++) {
    const day = new Date(startDate);
    day.setDate(startDate.getDate() + i);
    const dayStr = day.toISOString().split('T')[0];
    const isCompleted = completedDays.includes(dayStr);
    const isCurrent = dayStr === currentDay; // Jour actuel basé sur currentDay
    days.push({ date: dayStr, isCompleted, isCurrent, dayNumber: i + 1 });
  }

  return (
    <div className="app">
      <h1>🙏 21 Jours de CÉLÉBRATIONS À L’ÉTERNEL</h1>
      <p>21 Sept. au 12 Oct. 2025 - Célébrer : Faire, Chanter, Jeter, Briller, Fêter, Danser, Pèlerinage</p>
      <p style={{ fontSize: '0.9rem', color: '#7f8c8d' }}>ID Appareil : {userId}</p>
      {isTelegramWebView() && (
        <p style={{ fontSize: '0.8rem', color: '#e67e22', fontWeight: 'bold' }}>
          🔗 Environnement Telegram détecté - Sauvegarde multi-couches activée
        </p>
      )}
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
            {completedMoments.length > 0 && (
              <button
                onClick={() => {
                  if (confirm('Êtes-vous sûr de vouloir recommencer la journée ? Tous les moments terminés seront remis à zéro.')) {
                    setCompletedMoments([]);
                    setStoredValue('completedMoments', JSON.stringify([]));
                    setCurrentMoment(0);
                    setStoredValue('currentMoment', '0');
                    setTimeLeft(60);
                    setIsActive(false);
                  }
                }}
                style={{ backgroundColor: '#f39c12', marginTop: '10px' }}
              >
                🔄 Recommencer le jour
              </button>
            )}
          </div>
          <p className="footer">Moments terminés aujourd'hui : {completedMoments.length}/7. Progress sauvegardé localement sur cet appareil.</p>
          <h3>Calendrier des 14 Jours (22/09/2025 - 05/10/2025)</h3>
          <div className="calendar">
            {days.map((day, index) => (
              <div
                key={day.date}
                className={`day ${day.isCompleted ? 'completed' : ''} ${day.isCurrent ? 'current' : ''}`}
              >
                <span className="day-number">Jour {day.dayNumber}</span>
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
