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
  const canvas = document.getElementById('my-custom-canvas');
  const jsConfetti = new JSConfetti({ canvas });

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

  nobtn.addEventListener('mouseover', moveButtonWithinViewport);
  nobtn.addEventListener('click', moveButtonWithinViewport);
  nobtn.addEventListener('touchstart', moveButtonWithinViewport);

  yesbtn.addEventListener("click", () => {

    jsConfetti.addConfetti({
      emojis: ['❤️', '💝', '🤍', '✨', '💫', '🌸'],
    });

    let heart = document.createElement("div");
    heart.id = "full-screen-heart";
    document.body.appendChild(heart);
  
    
    gsap.set("#full-screen-heart", {
      position: "fixed", 
      top: "0",
      left: "0",
      width: "100%",
      height: "100%",
      backgroundColor: "#ff79a7", 
      x: "0%",
      y: "0%",
      borderRadius: "0%", 
      opacity: 0,
      zIndex: 3000 
    });
  
    gsap.to("#full-screen-heart", {
      duration: 1, 
      opacity: 1,
      ease: "power2.inOut", 
      onComplete: displayNewMessage
    });
  });
  
  function displayNewMessage() {
    jsConfetti.addConfetti({
      emojis: ['❤️', '💝', '🤍', '✨', '💫', '🌸'],
    });
  
    let messageContainer = document.createElement("div");
    messageContainer.id = "valentine-message-container";
    document.body.appendChild(messageContainer);
  
    messageContainer.style.zIndex = '3100';
    
    gsap.set("#valentine-message-container", {
      position: "fixed",
      top: "50%",
      left: "50%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      opacity: 0,
      zIndex: 3100,
    });
  
    let image = document.createElement("img");
    image.src = "https://i.pinimg.com/originals/78/74/a2/7874a21dd174069b875077d89b8e4c2d.gif";
    image.style.width = "300px"; 
    image.style.height = "auto";
    image.style.marginBottom = "20px"; 
  
    let message = document.createElement("div");
    message.innerHTML = "Yay! You're my Valentine now! ❤️";
    message.style.fontSize = "2em";
    message.style.color = "#FFFFFF";
    message.style.textAlign = "center";
  
    messageContainer.appendChild(image);
    messageContainer.appendChild(message);
  
    gsap.to("#valentine-message-container", {
      duration: 1,
      opacity: 1,
    });

    let btnContainer = document.createElement("div");
  btnContainer.style = "margin-top: 40px; width: 100%; display: flex; justify-content: center;";

  let throwConfettiBtn = document.createElement("button");
  throwConfettiBtn.textContent = "RAHHHH!";
  throwConfettiBtn.style = "padding: 10px 20px; font-size: 1em; cursor: pointer; background-color: pink; border: none; border-radius: 5px;";

  btnContainer.appendChild(throwConfettiBtn);
  messageContainer.appendChild(btnContainer);

  throwConfettiBtn.addEventListener('click', function() {
    jsConfetti.addConfetti({
      emojis: ['❤️', '💝', '🤍', '✨', '💫', '🌸'],
    });
  });
  
  throwConfettiBtn.addEventListener('mouseenter', function() {
    this.style.backgroundColor = '#fb3d7f'; // Lighter pink for hover
    this.style.color = 'white'; // Change text color on hover
    this.style.transform = 'scale(1.05)'; // Slightly increase button size
    this.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)'; // Enhance shadow
  });
  
  throwConfettiBtn.addEventListener('mouseleave', function() {
    this.style.backgroundColor = 'pink'; // Original color
    this.style.color = 'initial'; // Original text color
    this.style.transform = 'scale(1)'; // Original size
    this.style.boxShadow = 'initial'; // Original shadow
  });
  
}
   
});
