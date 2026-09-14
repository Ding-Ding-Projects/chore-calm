/* Local Lang gui primitives for the marketing surfaces. No CDN component library is required. */
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
  }
}
class MdIconButton extends MdButton {}
class MdCard extends HTMLElement {}
customElements.define('md-button', MdButton);
customElements.define('md-icon-button', MdIconButton);
customElements.define('md-card', MdCard);
