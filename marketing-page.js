(() => {
  const provenance = window.CHORE_CALM_BUILD_PROVENANCE || {};
  document.querySelectorAll('[data-version]').forEach((node) => { node.textContent = provenance.version || '0.1.0'; });
  document.querySelectorAll('[data-updated]').forEach((node) => { node.textContent = provenance.updatedAt || 'Unavailable without build provenance'; });
  document.querySelectorAll('[data-timezone]').forEach((node) => {
    const match = String(provenance.updatedAt || '').match(/([+-]\d{2}:\d{2})$/);
    node.textContent = match ? `Timezone: UTC${match[1]}` : 'Timezone unavailable';
  });
})();
