import * as cocoSsd from '@tensorflow-models/coco-ssd';

import testURL from './assets/01.jpeg';
const image = document.getElementById('image');
image.src = testURL;
let modelPromise;
const canvas = document.querySelector('#canvas');
const context = canvas.getContext('2d');
let dWidth;
let dHeight;


window.onload = () => {
  modelPromise = cocoSsd.load();
  dWidth = image.getBoundingClientRect().width;
  dHeight = image.getBoundingClientRect().height;
  canvas.setAttribute('width', dWidth);
  canvas.setAttribute('height', dHeight);
  dWidth = image.getBoundingClientRect().width;
  dHeight = image.getBoundingClientRect().height;
};

const uploadBtn = document.getElementById('uploadBtn');
uploadBtn.onchange = (e) => {
  readFile(e.srcElement.files[0]);
};
function readFile(file) {
  const reader = new FileReader();
  const fileType = file.type;
  // 按 base64 的方式读取
  // reader.readAsDataURL(file);
  // 以原始二进制方式读取，读取结果可直接转成整数数组
  // reader.readAsArrayBuffer(file);
  reader.readAsDataURL(file);
  reader.onload = function(evt) {
    if (/^image\/[jpeg|png|gif]/.test(fileType)) {
      image.src = evt.target.result;
    }
  };
}

const runButton = document.getElementById('run');
runButton.onclick = async () => {
  const model = await modelPromise;
  console.log('model loaded');
  console.time('predict1');
  const result = await model.detect(image);
  console.timeEnd('predict1');


  context.drawImage(image, 0, 0, dWidth, dHeight);
  context.font = '10px Arial';

  console.log('number of detections: ', result.length);
  for (let i = 0; i < result.length; i++) {
    context.beginPath();
    context.rect(...result[i].bbox);
    context.lineWidth = 1;
    context.strokeStyle = 'green';
    context.fillStyle = 'green';
    context.stroke();
    context.fillStyle = 'black';
    context.fillRect(
      result[i].bbox[0],
      result[i].bbox[1] - 20,
      result[i].bbox[2],
      20,
    );
    context.fillStyle = 'white';
    context.fillText(
      result[i].score.toFixed(3) + ' ' + result[i].class, result[i].bbox[0],
      result[i].bbox[1] > 10 ? result[i].bbox[1] - 5 : 10,
    );
  }
};
