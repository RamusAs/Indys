window.onload = function () {
  checkItemsActive();
  const items = document.querySelectorAll(".item");
  const tabs = document.querySelectorAll(".tab");

  for (let i = 0; i < tabs.length; i++) {
    tabs[i].addEventListener("click", () => {
      checkItemsActive();
      for (let j = 0; j < items.length; j++) {
        if (j === i) {
          items[j].classList.add("active");
          tabs[j].classList.add("active");
          displayDefaultPage();
        } else {
          items[j].classList.remove("active");
          tabs[j].classList.remove("active");
        }
      }

    });
  }
  
    items.forEach(item => {
      const itemsButtons = item.querySelectorAll("button");
      itemsButtons.forEach(button => {
        button.addEventListener("click", (e) => {
          itemsButtons.forEach(btn => {
            btn.classList.remove("active");
          });
          button.classList.add("active");
          checkItemsActive();
          getPage();
        });
      });
    });

    function checkItemsActive() {
      const items = document.querySelectorAll(".item");
      items.forEach(item => {
        const itemsButtons = item.querySelectorAll("button");
        const hasActiveButton = Array.from(itemsButtons).some(btn => {
          return btn.classList.contains("active");
        });
    
        if (hasActiveButton) {
          item.classList.remove("empty");
        } else {
          item.classList.add("empty");
        }
      });
      getPage();
      displayDefaultPage();
    }

    function displayDefaultPage() {
      if (document.querySelector(".item.active").classList.contains("empty")) {
        document.querySelector("#page-default").classList.add("active");
      } else {
        document.querySelector("#page-default").classList.remove("active");

      }
    }

    function getPage() {
      const buttonRead = document.querySelector(".item.active button.read");
      const buttonSummarize = document.querySelector(".item.active button.summarize");
     if (buttonRead) {
      if (buttonRead.classList.contains("active")) {
        document.querySelector("#page-read").classList.add("active");
        document.querySelector("#page-summarize").classList.remove("active");
        document.querySelector("#page-default").classList.remove("active");
      } else {
        document.querySelector("#page-read").classList.remove("active");
      }
     }
     if (buttonSummarize) {
      if (buttonSummarize.classList.contains("active")) {
        document.querySelector("#page-summarize").classList.add("active");
        document.querySelector("#page-default").classList.remove("active");
        document.querySelector("#page-read").classList.remove("active");
      } else {
        document.querySelector("#page-summarize").classList.remove("active");
      }
     }


    }



}
