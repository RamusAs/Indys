window.onload = function () {
  const items = document.querySelectorAll(".item");
  const tabs = document.querySelectorAll(".tab");

  for (let i = 0; i < tabs.length; i++) {
    tabs[i].addEventListener("click", () => {
      for (let j = 0; j < items.length; j++) {
        if (j === i) {
          items[j].classList.add("active");
          tabs[j].classList.add("active");
        } else {
          items[j].classList.remove("active");
          tabs[j].classList.remove("active");
        }
      }
    });
  }
}
