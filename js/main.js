$('body').on('click', '#playbutton', function(e) {
  e.preventDefault();
  if ($(this).hasClass('play')) {
    $(this).removeClass('play');
    $(this).addClass('pause');
  } else {
    $(this).removeClass('pause');
    $(this).addClass('play');
  }
});

var myAudio = document.getElementById("audio");

function togglePlay() {
  return myAudio.paused ? myAudio.play() : myAudio.pause();
};

var socket = io('http://localhost:' + window.location.port);

var audio = document.getElementById('audioSource');

console.log("hoi");
socket.on('start', function(data) {
  console.log("start");
  console.log(data);
  // socket.emit('my other event', { my: 'data' });
  socket.emit('stream', {
    my: 'data'
  });
  console.log("");
  ss(socket).on('audio-stream', function(stream, data) {
    parts = [];
    console.log("DATA -->> ")
    stream.on('data', (chunk) => {
      console.log(chunk);
      parts.push(chunk);
    });
    stream.on('end', function() {
      var audio = document.getElementById('audio');
      audio.src = (window.URL || window.webkitURL).createObjectURL(new Blob(parts));

      var context = new AudioContext();
      var src = context.createMediaElementSource(audio);
      var analyser = context.createAnalyser();

      var canvas = document.getElementById("canvas");
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      var ctx = canvas.getContext("2d");

      src.connect(analyser);
      analyser.connect(context.destination);

      analyser.fftSize = 256;

      var bufferLength = analyser.frequencyBinCount;
      console.log(bufferLength);

      var dataArray = new Uint8Array(bufferLength);

      var WIDTH = canvas.width;
      var HEIGHT = canvas.height;

      var barWidth = (WIDTH / bufferLength) * 2.5;
      var barHeight;
      var x = 0;

      function renderFrame() {
        requestAnimationFrame(renderFrame);

        x = 0;

        analyser.getByteFrequencyData(dataArray);

        ctx.fillStyle = "#FFF";
        ctx.fillRect(0, 0, WIDTH, HEIGHT);

        for (var i = 0; i < bufferLength; i++) {
          barHeight = dataArray[i];

          var r = barHeight + (25 * (i/bufferLength));
          var g = 250 * (i/bufferLength);
          var b = 50;

          ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
          ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);

          x += barWidth + 1;
        }
      }

      audio.play();
      renderFrame();

      audio.play();
    });
  });
});
