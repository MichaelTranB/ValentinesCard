document.addEventListener('DOMContentLoaded', function () {
  // SVG Heart Animation
  var paper = d3.select("#canvas");
  var wsvg = $("#canvas").width();
  var hsvg = $("#canvas").height();

  var d = Math.ceil((Math.floor(Math.random() * 700) + 100) / 10) * 10;
  var count = 0;

  function rNumTime() {
    d = Math.ceil((Math.floor(Math.random() * 600) + 100) / 10) * 10;
  }

  setInterval(function () {
    count++;
    var x = Math.floor(Math.random() * (wsvg - 100)) + 50;
    var y = Math.floor(Math.random() * (hsvg - 100)) + 50;
    var b = paper.append("use").attr("xlink:href", "#heart").attr("id", "h" + count).attr("transform", "translate(" + x + ", " + y + ")");
    setTimeLine();
    rNumTime();
  }, d);

  function setTimeLine() {
    var s = (Math.random() * (0.7 - 0.2) + 0.5).toFixed(1);
    var heart = $("#h" + count);

    var tl = gsap.timeline({ repeat: 1, yoyo: true });

    tl.from(heart, 0.7, { scale: 0, transformOrigin: "50% 50%" })
      .to(heart, 0.7, { scale: s, transformOrigin: "50% 50%" })
      .to(heart, 0.3, { scale: 1, transformOrigin: "50% 50%", opacity: 0, onComplete: remove, onCompleteParams: [heart] });
  }

  function remove(h) {
    h.remove();
  }

  $(window).on("resize", function () {
    wsvg = $("#canvas").width();
    hsvg = $("#canvas").height();
  });

  const container = document.querySelector(".container");
  const yesbtn = document.querySelector(".yes-btn");
  const nobtn = document.querySelector(".no-btn");
  const envelope = document.querySelector(".envelope");

  function getRandomNumber(min, max) {
    return Math.random() * (max - min) + min;
  }

  function moveButtonWithinViewport() {
    const containerHeight = container.getBoundingClientRect().height;
    const containerWidth = container.getBoundingClientRect().width;

    const btnHeight = nobtn.getBoundingClientRect().height;
    const btnWidth = nobtn.getBoundingClientRect().width;

    const newTop = getRandomNumber(0, containerHeight - btnHeight);
    const newLeft = getRandomNumber(0, containerWidth - btnWidth);

    nobtn.style.position = 'absolute'; 
    nobtn.style.top = `${newTop}px`;
    nobtn.style.left = `${newLeft}px`;
}


  yesbtn.addEventListener("click", () => {
    envelope.style.display = "block";
  });

  nobtn.addEventListener('mouseover', moveButtonWithinViewport);
  nobtn.addEventListener('click', moveButtonWithinViewport);
  nobtn.addEventListener('touchstart', moveButtonWithinViewport);

  document.body.style.overflow = 'hidden';

});
