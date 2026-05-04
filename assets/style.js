// xử lý menu điều hướng
document.addEventListener("DOMContentLoaded", () => {
  const menu = document.querySelector("nav.menu");
  if (!menu) return;

  const prevButton = menu.querySelector(".menu__button--prev");
  const nextButton = menu.querySelector(".menu__button--next");
  const menuItems = Array.from(menu.querySelectorAll(".menu__item"));
  if (!prevButton || !nextButton || !menuItems.length) return;

  let activeIndex = menuItems.findIndex((item) =>
    item.classList.contains("menu__item--active"),
  );
  if (activeIndex === -1) activeIndex = 0;

  const updateState = (index) => {
    activeIndex = Math.max(0, Math.min(index, menuItems.length - 1));

    menuItems.forEach((item, itemIndex) => {
      item.classList.toggle("menu__item--active", itemIndex === activeIndex);
    });

    prevButton.disabled = activeIndex === 0;
    nextButton.disabled = activeIndex === menuItems.length - 1;
  };

  const navigateTo = (index) => {
    updateState(index);
    const href = menuItems[activeIndex].getAttribute("href");
    if (href && href.startsWith("#")) {
      window.location.hash = href;
    }
  };

  menuItems.forEach((item, index) => {
    item.addEventListener("click", (event) => {
      if (index === activeIndex) return;
      event.preventDefault();
      navigateTo(index);
    });
  });

  prevButton.addEventListener("click", (event) => {
    if (activeIndex <= 0) return;
    event.preventDefault();
    navigateTo(activeIndex - 1);
  });

  nextButton.addEventListener("click", (event) => {
    if (activeIndex >= menuItems.length - 1) return;
    event.preventDefault();
    navigateTo(activeIndex + 1);
  });

  updateState(activeIndex);
});

// xử lý thêm class fullscreen-menu__list--visible khi click class menu__button--toggle
document.addEventListener("DOMContentLoaded", () => {
  const toggleButton = document.querySelector(".menu__button--toggle");
  const closeButton = document.querySelector(".fullscreen-menu__close");
  const menuList = document.querySelector(".fullscreen-menu__list");
  if (!toggleButton || !menuList) return;

  closeButton.addEventListener("click", () => {
    menuList.classList.remove("fullscreen-menu__list--visible");
  });

  toggleButton.addEventListener("click", () => {
    menuList.classList.toggle("fullscreen-menu__list--visible");
  });

  // khi click vào một item trong menu, ẩn menu đi
  const menuItems = menuList.querySelectorAll(".fullscreen-menu__item");
  menuItems.forEach((item) => {
    item.addEventListener("click", () => {
      menuList.classList.remove("fullscreen-menu__list--visible");
    });
  });
});
