/* Local Material Design 3 primitives for the concept surfaces. No CDN component library is required. */
const mdShadowStyle = `
  :host { box-sizing: border-box; color: inherit; font: inherit; }
  *, *::before, *::after { box-sizing: border-box; }
  select, input { width: 100%; min-height: 48px; font: inherit; color: var(--ink, #20212a); background: var(--surface, #fff); border: 1px solid var(--outline, #777985); border-radius: 12px; }
  select { padding: 0 14px; }
  input[type="range"] { min-height: 28px; border: 0; accent-color: var(--primary, #4a4a96); background: transparent; }
  input[type="search"] { padding: 0 4px; border: 0; outline: 0; background: transparent; }
  button { min-height: 48px; padding: 0 16px; border: 0; border-radius: 999px; font: inherit; font-weight: 750; color: var(--primary, #4a4a96); background: var(--primary-soft, #e1e2ff); cursor: pointer; }
  button:focus-visible, select:focus-visible, input:focus-visible { outline: none; box-shadow: var(--focus, 0 0 0 3px #fff, 0 0 0 6px #6868c0); }
  .switch-track { position: relative; display: block; width: 42px; height: 24px; padding: 3px; border-radius: 99px; background: var(--outline, #777985); transition: background .2s ease; }
  .switch-thumb { display: block; width: 18px; height: 18px; border-radius: 50%; background: #fff; transition: transform .2s ease; }
  :host([aria-checked="true"]) .switch-track { background: var(--primary, #4a4a96); }
  :host([aria-checked="true"]) .switch-thumb { transform: translateX(18px); }
`;

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

class MdSelect extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    const style = document.createElement('style');
    style.textContent = mdShadowStyle;
    this.select = document.createElement('select');
    this.shadowRoot.append(style, this.select);
    this.observer = new MutationObserver(() => this.syncOptions());
  }

  connectedCallback() {
    this.setAttribute('role', 'combobox');
    this.select.setAttribute('aria-label', this.getAttribute('aria-label') || this.id || 'Choose an option');
    this.syncOptions();
    this.observer.observe(this, { childList: true });
    this.select.addEventListener('change', (event) => {
      event.stopPropagation();
      this.dispatchEvent(new Event('change', { bubbles: true }));
    });
  }

  syncOptions() {
    const current = this.pendingValue ?? this.value;
    const options = [...this.querySelectorAll(':scope > option')].map((option) => option.cloneNode(true));
    this.select.replaceChildren(...options);
    if (current !== '') this.select.value = current;
    this.pendingValue = null;
  }

  get value() { return this.select.value; }
  set value(value) { this.pendingValue = String(value); this.select.value = this.pendingValue; }
  get options() { return this.select.options; }
  get selectedIndex() { return this.select.selectedIndex; }
  focus() { this.select.focus(); }
}

class MdSlider extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    const style = document.createElement('style');
    style.textContent = mdShadowStyle;
    this.input = document.createElement('input');
    this.input.type = 'range';
    this.shadowRoot.append(style, this.input);
  }

  connectedCallback() {
    ['min', 'max', 'step', 'value'].forEach((name) => {
      if (this.hasAttribute(name)) this.input.setAttribute(name, this.getAttribute(name));
    });
    this.setAttribute('role', 'slider');
    this.setAttribute('aria-valuemin', this.input.min);
    this.setAttribute('aria-valuemax', this.input.max);
    this.updateAriaValue();
    this.input.addEventListener('input', (event) => {
      event.stopPropagation();
      this.updateAriaValue();
      this.dispatchEvent(new Event('input', { bubbles: true }));
    });
  }

  updateAriaValue() { this.setAttribute('aria-valuenow', this.input.value); }
  get value() { return this.input.value; }
  set value(value) { this.input.value = String(value); this.updateAriaValue(); }
  focus() { this.input.focus(); }
}

class MdSwitch extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    const style = document.createElement('style');
    style.textContent = mdShadowStyle;
    this.track = document.createElement('span');
    this.track.className = 'switch-track';
    this.thumb = document.createElement('span');
    this.thumb.className = 'switch-thumb';
    this.track.append(this.thumb);
    this.shadowRoot.append(style, this.track);
  }

  connectedCallback() {
    this.setAttribute('role', 'switch');
    if (!this.hasAttribute('tabindex')) this.tabIndex = 0;
    this.checked = this.hasAttribute('checked');
    this.addEventListener('click', (event) => {
      if (event.target === this) this.checked = !this.checked;
    });
    this.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        this.checked = !this.checked;
      }
    });
  }

  get checked() { return this.getAttribute('aria-checked') === 'true'; }
  set checked(value) {
    const next = Boolean(value);
    const changed = this.checked !== next;
    this.setAttribute('aria-checked', String(next));
    this.toggleAttribute('checked', next);
    if (changed) this.dispatchEvent(new Event('change', { bubbles: true }));
  }
}

class MdFilePicker extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    const style = document.createElement('style');
    style.textContent = mdShadowStyle;
    this.button = document.createElement('button');
    this.button.type = 'button';
    this.input = document.createElement('input');
    this.input.type = 'file';
    this.input.hidden = true;
    this.shadowRoot.append(style, this.button, this.input);
  }

  connectedCallback() {
    this.setAttribute('role', 'button');
    if (!this.hasAttribute('tabindex')) this.tabIndex = 0;
    this.button.textContent = this.getAttribute('label') || 'Choose local file';
    this.button.setAttribute('aria-label', this.getAttribute('aria-label') || this.button.textContent);
    if (this.hasAttribute('accept')) this.input.setAttribute('accept', this.getAttribute('accept'));
    this.button.addEventListener('click', (event) => { event.stopPropagation(); this.input.click(); });
    this.input.addEventListener('change', (event) => {
      event.stopPropagation();
      this.dispatchEvent(new Event('change', { bubbles: true }));
    });
    this.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        this.input.click();
      }
    });
  }

  get files() { return this.input.files; }
  get value() { return this.input.value; }
  set value(value) { if (!value) this.input.value = ''; }
  focus() { this.button.focus(); }
}

class MdSearch extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    const style = document.createElement('style');
    style.textContent = mdShadowStyle;
    this.input = document.createElement('input');
    this.input.type = 'search';
    this.shadowRoot.append(style, this.input);
  }

  connectedCallback() {
    this.setAttribute('role', 'searchbox');
    this.input.setAttribute('aria-label', this.getAttribute('aria-label') || 'Search');
    if (this.hasAttribute('placeholder')) this.input.setAttribute('placeholder', this.getAttribute('placeholder'));
    this.input.autocomplete = this.getAttribute('autocomplete') || 'off';
    this.input.addEventListener('input', (event) => {
      event.stopPropagation();
      this.dispatchEvent(new Event('input', { bubbles: true }));
    });
    this.input.addEventListener('keydown', (event) => {
      event.stopPropagation();
      this.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: event.key, code: event.code, ctrlKey: event.ctrlKey, shiftKey: event.shiftKey, altKey: event.altKey, metaKey: event.metaKey }));
    });
  }

  get value() { return this.input.value; }
  set value(value) { this.input.value = String(value); }
  focus() { this.input.focus(); }
}

class MdIconButton extends MdButton {}
class MdCard extends HTMLElement {}

customElements.define('md-button', MdButton);
customElements.define('md-link', MdLink);
customElements.define('md-select', MdSelect);
customElements.define('md-slider', MdSlider);
customElements.define('md-switch', MdSwitch);
customElements.define('md-file-picker', MdFilePicker);
customElements.define('md-search', MdSearch);
customElements.define('md-icon-button', MdIconButton);
customElements.define('md-card', MdCard);
