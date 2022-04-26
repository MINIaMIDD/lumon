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
