
const selectSingle = document.querySelectorAll('.__select');



for (let i = 0; i < selectSingle.length; i++) {
  const selectSingle_title = selectSingle[i].querySelector('.__select__title');
  const selectSingle_labels = selectSingle[i].querySelectorAll('.__select__label');

  selectSingle_title.addEventListener('click', (e) => {

    for (let x = 0; x < selectSingle.length; x++) {
      selectSingle[x].setAttribute('data-state', '');
    }

    if ('active' === selectSingle[i].getAttribute('data-state')) {
      selectSingle[i].setAttribute('data-state', '');
    } else {
      selectSingle[i].setAttribute('data-state', 'active');
    }
  });

  // Close when click to option
  for (let x = 0; x < selectSingle_labels.length; x++) {
    selectSingle_labels[x].addEventListener('click', (evt) => {
      selectSingle_title.textContent = evt.target.textContent;
      let img = evt.target.querySelector("img");
      if (img) {
        let x = document.createElement("IMG");
        x.src = img.src;
        selectSingle_title.prepend(x);
      }
      selectSingle[i].setAttribute('data-state', '');
    });
  }
}

window.addEventListener('click', e => {
  const target = e.target
  const targetEl = target.closest('.__select');
  if (!targetEl) {

    for (let i = 0; i < selectSingle.length; i++) {
      if ('active' === selectSingle[i].getAttribute('data-state')) {
        selectSingle[i].setAttribute('data-state', '');
      }

    }
  }
})





/* проверка поддержки API */
if (window.File && window.FileList && window.FileReader) {
  Init();
}

var count = 0;

function FileSelectHandler(e) {

  FileDragHover(e);

  // проходимся по объекту FileList 
  var files = e.target.files || e.dataTransfer.files;



  // парсим все объекты типа File
  for (var i = 0, f; f = files[i]; i++) {

    if (f.type == "image/jpeg" || f.type == "image/png") {
      count++;
      if (count > 3) {
        document.querySelector(".fileload__messages").innerText = "Допускается загузка не более трех изображений"
        return false;
      }
      console.log(count);
      document.querySelector(".fileload__messages").innerText = ""
      ParseFile(f);
    }
    else {
      document.querySelector(".fileload__messages").innerText = "Допускается загрука только изображений"
      return false
    }

  }

}

function ParseFile(file) {

  var fr = new FileReader();

  fr.addEventListener("load", function () {
    let span_img = document.createElement('span');
    span_img.style.backgroundImage = "url(" + fr.result + ")";
    span_img.classList.add("fileload__img");
    document.querySelector(".fileload__array-img").appendChild(span_img);

  }, false);

  fr.readAsDataURL(file);


}


function FileDragHover(e) {
  e.stopPropagation();
  e.preventDefault();
  e.target.className = (e.type == "dragover" ? "hover" : "");
}

/* инициализация */
function Init() {

  var fileselect = document.getElementById("fileload__select"),
    filedrag = document.getElementById("fileload__drag");

  if (!fileselect) return false;

  /* выбор файла */
  fileselect.addEventListener("change", FileSelectHandler, false);

  /* проверка поддержки XHR2 */
  var xhr = new XMLHttpRequest();
  if (xhr.upload) {

    /* сброс файла */
    filedrag.addEventListener("dragover", FileDragHover, false);
    filedrag.addEventListener("dragleave", FileDragHover, false);
    filedrag.addEventListener("drop", FileSelectHandler, false);
    filedrag.style.display = "block";

  }

}





function tabs() {
  let tabs_li = document.querySelectorAll(".tabs__list > li");
  let tabs_content = document.querySelectorAll(".tabs__content");

  tabs_li.forEach((li, index) => {
    li.addEventListener("click", function () {
      tabs_li.forEach(item => {
        if (item.classList.contains("active")) item.classList.remove("active");
      })
      tabs_content.forEach(item => {
        if (item.classList.contains("active")) item.classList.remove("active");
      })
      this.classList.add("active");
      tabs_content[index].classList.add("active")
    })
  });

}

tabs()


function listGrid() {
  let view__btn = document.querySelectorAll(".view-btn");
  let catalog__items = document.querySelector(".catalog-items")

  view__btn.forEach(item => {
    item.addEventListener("click", function () {
      if (item.classList.contains("fillter-mobile__list")) {
        catalog__items.classList.add("list");
      }
      else {
        if (catalog__items.classList.contains("list")) catalog__items.classList.remove("list");
      }
      view__btn.forEach(el => {
        if (el.classList.contains("active")) el.classList.remove("active")
      })
      item.classList.add("active");
    })
  })



}

listGrid();


function mobileModal() {
  let modal_trigger = document.querySelectorAll(".modal_trigger");
  let modal = document.querySelectorAll(".mobile-popup")

  modal_trigger.forEach(element => {
    element.addEventListener("click", function () {
      element.classList.toggle("active");
      document.body.classList.toggle("hidden");
      let trigger_data = element.getAttribute("data-pop");

      modal.forEach(item => {
        let close = item.querySelector(".mobile-popup__close");
        let modal_data = item.getAttribute("data-pop");
        if (trigger_data == modal_data) {
          item.classList.toggle("active")
        }
        close.addEventListener("click", function () {
          if (item.classList.contains("active")) item.classList.remove("active");
          if (element.classList.contains("active")) element.classList.remove("active");
          if (document.body.classList.contains("hidden")) document.body.classList.remove("hidden");
        })
      });
    })



  });
}

mobileModal()





