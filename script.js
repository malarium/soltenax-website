document.addEventListener("DOMContentLoaded", () => {
  const audio = document.getElementById("bg-music");

  // Ustawienie głośności i zapętlenia
  audio.volume = 0.3;
  audio.loop = true;

  // Zmienna, w której będziemy trzymać status ładowania muzyki
  let playPromise;

  document.addEventListener("click", () => {
    if (audio.paused) {
      // Przypisujemy "obietnicę" odtwarzania do naszej zmiennej
      playPromise = audio.play();

      // Wyłapujemy ewentualne inne błędy (np. brak pliku)
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.error("Błąd odtwarzania:", error);
        });
      }
    } else {
      // Jeśli chcemy spauzować, musimy najpierw upewnić się, że playPromise istnieje...
      if (playPromise !== undefined) {
        // ...i poczekać, aż obietnica odtwarzania zostanie w 100% zrealizowana!
        playPromise
          .then(() => {
            audio.pause();
          })
          .catch((error) => {
            console.error("Zignorowano pauzę:", error);
          });
      } else {
        // Zwykła pauza na wszelki wypadek
        audio.pause();
      }
    }
  });
});
