window.addEventListener("DOMContentLoaded", function() {
  "use strict";

  let tab = document.querySelectorAll(".info-header-tab"),
    info = document.querySelector(".info-header"),
    tabContent = document.querySelectorAll(".info-tabcontent");

  function hideTabContent(a) {
    for (let i = a; i < tabContent.length; i++) {
      tabContent[i].classList.remove("show");
      tabContent[i].classList.add("hide");
    }
  }
  hideTabContent(0);

  function showTabContent(b) {
    if (tabContent[b].classList.contains("hide")) {
      tabContent[b].classList.remove("hide");
      tabContent[b].classList.add("show");
      let tabButton = tabContent[b].querySelector(".description-btn");
      modalWindow(tabButton);
    }
  }
  showTabContent(0);

  info.addEventListener("click", function(event) {
    let target = event.target;
    if (target && target.classList.contains("info-header-tab")) {
      for (let i = 0; i < tab.length; i++) {
        if (target == tab[i]) {
          hideTabContent(0);
          showTabContent(i);
          break;
        }
      }
    }
  });

  // timer
  let deadline = "2020-03-21";
  function getTimeRemaining(endtime) {
    let total = Date.parse(endtime) - Date.parse(new Date()),
      seconds = Math.floor((total / 1000) % 60),
      minutes = Math.floor((total / 1000 / 60) % 60),
      hours = Math.floor(total / (1000 * 60 * 60));

    return {
      total,
      hours,
      minutes,
      seconds
    };
  }

  function setClock(id, endtime) {
    let timer = document.getElementById(id),
      hours = timer.querySelector(".hours"),
      minutes = timer.querySelector(".minutes"),
      seconds = timer.querySelector(".seconds"),
      timeInterval = setInterval(updateClock, 1000);

    function updateClock() {
      let t = getTimeRemaining(endtime);

      function addZero(num) {
        if (num <= 9) {
          return "0" + num;
        } else return num;
      }
      hours.textContent = addZero(t.hours);
      minutes.textContent = addZero(t.minutes);
      seconds.textContent = addZero(t.seconds);

      if (t.total <= 0) {
        clearInterval(timeInterval);
        hours.textContent = "00";
        minutes.textContent = "00";
        seconds.textContent = "00";
      }
    }
  }
  setClock("timer", deadline);

  // modal
  let more = document.querySelector(".more");

  function modalWindow(element) {
    let overlay = document.querySelector(".overlay");
    let close = document.querySelector(".popup-close");

    element.addEventListener("click", function() {
      overlay.style.display = "block";
      this.classList.add("more-splash");
      document.body.style.overflow = "hidden";
    });

    close.addEventListener("click", function() {
      overlay.style.display = "none";
      element.classList.remove("more-splash");
      document.body.style.overflow = "";
    });
  }
  modalWindow(more);

  //form
  let message = {
    loading: "Загрузка...",
    success: "Спасибо! Скоро мы с вами свяжемся!",
    failure: "Что-то пошло не так..."
  };

  let form = document.getElementById("main-form"),
    formBottom = document.getElementById("form"),
    input = document.getElementsByTagName("input"),
    statusMessage = document.createElement("div");

  statusMessage.classList.add("status");

  function sendForm(elem) {
    elem.addEventListener("submit", function(event) {
      event.preventDefault();
      elem.appendChild(statusMessage);

      let formData = new FormData(elem);

      function postData(data) {
        return new Promise(function(resolve, reject) {
          let request = new XMLHttpRequest();
          request.open("POST", "server.php");

          request.setRequestHeader(
            "Content-type",
            "application/json; charset=utf-8"
          );

          let obj = {};
          formData.forEach(function(value, key) {
            obj[key] = value;
          });
          let json = JSON.stringify(obj);

          request.onreadystatechange = function() {
            if (request.readyState < 4) {
              resolve();
            } else if (request.readyState === 4) {
              if (request.status == 200) {
                resolve();
              } else {
                reject();
              }
            }
          };
          request.send(json);
        });
      } // end postData

      function clearInput() {
        for (let i = 0; i < input.length; i++) {
          input[i].value = "";
        }
      }

      postData(formData)
        .then(() => (statusMessage.innerHTML = message.loading))
        .then(() => (statusMessage.innerHTML = message.success))
        .catch(() => (statusMessage.innerHTML = message.failure))
        .then(clearInput());
    });
  }
  sendForm(form);
  sendForm(formBottom);
});
