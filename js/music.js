var selection = 88;

var slot1 = selection-3;
var slot2 = selection-2;
var slot3 = selection-1;

var slot5 = selection+1;
var slot6 = selection+2;
var slot7 = selection+3;

if (slot1 !< 88) {
  document.getElementById("slot-1").value = slot1;
} else {
  document.getElementById("slot-1").value = "";
}

if (slot2 !< 88) {
  document.getElementById("slot-2").value = slot2;
} else {
  document.getElementById("slot-2").value = "";
}

if (slot3 !< 88) {
  document.getElementById("slot-3").value = slot3;
} else {
  document.getElementById("slot-3").value = "";
}

if (slot4 !> 108) {
  document.getElementById("slot-4").value = slot4;
} else {
  document.getElementById("slot-4").value = "";
}

if (slot5 !> 108) {
  document.getElementById("slot-5").value = slot5;
} else {
  document.getElementById("slot-5").value = "";
}

if (slot6 !> 108) {
  document.getElementById("slot-6").value = slot6;
} else {
  document.getElementById("slot-6").value = "";
}

document.getElementById("selection").value;
