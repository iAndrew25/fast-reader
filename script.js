document.getElementById('speed').addEventListener('input', setSpeed);
document.getElementById('source').addEventListener('input', setText);
document.getElementById('start').addEventListener('click', start);
document.getElementById('pause').addEventListener('click', pause);
document.getElementById('back').addEventListener('click', back);

document.getElementsByClassName('forward')[0].addEventListener('click', forward);
document.getElementsByClassName('backward')[0].addEventListener('click', backward);

const fistPage = document.getElementsByClassName('first')[0];
const secondPage = document.getElementsByClassName('second')[0];

function forward() {
	fistPage.classList.remove("displayed");
	secondPage.classList.add("displayed");
}

function backward() {
	fistPage.classList.add("displayed");
	secondPage.classList.remove("displayed");
}

const options = {
	text: '',
	parsedText: '',
	speed: 240,
	isPaused: true,
	index: 0,
	lastDisplayed: 0
};

function setText({target}) {
	options.text = target.value;
}

function setSpeed({target}) {
	options.speed = parseInt(target.value);
	document.getElementById('speed-value').innerHTML = options.speed;
}

function setWord(word) {
	document.getElementById('word').innerHTML = word;
}

function start() {
	if(options.isPaused) {
		options.isPaused = false;
		options.parsedText = options.text.split(' ');

		run();
	}
}

function pause() {
	options.isPaused = true;
}

function back() {
	options.isPaused = true;
	options.index = 0;

	setWord(options.parsedText[options.index]);
}

function run() {
	if(!options.isPaused) {
		const {parsedText, index, lastDisplayed, speed} = options;
		const wordsPerSecond = 1000 / (speed / 60);
		const timestamp = Date.now();
		
		if(parsedText[index] !== undefined && timestamp >= lastDisplayed + wordsPerSecond) {
			setWord(parsedText[index]);

			options.index++;
			options.lastDisplayed = timestamp;
		}

		requestAnimationFrame(run);
	}
}