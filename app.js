// *** variables *** //

const container = document.querySelector(".container");
const heading = document.querySelector(".heading");
const price = document.querySelector(".price");
const image = document.querySelector(".slide-img");
const btn = document.querySelector(".buy-btn");
const imgContainer = document.querySelector(".slider-box");
let counter = 0;

const imgProperties = [
  {
    name: "AirPods",
    price: "199$",
    src: "./img/airpods.png",
    color: "rgba(1, 109, 55, 0.4)",
  },
  {
    name: "Beats",
    price: "159$",
    src: "./img/beats.png",
    color: "rgba(51, 29, 1, 0.4)",
  },
  {
    name: "Watch",
    price: "299$",
    src: "./img/watch.png",
    color: "rgba(70, 10, 50, 0.4)",
  },
];

// *** events *** //

// --- mouse --- //

window.addEventListener("scroll", (e) => {
  e.preventDefault();
});

image.addEventListener("dragstart", (e) => {
  e.preventDefault();
});

image.addEventListener("mousedown", () => {
  image.style.cursor = "grabbing";
  image.style.transform = `scale(0.9)`;
  container.addEventListener("mousemove", moveSlide);
  image.addEventListener("mouseup", removeSlide);
  container.addEventListener("mouseup", removeSlide);
  container.addEventListener("mouseleave", removeSlide);
});

// --- touch --- //

image.addEventListener("touchstart", () => {
  image.style.transform = `scale(0.9)`;
  container.addEventListener("touchmove", touchSlide);
  image.addEventListener("touchend", removeSlide);
  container.addEventListener("touchend", removeSlide);
  container.addEventListener("touchcancel", removeSlide);
});

// --- keyboard --- //

document.addEventListener("keydown", (e) => {
  let target = e.key;
  if (target === "ArrowLeft" || target === "ArrowRight") {
    anime({
      targets: image,
      duration: 600,
      opacity: [0, 1],
      translateY: [50, 0],
      easing: "easeOutQuint",
    });
    updateSlide();
  }
});

// *** functions *** //

// --- mouse and keyboard--- //

function moveSlide(e) {
  let target = e.pageX;
  let slideTrack = target - (window.innerWidth - target);
  image.style.transform = `translateX(${slideTrack}px)`;
  if (slideTrack > 300 || slideTrack < -300) {
    updateSlide();
    removeSlide();
  }
}

function removeSlide() {
  container.removeEventListener("mousemove", moveSlide);
  container.removeEventListener("touchmove", touchSlide);
  image.style.transform = `translateX(0)`;
  image.style.cursor = "grab";
  image.style.transform = `scale(1)`;
}

function updateSlide() {
  counter++;
  if (counter === imgProperties.length) {
    counter = 0;
  }
  anime({
    targets: [heading, price],
    duration: 600,
    opacity: [0, 1],
    translateY: [-100, 0],
    easing: "easeOutQuint",
  });
  anime({
    targets: image,
    duration: 400,
    opacity: [0, 1],
    easing: "easeOutQuint",
  });
  heading.textContent = imgProperties[counter].name;
  price.textContent = imgProperties[counter].price;
  image.src = imgProperties[counter].src;
  document.body.style.backgroundColor = imgProperties[counter].color;
}

// --- touch --- //

function touchSlide(e) {
  let target = e.touches[0].pageX;
  let slideTrack = target - (window.innerWidth - target);
  image.style.transform = `translateX(${slideTrack}px)`;
  if (slideTrack > 200 || slideTrack < -200) {
    updateSlide();
    removeSlide();
  }
}
