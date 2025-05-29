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


document.addEventListener("DOMContentLoaded", () => {
  const helperList = document.getElementById("helper-list");
  const loading = document.getElementById("loading-helper");
  loading.style.display = "block";

  fetch("https://randomuser.me/api/?results=30&seed=a")
    .then(response => {
      if (!response.ok) throw new Error("Daten konnten nicht geladen werden");
      return response.json();
    })
    .then(data => {
      loading.style.display = "none";
      data.results.forEach(person => {
        const card = document.createElement("div");
        card.className = "helper-card";

        const birth = new Date(person.dob.date).toLocaleDateString("de-DE");
        const reg = new Date(person.registered.date).toLocaleDateString("de-DE");

        card.innerHTML = `
          <div class="helper-card-content">
            <div class="helper-card-left">
              <img src="${person.picture.large}" alt="Portrait von ${person.name.first} ${person.name.last}" class="helper-img">
              <p class="helper-name">${person.name.first} ${person.name.last}</p>
            </div>
            <div class="helper-card-right">
              <p>
                <img src="src/id.svg" alt="ID" title="ID" class="icon-inline" />
                ${person.id.value}
              </p>
              <p>
                <img src="src/gender.svg" alt="Geschlecht" title="Geschlecht" class="icon-inline" />
                ${person.gender}
              </p>
              <p>
                <img src="src/dob.svg" alt="Geburtsdatum" title="Geburtsdatum" class="icon-inline" />
                ${birth}
              </p>
              <p>
                <img src="src/email.svg" alt="Email" title="Email" class="icon-inline" />
                ${person.email}
              </p>
              <p>
                <img src="src/mobile.svg" alt="Mobil" title="Mobil" class="icon-inline" />
                ${person.cell}
              </p>
              <p>
                <img src="src/phone.svg" alt="Telefon" title="Telefon" class="icon-inline" />
                ${person.phone}
              </p>
              <p>
                <img src="src/registered_since.svg" alt="Registriert seit" title="Registriert seit" class="icon-inline" />
                ${reg}
              </p>
            </div>
          </div>
        `;
        helperList.appendChild(card);
      });
    })
    .catch(err => {
      loading.textContent = "Fehler beim Laden der Helfer:innen.";
      console.error(err);
    });
});
