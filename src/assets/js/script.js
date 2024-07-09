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