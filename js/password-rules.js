class PasswordRules extends HTMLElement {
  // Регистрация компонента с тегом "password-rules"
  static register(tag = "password-rules") {
    if ("customElements" in window) {
      customElements.define(tag, this);
    }
  }

  // Метод, который вызывается при подключении компонента к DOM
  connectedCallback() {
    // Находим input по ID, который передается в атрибуте data-input-id
    this.input = document.getElementById(this.dataset.inputId);

    if (!this.input) return;

    // Инициализация правил пароля
    this.rules = [];
    this.setupRules();
    // Добавляем обработчик события "input" для поля ввода
    this.input.addEventListener("input", this);
  }

  // Обработка события ввода пароля
  handleEvent(e) {
    this.score = 0;

    // Проверка каждого правила на соответствие введенному паролю
    for (let [index, rule] of this.rules.entries()) {
      const match = e.target.value.match(rule);

      if (match) this.score++;

      // Обновление класса элемента на основании результата проверки
      this.toggleMatchedRuleClass(index, match);
    }

    // Устанавливаем атрибуты для визуализации прогресса
    this.setAttributes("score", this.score);
  }

  // Метод для установки атрибутов и стилей
  setAttributes(name, value) {
    this.dataset[name] = value;
    this.style.setProperty(`--${name}`, value);
  }

  // Настройка правил проверки пароля
  setupRules() {
    const rules = this.dataset.rules;

    if (!rules) return;

    // Разбиваем правила, переданные через data-rules, на массив регулярных выражений
    rules.split(this.dataset.separator || ",").forEach((match) => {
      this.rules.push(new RegExp(match.trim()));
    });

    // Устанавливаем атрибуты для общего количества правил
    this.setAttributes("total", this.rules.length);
  }

  // Обновление класса правила на основании того, выполнено ли оно
  toggleMatchedRuleClass(index, value) {
    const el = this.querySelector(`[data-rule-index="${index}"]`);

    if (!el) return;

    el.classList.toggle("is-match", value);
  }
}

// Регистрация компонента
PasswordRules.register();
