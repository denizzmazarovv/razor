document.addEventListener("DOMContentLoaded", function () {
  // Мобильное меню
  const navToggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".nav");

  navToggle.addEventListener("click", function () {
    this.classList.toggle("active");
    nav.classList.toggle("active");
  });

  // Закрытие мобильного меню при клике на ссылку
  const navLinks = document.querySelectorAll(".nav__link");
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      if (nav.classList.contains("active")) {
        navToggle.classList.remove("active");
        nav.classList.remove("active");
      }
    });
  });

  // Плавный скролл для якорных ссылок
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerHeight = document.querySelector(".header").offsetHeight;
        const targetPosition =
          targetElement.getBoundingClientRect().top +
          window.pageYOffset -
          headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // Фиксация хедера при скролле
  const header = document.querySelector(".header");
  let lastScroll = 0;

  window.addEventListener("scroll", function () {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
      header.classList.remove("scroll-up");
    }

    if (
      currentScroll > lastScroll &&
      !header.classList.contains("scroll-down")
    ) {
      header.classList.remove("scroll-up");
      header.classList.add("scroll-down");
    }

    if (
      currentScroll < lastScroll &&
      header.classList.contains("scroll-down")
    ) {
      header.classList.remove("scroll-down");
      header.classList.add("scroll-up");
    }

    lastScroll = currentScroll;
  });

  // Валидация формы
  const bookingForm = document.getElementById("booking-form");
  const modal = document.getElementById("success-modal");
  const modalClose = document.querySelector(".modal__close");
  const modalBtn = document.querySelector(".modal__btn");

  if (bookingForm) {
    bookingForm.addEventListener("submit", function (e) {
      e.preventDefault();

      let isValid = true;

      // Валидация имени
      const nameInput = document.getElementById("name");
      const nameError = nameInput.nextElementSibling;

      if (nameInput.value.trim() === "") {
        nameError.textContent = "Пожалуйста, введите ваше имя";
        nameError.classList.add("show");
        isValid = false;
      } else if (nameInput.value.trim().length < 2) {
        nameError.textContent = "Имя должно содержать минимум 2 символа";
        nameError.classList.add("show");
        isValid = false;
      } else {
        nameError.classList.remove("show");
      }

      // Валидация телефона
      const phoneInput = document.getElementById("phone");
      const phoneError = phoneInput.nextElementSibling;
      const phoneRegex =
        /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

      if (phoneInput.value.trim() === "") {
        phoneError.textContent = "Пожалуйста, введите ваш телефон";
        phoneError.classList.add("show");
        isValid = false;
      } else if (!phoneRegex.test(phoneInput.value.trim())) {
        phoneError.textContent =
          "Пожалуйста, введите корректный номер телефона";
        phoneError.classList.add("show");
        isValid = false;
      } else {
        phoneError.classList.remove("show");
      }

      // Валидация email (необязательное поле)
      const emailInput = document.getElementById("email");
      const emailError = emailInput.nextElementSibling;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (
        emailInput.value.trim() !== "" &&
        !emailRegex.test(emailInput.value.trim())
      ) {
        emailError.textContent = "Пожалуйста, введите корректный email";
        emailError.classList.add("show");
        isValid = false;
      } else {
        emailError.classList.remove("show");
      }

      // Валидация услуги
      const serviceSelect = document.getElementById("service");
      const serviceError = serviceSelect.nextElementSibling;

      if (serviceSelect.value === null || serviceSelect.value === "") {
        serviceError.textContent = "Пожалуйста, выберите услугу";
        serviceError.classList.add("show");
        isValid = false;
      } else {
        serviceError.classList.remove("show");
      }

      // Валидация даты
      const dateInput = document.getElementById("date");
      const dateError = dateInput.nextElementSibling;

      if (dateInput.value === "") {
        dateError.textContent = "Пожалуйста, выберите дату";
        dateError.classList.add("show");
        isValid = false;
      } else {
        dateError.classList.remove("show");
      }

      // Если форма валидна, показываем модальное окно
      if (isValid) {
        modal.classList.add("show");
        bookingForm.reset();
      }
    });
  }

  // Закрытие модального окна
  if (modalClose && modalBtn) {
    modalClose.addEventListener("click", function () {
      modal.classList.remove("show");
    });

    modalBtn.addEventListener("click", function () {
      modal.classList.remove("show");
    });

    // Закрытие при клике вне модального окна
    window.addEventListener("click", function (e) {
      if (e.target === modal) {
        modal.classList.remove("show");
      }
    });
  }

  // Анимация при скролле
  const animateOnScroll = function () {
    const elements = document.querySelectorAll(
      ".service-card, .master-card, .gallery-item"
    );

    elements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.3;

      if (elementPosition < screenPosition) {
        element.style.opacity = "1";
        element.style.transform = "translateY(0)";
      }
    });
  };

  // Установка начального состояния для анимации
  const serviceCards = document.querySelectorAll(".service-card");
  const masterCards = document.querySelectorAll(".master-card");
  const galleryItems = document.querySelectorAll(".gallery-item");

  serviceCards.forEach((card) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";
    card.style.transition = "opacity 0.5s ease, transform 0.5s ease";
  });

  masterCards.forEach((card) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";
    card.style.transition = "opacity 0.5s ease 0.2s, transform 0.5s ease 0.2s";
  });

  galleryItems.forEach((item) => {
    item.style.opacity = "0";
    item.style.transform = "translateY(20px)";
    item.style.transition = "opacity 0.5s ease 0.4s, transform 0.5s ease 0.4s";
  });

  // Запуск анимации при загрузке и скролле
  window.addEventListener("load", animateOnScroll);
  window.addEventListener("scroll", animateOnScroll);

  // Установка минимальной даты для бронирования (сегодня)
  const dateInput = document.getElementById("date");
  if (dateInput) {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const yyyy = today.getFullYear();
    const minDate = yyyy + "-" + mm + "-" + dd;

    dateInput.setAttribute("min", minDate);
  }
});
