const AUDIO_SOURCES = ["audio/consent.mp3", "audio/evidence.mp3", "audio/breakroom.mp3", "audio/mscasey.mp3"];
const audioEl = new Audio();
let currentAudioIndex = null;

Array.from(document.querySelectorAll(".file")).forEach((element, index) => {
	element.addEventListener("click", async () => {
		if (audioEl.currentSrc.endsWith(AUDIO_SOURCES[index])) {
			if (audioEl.paused) {
				await audioEl.play();
			} else {
				audioEl.pause();
			}
		} else {
			audioEl.currentTime = 0;
			audioEl.src = AUDIO_SOURCES[index];
			currentAudioIndex = index;
			await audioEl.play();
		}
	});
});

audioEl.addEventListener("timeupdate", (e) => {
	Array.from(document.querySelectorAll(".file__progress")).forEach((element, index) => {
		if (index === currentAudioIndex) {
			const percent = (e.currentTarget.currentTime / e.currentTarget.duration) * 100;
			element.style.width = `${percent}%`;
		} else {
			element.style.width = 0;
		}
	});
});

async function fade(el, speed, opacity) {
	return new Promise((resolve) => {
		el.style.transition = `opacity ${speed}ms ease`;
		el.style.opacity = opacity;

		if (opacity === 0) {
			setTimeout(() => {
				el.parentNode.removeChild(el);
				resolve();
			}, speed);
		} else {
			resolve();
		}
	});
}

async function handleIntro() {
	const welcomeEl = document.querySelector(".welcome");
	const mdrEl = document.querySelector(".mdr");
	mdrEl.style = "opacity: 0";
	const ogOverflow = document.body.style.overflow;
	document.body.style.overflow = "hidden";
	await fade(welcomeEl, 2000, 0);
	await fade(mdrEl, 2000, 1);
	document.body.style.overflow = ogOverflow;
}

window.addEventListener("load", () => {
	setTimeout(handleIntro, 2000);
});
