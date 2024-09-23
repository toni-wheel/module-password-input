class PasswordToggle extends HTMLElement {
  // Регистрация компонента с тегом "password-toggle"
  static register(tag = "password-toggle") {
    if ("customElements" in window) {
      customElements.define(tag, this);
    }
  }

  // Метод, который вызывается при подключении компонента к DOM
  connectedCallback() {
    // Находим элементы input и статус по их ID
    this.input = document.getElementById(this.dataset.inputId);
    this.status = document.getElementById(this.dataset.statusId);
    this.btn = this.querySelector("button");

    if (!this.input || !this.btn) return;

    // Инициализация атрибутов кнопки
    this.btn.ariaPressed = false;
    this.btn.ariaLabel = "Показать пароль";
    this.btn.setAttribute("aria-controls", this.dataset.inputId);
    this.btn.addEventListener("click", this);
  }

  // Обработка клика по кнопке
  handleEvent(e) {
    // Переключение видимости пароля
    if (this.input.type === "password") {
      this.btn.ariaPressed = true;
      this.btn.ariaLabel = "Скрыть пароль";
      this.input.type = "text";

      // Обновление текста статуса
      if (this.status) this.status.textContent = "Пароль виден";
    } else {
      this.btn.ariaPressed = false;
      this.btn.ariaLabel = "Показать пароль";
      this.input.type = "password";

      // Обновление текста статуса
      if (this.status) this.status.textContent = "Пароль скрыт";
    }
  }
}

// Регистрация компонента
PasswordToggle.register();
