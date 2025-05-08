// Initialise le score du joueur à 0
let counter = 0;

// Initialise le temps de jeu en secondes
let timer = 30;

// Booléen pour savoir si le jeu est actif ou non
let gameActive = true;

// Variables pour stocker les identifiants des intervalles
let bubbleInterval;
let countdownInterval;

// Récupère le meilleur score depuis le localStorage, ou 0 si aucun n'est encore enregistré
let bestScore = localStorage.getItem("bestScore") || 0;

// Affiche le meilleur score dans l'élément HTML avec l'id 'best'
best.textContent = bestScore;

// Fonction pour créer une bulle
const bubbleMaker = () => {
  // Si le jeu est terminé, ne rien faire
  if (!gameActive) return;

  // Crée un élément HTML <span> pour représenter la bulle
  const bubble = document.createElement("span");

  // Ajoute la classe "bubble" pour que les styles CSS soient appliqués
  bubble.classList.add("bubble");

  // Ajoute la bulle au corps de la page
  document.body.appendChild(bubble);

  // Génère une taille aléatoire entre 100px et 300px
  const size = Math.random() * 200 + 100 + "px";

  // Applique cette taille à la largeur et à la hauteur de la bulle
  bubble.style.width = size;
  bubble.style.height = size;

  // Positionne la bulle à une hauteur aléatoire (top) entre 50% et 150%
  bubble.style.top = Math.random() * 100 + 50 + "%";

  // Positionne la bulle horizontalement de manière aléatoire entre 0% et 100%
  bubble.style.left = Math.random() * 100 + "%";

  // Choisit aléatoirement +1 ou -1 pour déplacer la bulle vers la gauche ou la droite
  const plusMinus = Math.random() > 0.5 ? 1 : -1;

  // Applique une valeur CSS personnalisée "--left" pour un déplacement horizontal
  bubble.style.setProperty('--left', Math.random() * 100 * plusMinus + "%");

  // Ajoute un événement "click" sur la bulle
  bubble.addEventListener("click", () => {
    // Incrémente le score
    counter++;

    // Met à jour l'affichage du score dans l'élément avec l'id 'score'
    score.textContent = counter;

    // Si le score actuel dépasse le meilleur score enregistré
    if (counter > bestScore) {
      // Met à jour le meilleur score
      bestScore = counter;

      // Enregistre le nouveau meilleur score dans le localStorage
      localStorage.setItem("bestScore", bestScore);

      // Met à jour l'affichage du meilleur score
      best.textContent = bestScore;
    }

    // Supprime la bulle après le clic
    bubble.remove();
  });

  // Supprime automatiquement la bulle après 8 secondes si elle n'est pas cliquée
  setTimeout(() => {
    bubble.remove();
  }, 8000);
};

// Fonction pour démarrer ou redémarrer une partie
const startGame = () => {
  // Réinitialise le score
  counter = 0;

  // Réinitialise le compte à rebours
  timer = 30;

  // Active le jeu
  gameActive = true;

  // Met à jour l'affichage du score
  score.textContent = counter;

  // Met à jour l'affichage du temps restant
  timerSeconde.textContent = timer;

  // Cache le bouton "Rejouer"
  replayBtn.style.display = "none";

  // Lance un intervalle pour créer une bulle toutes les 3 secondes
  bubbleInterval = setInterval(bubbleMaker, 300);

  // Lance un intervalle pour diminuer le temps chaque seconde
  countdownInterval = setInterval(() => {
    // Si le temps est écoulé, termine le jeu
    if (timer <= 0) {
      endGame();
    } else {
      // Sinon, décrémente le timer
      timer--;

      // Met à jour l'affichage du temps
      timerSeconde.textContent = timer;
    }
  }, 1000);
};

// Fonction pour arrêter le jeu
const endGame = () => {
  // Désactive le jeu
  gameActive = false;

  // Stoppe la création des bulles
  clearInterval(bubbleInterval);

  // Stoppe le décompte du temps
  clearInterval(countdownInterval);

  // Affiche le bouton "Rejouer"
  replayBtn.style.display = "block";
};

// Quand on clique sur le bouton "Rejouer"
replayBtn.addEventListener("click", () => {
  // Supprime toutes les bulles existantes de l'écran
  document.querySelectorAll('.bubble').forEach(b => b.remove());

  // Redémarre le jeu
  startGame();
});

// Démarre automatiquement une partie quand la page se charge
startGame();
