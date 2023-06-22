window.onload = function () {
  const items = document.querySelectorAll(".item");
  const tabs = document.querySelectorAll(".tab");
  let anyTabActive = false;
  for (let i = 0; i < tabs.length; i++) {
    tabs[i].addEventListener("click", () => {
      for (let j = 0; j < items.length; j++) {
        if (j === i) {
          items[j].classList.add("active");
          tabs[j].classList.add("active");
          anyTabActive = true;
        } else {
          items[j].classList.remove("active");
          tabs[j].classList.remove("active");
        }
      }

      if (!anyTabActive) {
        console.log("ok");
        const pages = document.querySelectorAll(".page");
        for (let k = 0; k < pages.length; k++) {
          if (pages[k].id !== "page-default") {
            pages[k].classList.remove("active");
          }
        }
      }

      anyTabActive = false;
    });
  }
}
