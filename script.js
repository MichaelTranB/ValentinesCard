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
  const music = document.getElementById('background-music');

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

  
  //Yes Button Click
  yesbtn.addEventListener("click", () => {
    music.play().then(() => {
      console.log("Audio started playing");
    }).catch(error => {
      console.error("Error playing audio:", error);
    });
    

    jsConfetti.addConfetti({
      emojis: ['❤️', '💝', '🤍', '✨', '💫', '🌸'],
    }).then(() => jsConfetti.addConfetti());

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

  // Function to redirect to special message page
  function redirectToSpecialPage() {
      window.location.href = './sri.html'; 
  }
  

  //Displaying Message
  function displayNewMessage() {
    jsConfetti.addConfetti({
      emojis: ['❤️', '💝', '🤍', '✨', '💫', '🌸'],
    }).then(() => jsConfetti.addConfetti());

    music.controls = true;
  
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
  
    //Image and Message Code
    let image = document.createElement("img");
    image.src = "https://i.pinimg.com/originals/78/74/a2/7874a21dd174069b875077d89b8e4c2d.gif";
    image.style.width = "300px"; 
    image.style.height = "auto";
    image.style.marginBottom = "20px"; 
    image.style.marginTop = "70px"; 
  
    let message = document.createElement("div");
    message.innerHTML = "Happy Valentine's Day Baby Gorl!<br>I Love You ❤️";
    message.style.fontSize = "2em";
    message.style.color = "#FFFFFF";
    message.style.textAlign = "center";
  
    messageContainer.appendChild(image);
    messageContainer.appendChild(message);
  
    gsap.to("#valentine-message-container", {
      duration: 1,
      opacity: 1,
    });

    //RAAHHH Button
    let btnContainer = document.createElement("div");
    btnContainer.style = "margin-top: 40px; width: 100%; display: flex; justify-content: center; flex-direction: column; align-items: center;"; 

    let throwConfettiBtn = document.createElement("button");
    throwConfettiBtn.textContent = "RAAHHH";
    throwConfettiBtn.style.padding = "20px 30px";
    throwConfettiBtn.style.fontSize = "1.2em";
    throwConfettiBtn.style.cursor = "pointer";
    throwConfettiBtn.style.backgroundColor = "#FF1493"; 
    throwConfettiBtn.style.color = "#FFFFFF";
    throwConfettiBtn.style.border = "3px solid #FF69B4";
    throwConfettiBtn.style.borderRadius = "15px";
    throwConfettiBtn.style.boxShadow = "0 5px 15px rgba(255, 105, 180, 0.4)";
    throwConfettiBtn.style.transition = "transform 0.2s, box-shadow 0.2s, background-color 0.2s";
    throwConfettiBtn.style.fontWeight = "bold";
    throwConfettiBtn.style.letterSpacing = "1px";
    throwConfettiBtn.style.position = "relative";
    throwConfettiBtn.style.marginBottom = "80px";

    // Hover effect
    throwConfettiBtn.onmouseover = function() {
        this.style.transform = "scale(1.05) translateY(-5px)";
        this.style.boxShadow = "0 10px 20px rgba(255, 105, 180, 0.6)";
    };
    
    // Click effect for press down
    throwConfettiBtn.onmousedown = function() {
        this.style.transform = "scale(0.95) translateY(5px)"; 
        this.style.backgroundColor = "#FF69B4"; 
    };
    
    // Mouseup and transitionend effect for popping back up
    throwConfettiBtn.onmouseup = function() {
        this.style.transform = "scale(1.05) translateY(-5px)";
        this.style.backgroundColor = "#FF1493"; 
    };
    
    throwConfettiBtn.onmouseleave = function() {
        this.style.transform = "scale(1) translateY(0)"; 
        this.style.boxShadow = "0 5px 15px rgba(255, 105, 180, 0.4)"; 
        this.style.backgroundColor = "#FF1493"; 
    };
    
    // Ensure the button pops back to its hover state after being pressed
    throwConfettiBtn.addEventListener('transitionend', function() {
        if (this.style.transform === "scale(0.95) translateY(5px)") {
            this.style.transform = "scale(1.05) translateY(-5px)";
        }
    });
    

    btnContainer.appendChild(throwConfettiBtn);
    messageContainer.appendChild(btnContainer);

    //Button Arrows 
    let leftArrow = document.createElement("span");
    leftArrow.innerHTML = "&#8594;"; 
    leftArrow.style.position = "absolute";
    leftArrow.style.left = "100px"; 
    leftArrow.style.top = "50%";
    leftArrow.style.transform = "translateY(-50%)"; 
    leftArrow.style.fontSize = "30px"; 
    leftArrow.style.color = "white"; 
    leftArrow.style.fontWeight = "bold"; 


    let rightArrow = document.createElement("span");
    rightArrow.innerHTML = "&#8592;"; 
    rightArrow.style.position = "absolute";
    rightArrow.style.right = "100px"; 
    rightArrow.style.top = "50%";
    rightArrow.style.transform = "translateY(-50%)"; 
    rightArrow.style.fontSize = "30px"; 
    rightArrow.style.color = "white"; 
    rightArrow.style.fontWeight = "bold"; 


    btnContainer.style.position = "relative"; 
    btnContainer.appendChild(leftArrow);
    btnContainer.appendChild(throwConfettiBtn); 
    btnContainer.appendChild(rightArrow);


    btnContainer.style.display = "flex";
    btnContainer.style.alignItems = "center";
    btnContainer.style.justifyContent = "center";


    // Special Message Button
    let specialContentButton = document.createElement("button");
    specialContentButton.innerText = "Special Message";
    specialContentButton.style.marginTop = "80px"; 
    specialContentButton.style.padding = "10px 15px"; 
    specialContentButton.style.fontSize = "1em"; 
    specialContentButton.style.cursor = "pointer";

    specialContentButton.addEventListener('click', function() {
      redirectToSpecialPage();
    });

    btnContainer.appendChild(specialContentButton); 
    messageContainer.appendChild(btnContainer);
    

    //Audio Controls
    let audioContainer = document.createElement("div");
    audioContainer.style.marginTop = "150px";
    audioContainer.appendChild(music); 

    messageContainer.appendChild(audioContainer); 
    

    //Event Listeners for RAHHH Button
    throwConfettiBtn.addEventListener('click', function() {
      jsConfetti.addConfetti({
        emojis: ['❤️', '💝', '🤍', '✨', '💫', '🌸'],
      }).then(() => jsConfetti.addConfetti());
    });

    function adjustArrowPositions() {
      const screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      if (screenWidth <= 768) { 
          leftArrow.style.left = "-15px"; 
          rightArrow.style.right = "-15px"; 
      } else {
          leftArrow.style.left = "100px"; 
          rightArrow.style.right = "100px"; 
      }
    }
  
    adjustArrowPositions();
    window.addEventListener('resize', adjustArrowPositions); 
      
  }
});
