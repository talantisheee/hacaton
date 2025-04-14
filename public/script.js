const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const snap = document.getElementById('snap');
const context = canvas.getContext('2d');

// Запрос разрешения на доступ к камере
navigator.mediaDevices.getUserMedia({ video: true })
  .then(stream => {
    video.srcObject = stream;
  });

snap.addEventListener('click', () => {
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  context.drawImage(video, 0, 0);

  canvas.toBlob(blob => {
    const formData = new FormData();
    formData.append('photo', blob, 'photo.jpg');

    fetch('/send-photo', {
      method: 'POST',
      body: formData
    }).then(() => alert('Фото отправлено!'));
  }, 'image/jpeg');
});
