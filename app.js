const levelInfo = {
  0: { label: 'Groen', className: 'badge-green', summary: 'Vrij rustig weer, weinig kans op neerslag of zwaar weer.', advice: ['Lopen en fietsen is comfortabel.', 'Kijk nog even naar de buienradar als je buiten wilt blijven.'] },
  1: { label: 'Geel', className: 'badge-yellow', summary: 'Er kunnen korte buien of lichte onweersbuien ontstaan.', advice: ['Neem een lichte jas mee.', 'Check de 10-minuten verwachting voor je route.'] },
  2: { label: 'Oranje', className: 'badge-orange', summary: 'Reële kans op regen, onweer en kortdurende windstoten.', advice: ['Zet een paraplu of regenjas in je tas.', 'Vermijd open terrein bij plotselinge onweersbuien.'] },
  3: { label: 'Rood', className: 'badge-red', summary: 'Zware buien of onweer zijn waarschijnlijk in de provincie.', advice: ['Blijf op de hoogte van waarschuwingen.', 'Vermijd grote struiken, water en open vlakken.'] },
  4: { label: 'Paars', className: 'badge-purple', summary: 'Ernstige weersomstandigheden, kans op zware onweersbuien en hagel.', advice: ['Houd rekening met veiligheidsrisico\'s.', 'Vermijd reizen als het onweer direct boven je gebied hangt.'] },
  5: { label: 'Wit', className: 'badge-white', summary: 'Geen actuele waarschuwing, maar de situatie kan snel veranderen.', advice: ['Bewaar de kaart in de gaten.', 'Controleer lokaal de neerslagverwachting.'] }
};

const provinceData = {
  'groningen': { name: 'Groningen', temp: '15°C', wind: '24 km/u', rain: '48%', summary: 'Mogelijke buien in het noorden met lokaal een kort onweer.' },
  'friesland': { name: 'Friesland', temp: '16°C', wind: '22 km/u', rain: '42%', summary: 'Matige kans op regen, vooral in de middag en avond.' },
  'drenthe': { name: 'Drenthe', temp: '17°C', wind: '19 km/u', rain: '51%', summary: 'Buien kunnen zich van west naar oost bewegen; kans op onweer aanwezig.' },
  'flevoland': { name: 'Flevoland', temp: '18°C', wind: '20 km/u', rain: '46%', summary: 'Rustige start, maar later in de dag meer kans op verplaatsende buien.' },
  'overijssel': { name: 'Overijssel', temp: '19°C', wind: '24 km/u', rain: '55%', summary: 'Zware buien blijven kansrijk in de oostelijke helft van de provincie.' },
  'gelderland': { name: 'Gelderland', temp: '20°C', wind: '28 km/u', rain: '61%', summary: 'Ernstige onweersbuien kunnen lokaal ontstaan en plotseling zijn.' },
  'utrecht': { name: 'Utrecht', temp: '19°C', wind: '26 km/u', rain: '57%', summary: 'Buien met kans op windstoten en korte, hevige pieken.' },
  'noord-holland': { name: 'Noord-Holland', temp: '18°C', wind: '21 km/u', rain: '44%', summary: 'Lichte regen en korte onweersbuien in het westen zijn mogelijk.' },
  'zuid-holland': { name: 'Zuid-Holland', temp: '20°C', wind: '27 km/u', rain: '58%', summary: 'Verwachte buien kunnen lokaal intensief worden en uitvallen.' },
  'noord-brabant': { name: 'Noord-Brabant', temp: '21°C', wind: '30 km/u', rain: '64%', summary: 'Hoge kans op zware onweersbuien en hagel in de middag.' },
  'limburg': { name: 'Limburg', temp: '22°C', wind: '25 km/u', rain: '49%', summary: 'Buien kunnen lokaal sterk zijn, vooral in de zuidoostelijke hoek.' },
  'zeeland': { name: 'Zeeland', temp: '19°C', wind: '23 km/u', rain: '41%', summary: 'Milde buien, met af en toe kleine onweerspieken in de loop van de dag.' }
};

function formatLastUpdated() {
  const now = new Date();
  const time = now.toLocaleTimeString('nl-NL', {
    hour: '2-digit',
    minute: '2-digit'
  });

  document.getElementById('last-update').textContent = time;
}

function renderProvinceInfo(provinceId) {
  const province = provinceData[provinceId];
  const polygon = document.getElementById(provinceId);

  if (!province || !polygon) {
    return;
  }

  const code = Number(polygon.dataset.code || 0);
  const meta = levelInfo[code] || levelInfo[0];

  document.getElementById('province-name').textContent = province.name;
  document.getElementById('province-info').innerHTML = `
    <div class="code-badge ${meta.className}">${meta.label}</div>
    <div class="meta-grid">
      <div class="meta-item">
        <span class="meta-label">Temperatuur</span>
        <span class="meta-value">${province.temp}</span>
      </div>
      <div class="meta-item">
        <span class="meta-label">Wind</span>
        <span class="meta-value">${province.wind}</span>
      </div>
      <div class="meta-item">
        <span class="meta-label">Neerslag</span>
        <span class="meta-value">${province.rain}</span>
      </div>
      <div class="meta-item">
        <span class="meta-label">Status</span>
        <span class="meta-value">${meta.label}</span>
      </div>
    </div>
    <p class="status-text">${province.summary}</p>
    <ul class="tips">
      ${meta.advice.map(item => `<li>${item}</li>`).join('')}
    </ul>
  `;
}

function selectProvince(provinceId) {
  document.querySelectorAll('.province').forEach((polygon) => {
    polygon.classList.toggle('active', polygon.id === provinceId);
  });

  renderProvinceInfo(provinceId);
}

const provinceButtons = document.querySelectorAll('.province');
provinceButtons.forEach((polygon) => {
  polygon.addEventListener('click', () => selectProvince(polygon.id));
});

selectProvince('noord-holland');
formatLastUpdated();
setInterval(formatLastUpdated, 60000);
