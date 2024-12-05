(() => {

  //variables
  const model = document.querySelector("#model");
  const hotspots = document.querySelectorAll(".Hotspot");

  const container = document.querySelector("#container");
  
  const materialTemplate = document.querySelector("#material-template");
  const materialList = document.querySelector("#material-list");

 
  const errormsg = `<svg height="32" style="overflow:visible;enable-background:new 0 0 32 32" viewBox="0 0 32 32" width="32" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g><g id="Error_1_"><g id="Error"><circle cx="16" cy="16" id="BG" r="16" style="fill:#D72828;"/><path d="M14.5,25h3v-3h-3V25z M14.5,6v13h3V6H14.5z" id="Exclamatory_x5F_Sign" style="fill:#E6E6E6;"/></g></g></g></svg>`
 
  const spinner = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; background: ; display: block; shape-rendering: auto;" width="200px" height="200px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
<g>
  <path d="M50 15A35 35 0 1 0 74.74873734152916 25.251262658470843" fill="none" stroke="#adbcbf" stroke-width="12"></path>
  <path d="M49 3L49 27L61 15L49 3" fill="#adbcbf"></path>
  <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;360 50 50" keyTimes="0;1"></animateTransform>
</g>
<!-- [ldio] generated by https://loading.io/ --></svg>`;
  
  
  function modelLoaded() {
    hotspots.forEach(hotspot => {
      hotspot.style.display = "block";
    });
  }

  function loadInfoBoxes() {
    head.innerHTML = spinner;
 
    fetch("https://swiftpixel.com/earbud/api/infoboxes")
    .then(response => response.json())
    .then(infoBoxes => {
      console.log(infoBoxes);

      infoBoxes.forEach((infoBox, index) => {
        let selected = document.querySelector(`#hotspot-${index+1}`);
        
        const titleElement = document.createElement('h3');
        titleElement.textContent = infoBox.heading;

        const imgElement = document.createElement('img');
        imgElement.src = `images/${infoBox.thumbnail}`;
        
        const textElement = document.createElement('p');
        textElement.textContent = infoBox.description;
        
        selected.appendChild(imgElement);
        selected.appendChild(titleElement);
        selected.appendChild(textElement);
        
        head.innerHTML = "";
      });
    })
    .catch(error => {
      container.innerHTML = errormsg;
      console.error('Oops, an error occurred while loading resources. Please check your internet connection. ', error);
    });
  }
  
  loadInfoBoxes();

  function loadMaterialInfo() { 
    // Static material information
    const materials = [
      {
        heading: "Noise-cancelling microphone",
        description: "Noise-cancelling microphones and a rear copper shield are optimally placed to quickly detect outside noises, working together to counter noise before it disturbs your experience."
      },
      {
        heading: "Comfortable fit",
        description: "Three pairs of ultra comfortable silicone tips are included. The tips create an acoustic seal that blocks outside audio and secures the earbuds in place."
      },
      {
        heading: "360 AUDIO",
        description: "360 Audio places sound all around you, while Dolby Head Tracking™ technology delivers an incredible three-dimensional listening experience."
      },
      {
        heading: "Ultra Fast Charging",
        description: "Charge your earbuds in 30 minutes or less with our hyper charging technology."
      }
    ];

    materials.forEach(material => {
      const clone = materialTemplate.content.cloneNode(true);
      const materialHeading = clone.querySelector(".material-heading");
      materialHeading.textContent = material.heading;
      const materialDescription = clone.querySelector(".material-description");
      materialDescription.textContent = material.description;

      materialList.appendChild(clone);
    });
  }
    
  loadMaterialInfo();

  function showInfo() {
    let selected = document.querySelector(`#${this.slot}`);
    gsap.to(selected, 1, { autoAlpha: 1 });
  }

  function hideInfo() {
    let selected = document.querySelector(`#${this.slot}`);
    gsap.to(selected, 1, { autoAlpha: 0 });
  }

  //Event listeners
  model.addEventListener("load", modelLoaded);

  hotspots.forEach(function (hotspot) {
    hotspot.addEventListener("mouseenter", showInfo);
    hotspot.addEventListener("mouseleave", hideInfo);
  });
})();