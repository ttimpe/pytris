// music.js
 window.AudioContext = window.AudioContext || window.webkitAudioContext;

var ac = new AudioContext();
	var leadGain = ac.createGain();
	leadGain.gain.value = options.musicVolume;
	leadGain.connect(ac.destination);
	var fxGain = ac.createGain();
	fxGain.gain.value=options.fxVolume;
	fxGain.connect(ac.destination);
var musicTimer;
function playFreq(freq,type,startTime, length) {
	var osc = ac.createOscillator();
	osc.type = type;
	osc.frequency.value = freq;
	osc.connect(leadGain);

	console.log('scheduling at ' + ac.currentTime + startTime);
	osc.start(ac.currentTime + startTime);
	osc.stop(ac.currentTime + startTime + length);


}
var bpm = 120;
var notes = [
				[49, 0, 0.15],
				[47, 0.15, 0.15],
				[49, 0.3, 0.15],
				[49, 0.6, 0.15],
				[51, 0.9, 0.15],
				[52, 1.2, 0.3],
				[51, 1.8, 0.3],
				[47, 2.25, 0.15],
				[42, 2.40, 0.15],
				[42, 2.7, 0.15],
				[42, 3, 0.15],
				[44, 3.3, 0.15],
				[45, 3.6, 0.3],
				[44, 4.2, 0.3],
				[49, 4.8, 0.15],
				[47, 4.95, 0.15],
				[49, 5.1, 0.15],
				[49, 5.4, 0.15],
				[51, 5.7, 0.15],
				[52, 6.0, 0.3],
				[51, 6.6, 0.3],
				[44, 7.05, 0.15],
				[54, 7.2, 0.15],
				[54, 7.5, 0.15],
				[54, 7.8, 0.15],
				[52, 8.1, 0.15],
				[51, 8.4, 0.3],
				[52, 9.0, 0.3],
				[-100, 9.3, 0.3]
				];
var notesDrums = [
				[13, 0, 0.15],
				[25,0.6, 0.15],
				[13,1.2, 0.15],
				[25,1.8, 0.15],
				[13,2.4, 0.15],
				[25,3, 0.15],
				[13,3.6, 0.15],
				[25,4.2, 0.15],
				[13,4.8, 0.15],
				[25,5.4, 0.15],
				[13,6, 0.15],
				[25,6.6, 0.15],
				[13,7.2, 0.15],
				[25,7.8, 0.15],
				[13,8.4, 0.15],
				[25,9, 0.15],
				];
var notesBass = [
				[25, 0, 1.8],
				[21, 1.8, 0.6],
				[18, 2.4, 1.8],
				[23, 4.2, 0.6],
				[25, 4.8, 1.8],
				[21, 6.6, 0.6],
				[23, 7.2, 2.4],
				];


var notesIntro = [
				 [25, 0, 0.3],
				 [25, 0.3, 0.3],
				 [25, 0.6, 0.3],
				 [25, 0.9, 0.3],
				 [25, 1.2, 0.3],
				 [28,1.5,0.3],
				 [28, 1.8, 0.3],
				 [28, 2.1, 0.3],
				 [27, 2.4, 0.3],
				 [27, 2.7, 0.3],
				 [27, 3, 0.3],
				 [27, 3.3, 0.3],
				 [27, 3.6, 0.3],
				 [24, 3.9, 0.3],
				 [24, 4.2, 0.3],
				 [24, 4.5, 0.3],
				 ];


function getKeyFreq(key) {
	var tot = 1.0594630943592953;
	return Math.pow(tot, key-49) * 440;
}
function scheduleKey(tone,wave, startTime,length) {
	playFreq(getKeyFreq(tone), wave, startTime, length);
}


function playOneTime() {
	
	for (var i=0; i<notes.length; i++) {
		scheduleKey(notes[i][0],'square', notes[i][1], notes[i][2]);
	}
	
	for (var j=0; j<notesDrums.length; j++) {
		scheduleKey(notesDrums[j][0],'sine', notesDrums[j][1], notesDrums[j][2]);
	}
	for (var k=0; k<notesBass.length; k++) {
		scheduleKey(notesBass[k][0],'sine', notesBass[k][1], notesBass[k][2]);
	}
}
function startMusic() {
	window.clearInterval(introMusicTimer);
	leadGain.gain.value = options.musicVolume;
	var fullLength = notes[notes.length-1][1] + notes[notes.length-1][2];
	playOneTime();
	musicTimer = setInterval(playOneTime, fullLength*1000);
}
function stopMusic() {
	leadGain.gain.value = 0;
	window.clearInterval(musicTimer);
}

function playIntroMusic() {
	var fullLength = notesIntro[notesIntro.length-1][1] + notesIntro[notesIntro.length-1][2];
	playIntroMusicOneTime();
	introMusicTimer = setInterval(playIntroMusicOneTime, fullLength*1000);
}
function playIntroMusicOneTime() {
		for (var i=0; i<notesIntro.length; i++) {
		scheduleKey(notesIntro[i][0],'sawtooth', notesIntro[i][1], notesIntro[i][2]);
		scheduleKey(notesIntro[i][0],'square', notesIntro[i][1], notesIntro[i][2]);

	}
}
function playSoundEffect(i) {
	switch (i) {
		// block drop
		case 0:
			var osc = ac.createOscillator();
			osc.frequency.value = 520;
			osc.type='square';
			osc.connect(fxGain);
			osc.start();
			osc.stop(ac.currentTime + 0.1);
		break;
		// game over
		case 1:
			for (var i = 0; i<10; i++) {
				var osc = ac.createOscillator();
				osc.frequency.value = 440 - (i*20);
				osc.type='square';
				osc.connect(fxGain);
				osc.start(ac.currentTime + i*0.11);
				if (i == 9) {
				osc.stop(ac.currentTime + (i*0.11) + 0.3); 

				} else {
				osc.stop(ac.currentTime + (i*0.11) + 0.11); 
			}
			}
		break;
		case 2:
			var osc = ac.createOscillator();
			osc.frequency.value = 165;
			osc.type='sawtooth';
			osc.connect(fxGain);
			osc.start();
			osc.stop(ac.currentTime + 0.1);
		break;
		case 3:
			var osc = ac.createOscillator();
			osc.frequency.value = 220;
			osc.type='sawtooth';
			osc.connect(fxGain);
			osc.start();
			osc.stop(ac.currentTime + 0.1);
		break;
		case 4:
			var osc = ac.createOscillator();
			osc.frequency.value = 330;
			osc.type='sawtooth';
			osc.connect(fxGain);
			osc.start();
			osc.stop(ac.currentTime + 0.1);
		break;
	}
}
playIntroMusic();