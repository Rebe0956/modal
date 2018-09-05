  let urlParams = new URLSearchParams(window.location.search);
  let id = urlParams.get("id");
  console.log(id);

  let dest = document.querySelector(".container"),
      retter,
      madFilter = "alle";
  document.addEventListener("DOMContentLoaded", hentJson);

  async function hentJson() {
      let jsonData = await fetch("json/menu.json");
      retter = await jsonData.json();

      console.log(retter);

      visRetter();
  }
  document.querySelectorAll(".menu-item").forEach(knap => {
      knap.addEventListener("click", filtrering)
  });

  function filtrering() {
      dest.textContent = "";
      madFilter = this.getAttribute("data-mad");
      console.log(madFilter);
      visRetter();
  }


  function visRetter() {
      let temp = document.querySelector(".retter-template");
      let modtager = document.querySelector(".container");

      retter.forEach(ret => {
          if (ret.kategori == madFilter || madFilter == "alle") {
              let klon = temp.cloneNode(true).content;
              document.querySelector("header h1").textContent = madFilter;

              klon.querySelector(".data-navn").textContent = ret.navn;
              klon.querySelector(".data-billede").src = "imgs/small/" + ret.billede + "-sm.jpg";
              klon.querySelector(".data-billede").alt = "billede" + ret.navn;
              klon.querySelector(".data-kortbeskrivelse").textContent = ret.kortbeskrivelse;
              klon.querySelector(".data-pris").textContent = ret.pris;
              modtager.appendChild(klon);
          }
      })
  }
