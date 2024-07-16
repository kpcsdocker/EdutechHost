/*rightmenu-script*/
function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}
/*rightmenu-script*/

/*chat-script*/
function openForm() {
  document.getElementById("myForm").style.display = "block";
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
}
/*chat-script*/


/*left-slide-script*/
    function toggleLeftContainer() {
    var leftContainer = document.getElementById("leftContainer");
    var rightContainer = document.getElementById("rightContainer");
    leftContainer.classList.toggle('open');
    rightContainer.classList.toggle('slide');
}

function closeRightContainer() {
    var leftContainer = document.getElementById("leftContainer");
    var rightContainer = document.getElementById("rightContainer");
    leftContainer.classList.remove('open');
    rightContainer.classList.remove('slide');
}
/*left-slide-script*/

/*popup-slide-script*/
     function togglepopupContainer(){
    var popupContainer = document.getElementById("popupContainer");
    var rightContainer = document.getElementById("rightContainer");
    popupContainer.classList.toggle('open');
    rightContainer.classList.remove('slide');
}
/*popup-slide-script*/

/*arrow-slide-script*/
    function togglecenterContainer() {
    var centerContainer = document.getElementById("centerContainer");
    var rightContainer = document.getElementById("rightContainer");
    centerContainer.classList.toggle('open');
    rightContainer.classList.toggle('slide');
}

function closeRightContainer() {
    var centerContainer = document.getElementById("centerContainer");
    var rightContainer = document.getElementById("rightContainer");
    centerContainer.classList.remove('open');
    rightContainer.classList.remove('slide');
}
/*arrow-slide-script*/

/*script-Chat-typewriter-effect*/
const animateTextTyping = (node) => {
  const text = node.textContent;
  const chars = text.split("");

  node.innerHTML = "";
  node.classList.add("typing");
  i = 0;

  const addNextChar = (i) => {
    let nextChar = chars[i] === "\n" ? "<br>" : chars[i];
    node.innerHTML += "<span>" + nextChar + "</span>";
    if (i < chars.length - 1) {
      setTimeout(function () {
        addNextChar(i + 1);
      }, 20 + Math.random() * 100);
    } else {
      setTimeout(function () {
        node.classList.remove("typing");
      }, 20 + Math.random() * 150);
    }
  }

  addNextChar(i);
}

window.onload = () => {
  animateTextTyping(document.getElementById("bot-response"));
}
/*script-Chat-typewriter-effect*/