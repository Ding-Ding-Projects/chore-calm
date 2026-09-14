/* Local Material Design 3 primitives for the marketing surfaces. No CDN component library is required. */
class MdButton extends HTMLElement {
  connectedCallback() {
    this.setAttribute('role', this.getAttribute('role') || 'button');
    if (!this.hasAttribute('tabindex') && !this.hasAttribute('disabled')) this.tabIndex = 0;
    this.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        this.click();
      }
    });
    this.addEventListener('click', () => {
      const href = this.getAttribute('href');
      if (href && !this.hasAttribute('disabled')) window.location.assign(href);
    });
  }
}
class MdLink extends HTMLElement {
  connectedCallback() {
    this.setAttribute('role', this.getAttribute('role') || 'link');
    if (!this.hasAttribute('tabindex') && !this.hasAttribute('aria-disabled')) this.tabIndex = 0;
    this.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        this.click();
      }
    });
    this.addEventListener('click', () => {
      const href = this.getAttribute('href');
      if (href && !this.hasAttribute('aria-disabled')) window.location.assign(href);
    });
  }
}
class MdIconButton extends MdButton {}
class MdCard extends HTMLElement {}
customElements.define('md-button', MdButton);
customElements.define('md-link', MdLink);
customElements.define('md-icon-button', MdIconButton);
customElements.define('md-card', MdCard);
