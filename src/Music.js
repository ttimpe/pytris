// music.js

 window.AudioContext = window.AudioContext || window.webkitAudioContext;


function Music() {}

Music.musicTimer = null;
Music.introMusicTimer = null;
Music.ac = new AudioContext();
Music.leadGain = Music.ac.createGain();
Music.leadGain.gain.value = options.musicVolume;
Music.leadGain.connect(Music.ac.destination);
Music.fxGain = Music.ac.createGain();
Music.fxGain.gain.value=options.fxVolume;
Music.fxGain.connect(Music.ac.destination);
Music.oscs = new Array();
Music.bpm = 100;
Music.notes = [
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
Music.notesDrums = [
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
Music.notesBass = [
				[25, 0, 1.8],
				[21, 1.8, 0.6],
				[18, 2.4, 1.8],
				[23, 4.2, 0.6],
				[25, 4.8, 1.8],
				[21, 6.6, 0.6],
				[23, 7.2, 2.4],
				];


Music.notesIntro = [
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


Music.getKeyFreq = function(key) {
	var tot = 1.0594630943592953;
	return Math.pow(tot, key-49) * 440;
};
Music.scheduleKey = function(tone,wave, startTime,length) {
	Music.playFreq(Music.getKeyFreq(tone), wave, startTime, length);
};

Music.playFreq = function(freq,type,startTime, length) {
	var osc = Music.ac.createOscillator();
	osc.type = type;
	osc.frequency.value = freq;
	Music.leadGain.gain.value = options.musicVolume;
	osc.connect(Music.leadGain);
	Music.oscs.push(osc);

	log('scheduling at ' + Music.ac.currentTime + startTime);
	osc.start(Music.ac.currentTime + startTime);
	osc.stop(Music.ac.currentTime + startTime + length);


};
Music.playOneTime = function() {
	for (var i=0; i<Music.notes.length; i++) {
		Music.scheduleKey(Music.notes[i][0],'square', Music.notes[i][1], Music.notes[i][2]);
	}
	
	for (var j=0; j<Music.notesDrums.length; j++) {
		Music.scheduleKey(Music.notesDrums[j][0],'sine', Music.notesDrums[j][1], Music.notesDrums[j][2]);
	}
	for (var k=0; k<Music.notesBass.length; k++) {
		Music.scheduleKey(Music.notesBass[k][0],'sine', Music.notesBass[k][1], Music.notesBass[k][2]);
	}
};

Music.startMusic = function() {
	Music.stopAllMusic();
	var fullLength = Music.notes[Music.notes.length-1][1] + Music.notes[Music.notes.length-1][2];
	Music.playOneTime();
	Music.musicTimer = setInterval(Music.playOneTime, fullLength*1000);
};
Music.playIntroMusic = function() {
	var fullLength = Music.notesIntro[Music.notesIntro.length-1][1] + Music.notesIntro[Music.notesIntro.length-1][2];
	Music.playIntroMusicOneTime();
	Music.introMusicTimer = setInterval(Music.playIntroMusicOneTime, fullLength*1000);
};
Music.playIntroMusicOneTime = function() {
	var l = Music.notesIntro.length;
		for (var i=0; i<l; i++) {

			Music.scheduleKey(Music.notesIntro[i][0]-21,'sine', Music.notesIntro[i][1], Music.notesIntro[i][2]);
			Music.scheduleKey(Music.notesIntro[i][0],'sawtooth', Music.notesIntro[i][1], Music.notesIntro[i][2]);
			Music.scheduleKey(Music.notesIntro[i][0],'square', Music.notesIntro[i][1], Music.notesIntro[i][2]);

	}
};

Music.playSoundEffect = function(i) {
	switch (i) {
		// block drop
		case 0:
			var osc = Music.ac.createOscillator();
			osc.frequency.value = 520;
			osc.type='square';
			osc.connect(Music.fxGain);
			osc.start();
			osc.stop(Music.ac.currentTime + 0.1);
		break;
		// game over
		case 1:
			for (var i = 0; i<10; i++) {
				var osc = Music.ac.createOscillator();
				osc.frequency.value = 440 - (i*20);
				osc.type='square';
				osc.connect(Music.fxGain);
				osc.start(Music.ac.currentTime + i*0.11);
				if (i == 9) {
					osc.stop(Music.ac.currentTime + (i*0.11) + 0.3); 
				} else {
					osc.stop(Music.ac.currentTime + (i*0.11) + 0.11); 
				}
			}
		break;
		case 2:
			var osc = Music.ac.createOscillator();
			osc.frequency.value = 165;
			osc.type='sawtooth';
			osc.connect(Music.fxGain);
			osc.start();
			osc.stop(Music.ac.currentTime + 0.1);
		break;
		case 3:
			var osc = Music.ac.createOscillator();
			osc.frequency.value = 220;
			osc.type='sawtooth';
			osc.connect(Music.fxGain);
			osc.start();
			osc.stop(Music.ac.currentTime + 0.1);
		break;
		case 4:
			var osc = Music.ac.createOscillator();
			osc.frequency.value = 330;
			osc.type='sawtooth';
			osc.connect(Music.fxGain);
			osc.start();
			osc.stop(Music.ac.currentTime + 0.1);
		break;
		case 5:
			var osc = Music.ac.createOscillator();
			osc.frequency.value = 165;
			osc.type='sawtooth';
			osc.connect(Music.fxGain);
			osc.start();
			osc.stop(Music.ac.currentTime + 0.1);
		break;
	}
};
Music.stopAllMusic = function() {
	for (var i = 0; i < Music.oscs.length; i++) {
		try {
		Music.oscs[i].stop();
	} catch (ex) {
		
	}
	}
	clearInterval(Music.musicTimer);
	clearInterval(Music.introMusicTimer);
}
Music.playIntroMusic();