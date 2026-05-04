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

// xử lý thêm class fullscreen-menu__list--visible khi click class menu__button--toggle hoặc class fixed-links__link fixed-links__link--open, và khi click vào một item trong menu thì sẽ ẩn menu đi
document.addEventListener("DOMContentLoaded", () => {
  const toggleButton = document.querySelector(".menu__button--toggle");
  const fixedToggleLink = document.querySelector(".fixed-links__link.fixed-links__link--open");
  const closeButton = document.querySelector(".fullscreen-menu__close__button"); // Sửa selector vào tận button
  const menuList = document.querySelector(".fullscreen-menu__list");

  if (!menuList) return;

  const openMenu = () => menuList.classList.add("fullscreen-menu__list--visible");
  const closeMenu = () => menuList.classList.remove("fullscreen-menu__list--visible");

  // Mở menu từ nút toggle
  toggleButton?.addEventListener("click", (e) => {
    e.preventDefault();
    openMenu();
  });

  // Mở menu từ link cố định
  fixedToggleLink?.addEventListener("click", (e) => {
    e.preventDefault();
    openMenu();
  });

  // Đóng menu khi bấm nút X
  closeButton?.addEventListener("click", (e) => {
    e.stopPropagation(); // Ngăn sự kiện nổi bọt lên menuList
    closeMenu();
  });

  // Đóng menu khi click vào một item (Link) bên trong
  menuList.addEventListener("click", (event) => {
    // Kiểm tra nếu click vào chính thẻ <a> hoặc một phần tử con của .fullscreen-menu__item
    if (event.target.closest(".fullscreen-menu__item")) {
      closeMenu();
    }
  });
});

// xử lý scroll đến phần tử có id tương ứng với hash trong URL, và thêm class menu__item--active tương ứng, và xử lý khi scroll đến phần tử đó thì menu__item tương ứng sẽ được active
document.addEventListener("DOMContentLoaded", () => {
  const menuItems = document.querySelectorAll(".menu__item");
  if (!menuItems.length) return;

  const sections = Array.from(menuItems)
    .map((item) => {
      const href = item.getAttribute("href");
      if (href && href.startsWith("#")) {
        const section = document.querySelector(href);
        if (section) {
          return { item, section };
        }
      }
      return null;
    }
    ).filter(Boolean);

  const onScroll = () => {
    const scrollPosition = window.scrollY + window.innerHeight / 2;
    let activeSet = false;
    sections.forEach(({ item, section }) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        item.classList.add("menu__item--active");
        activeSet = true;
      } else {
        item.classList.remove("menu__item--active");
      }
    });

    // nếu không có section nào active, thì active item đầu tiên
    if (!activeSet && sections.length) {
      sections[0].item.classList.add("menu__item--active");
    }
  };

  window.addEventListener("scroll", onScroll);
  onScroll();
});

//click fixed-links__link để hiển thị menu chia sẻ và thêm style margin-top: 55px; margin-bottom: 55px;
document.addEventListener("DOMContentLoaded", () => {
  const shareLink = document.querySelector(".fixed-links__item--share .fixed-links__link");
  const shareMenu = document.querySelector(".share-menu");
  if (!shareLink || !shareMenu) return;
  shareLink.addEventListener("click", (event) => {
    event.preventDefault();
    shareMenu.classList.toggle("visible");
    shareLink.style.marginTop = shareMenu.classList.contains("visible") ? "55px" : "0px";
    shareLink.style.marginBottom = shareMenu.classList.contains("visible") ? "55px" : "0px";
  }
  );
  // click vào bất kỳ đâu ngoài shareMenu sẽ ẩn shareMenu
  document.addEventListener("click", (event) => {
    if (!shareMenu.contains(event.target) && !shareLink.contains(event.target)) {
      shareMenu.classList.remove("visible");
      shareLink.style.marginTop = "0px";
      shareLink.style.marginBottom = "0px";
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const shareBtnInMenu = document.querySelector(".fullscreen-menu__column--right .btn--primary");
  const shareMenu = document.querySelector(".fullscreen-menu__column .share-menu");

  if (shareBtnInMenu && shareMenu) {
    shareBtnInMenu.addEventListener("click", (event) => {
      event.stopPropagation();
      shareMenu.classList.toggle("visible");
      shareBtnInMenu.style.marginTop = shareMenu.classList.contains("visible") ? "55px" : "0px";
      shareBtnInMenu.style.marginBottom = shareMenu.classList.contains("visible") ? "55px" : "0px";
    });
  }

  document.addEventListener("click", (event) => {
    if (shareMenu && !shareBtnInMenu.contains(event.target) && !shareMenu.contains(event.target)) {
      shareMenu.classList.remove("visible");
      shareBtnInMenu.style.marginTop = "0px";
      shareBtnInMenu.style.marginBottom = "0px";
    }
  });
});
// fixed-links__item--toggle mobile-only click thì sẽ bỏ closed và thêm open, click lần nữa sẽ bỏ open và thêm closed
document.addEventListener("DOMContentLoaded", () => {
  const toggleButton = document.querySelector(".fixed-links__item--toggle");
  const fixedLinks = document.querySelector(".fixed-links");
  if (!toggleButton || !fixedLinks) return;
  toggleButton.addEventListener("click", () => {
    fixedLinks.classList.toggle("closed");
    fixedLinks.classList.toggle("open");
  });
});