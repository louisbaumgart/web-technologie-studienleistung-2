function startCountdown(p_targetDate, elementId) {
  const targetDate = new Date(p_targetDate).getTime();
  const targetElement = document.getElementById(elementId);

  if (!targetElement) {
    console.warn(`Countdown: Element not found: "${elementId}".`);
    return;
  }

  const countdownInterval = setInterval(() => {
    const nowDate = new Date().getTime();
    const leftDate = targetDate - nowDate;

    if (leftDate <= 0) {
      clearInterval(countdownInterval);
      targetElement.innerHTML = "Das Festival hat begonnen!";
      return;
    }

    const tage = Math.floor(leftDate / (1000 * 60 * 60 * 24));
    const stunden = Math.floor((leftDate % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minuten = Math.floor((leftDate % (1000 * 60 * 60)) / (1000 * 60));
    const sekunden = Math.floor((leftDate % (1000 * 60)) / 1000);

    targetElement.innerHTML =
      `${tage} Tage, ${stunden} Std, ${minuten} Min, ${sekunden} Sek bis zum Festivalstart!`;
  }, 1000);
}
