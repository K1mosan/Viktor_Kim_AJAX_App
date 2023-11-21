(() => {

  //Variables
  const model = document.querySelector("#model");
  const hotspots = document.querySelectorAll(".Hotspot");
  const materialsCon = document.querySelector("#materials-con");
  const loading = document.querySelector("#loading");

  let spinner = `<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><style>.spinner_7uc5{animation:spinner_3l8F .9s linear infinite;animation-delay:-.9s}.spinner_RibN{animation-delay:-.7s}.spinner_ZAxd{animation-delay:-.5s}@keyframes spinner_3l8F{0%,66.66%{animation-timing-function:cubic-bezier(0.14,.73,.34,1);y:6px;height:12px}33.33%{animation-timing-function:cubic-bezier(0.65,.26,.82,.45);y:1px;height:22px}}</style><rect class="spinner_7uc5 spinner_ZAxd" x="1" y="6" width="2.8" height="12"/><rect class="spinner_7uc5 spinner_RibN" x="5.8" y="6" width="2.8" height="12"/><rect class="spinner_7uc5" x="10.6" y="6" width="2.8" height="12"/><rect class="spinner_7uc5 spinner_RibN" x="15.4" y="6" width="2.8" height="12"/><rect class="spinner_7uc5 spinner_ZAxd" x="20.2" y="6" width="2.8" height="12"/></svg>`;

  
  //Links:
  //this is the api url https://swiftpixel.com/earbud/api/infoboxes"
  //this is the api url https://swiftpixel.com/earbud/api/materials"


  //Functions
  function modelLoaded() {
    hotspots.forEach(hotspot => {
      hotspot.style.display = "block";
    });
  }


  function loadInfoBoxes() {
    function getData() {
    fetch("https://swiftpixel.com/earbud/api/infoboxes")
    .then(response => response.json())
    .then(info => {
      console.log(info);

      info.forEach((infoBox, index) => {
      let info = document.querySelector(`#hotspot-${index+1}`);
      
      const titleElement = document.createElement('h2');
      titleElement.textContent = infoBox.heading;

      const textElement = document.createElement('p');
      textElement.textContent = infoBox.description;

      const imgElement = document.createElement('img');
      imgElement.src = `images/${infoBox.thumbnail}`;

      info.appendChild(titleElement);
      info.appendChild(textElement);
      info.appendChild(imgElement);
    });
    })

    // .catch(error => console.error(error));
    .catch(error => {
      console.error("Error loading info boxes:", error);
      alert("Something is wrong. Try again in a bit.")
    })
    }
    getData();
  }
  loadInfoBoxes();

  // loading.innerHTML = spinner


  function getData() {
    materialsCon.innerHTML = spinner;
    fetch("https://randomuser.me/api/?results=20")
    // repsonse is packages so we have to unppack 
    //takes stringified JSON and converst back to a JS object
    .then(response => response.json()) //unpack the API response (tunr it back to a plain JS object)
    .then(materials => {
      console.log(materials);
      //process data and write to the down

      let ul = document.createElement("ul");
      ul.id = "materials-list";
      
      materials.results.forEach(result => {
      
        var li = document.createElement("li");

        var img = document.createElement("img");
        img.src = result.picture.thumbnail;

        var h2 = document.createElement("h3");
        h2.textContent = `${result.name.first} ${result.name.last}`;

        var p = document.createElement("p");
        p.textContent = result.email;

        li.appendChild(img);
        li.appendChild(h2);
        li.appendChild(p);
        // ul.appendChild(li);
    });

    // Get the container element and clear its content
    materialsCon.innerHTML = "";
    materialsCon.appendChild(ul);   

    })
    .catch(error => console.error(error)); 
  }
  getData();


  function loadMateraialsBox(){
    function getData() {
    fetch("https://swiftpixel.com/earbud/api/materials")
    .then(respone => respone.json())
    .then(materials => {
      console.log(materials);

      let ul = document.createElement("ul")

      materials.forEach((materialsBox)=> {
        const li = document.createElement("li");

        const h3 = document.createElement("h3");
        h3.textContent = materialsBox.heading;
        
        const p = document.createElement("p");
        p.textContent = materialsBox.description;

        li.appendChild(h3);
        li.appendChild(p);
        ul.appendChild(li);
        materialsCon.appendChild(ul);
      });
    })

    // .catch(error => console.error(error));
    .catch(error => {
      console.error("Error loading info boxes:", error);
      alert("Something is wrong. Try again in a bit.")
    })
    }
    getData();
  }
  loadMateraialsBox();
  

  function showInfo() {
    let selected = document.querySelector(`#${this.slot}`);
    gsap.to(selected, 1, { autoAlpha: 1 });
  }


  function hideInfo() {
    let selected = document.querySelector(`#${this.slot}`);
    gsap.to(selected, 1, { autoAlpha: 0 });
  }


  //Event Listeners
  model.addEventListener("load", modelLoaded);

  hotspots.forEach(function (hotspot) {
    hotspot.addEventListener("mouseenter", showInfo);
    hotspot.addEventListener("mouseleave", hideInfo);
  });

})();

