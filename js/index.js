const SCARY_INDICES = [24, 56, 87, 123, 176, 192, 232, 278, 309];
const MIN_SCALE = 1;
const MAX_SCALE = 2.5;
const GRID_COUNT = 320;
const IMAGES = [
	"images/s.png",
	"images/e.png",
	"images/v.png",
	"images/e.png",
	"images/r.png",
	"images/a.png",
	"images/n.png",
	"images/c.png",
	"images/e.png",
];

const input = document.querySelector("input");
let progress = 0;

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
	await fade(welcomeEl, 2000, 0);
	await fade(mdrEl, 2000, 1);
}

const scaleNumbers = (e) => {
	const { pageX, pageY } = e;

	document.querySelectorAll("#grid div").forEach((div) => {
		const dx = div.offsetLeft + div.clientWidth / 2 - pageX;
		const dy = div.offsetTop + div.clientHeight / 2 - pageY;
		const dist = Math.sqrt(dx * dx + dy * dy);

		const scale = MIN_SCALE + MAX_SCALE - Math.max(MIN_SCALE, Math.min(MAX_SCALE, dist / 100));
		div.style.transform = `scale(${scale})`;
		div.style.zIndex = scale === MAX_SCALE ? 2 : 1;
	});
};

const setupGrid = () => {
	const grid = document.querySelector("#grid");
	const numbers = new Array(GRID_COUNT).fill(0).map(() => Math.floor(Math.random() * 10));

	for (let i = 0; i < numbers.length; i++) {
		const element = document.createElement("div");

		element.innerHTML = numbers[i];
		const index = SCARY_INDICES.indexOf(i);

		if (index !== -1) {
			element.classList.add("scary");
			element.addEventListener("click", () => handleScaryNumberClick(element, index), {
				once: true,
			});
		}

		grid.appendChild(element);
	}
};

const handleScaryNumberClick = (element, index) => {
	element.style.opacity = 0;
	progress += 100 / SCARY_INDICES.length;

	const formattedPercent = progress.toFixed(0);

	document.querySelector("#progress").innerHTML = `${formattedPercent}% Complete`;
	document.querySelector(".header__bar-progress").style.width = `${progress}%`;

	const modal = document.querySelector("#modal");
	const img = modal.querySelector("img");

	img.src = IMAGES[index];
	img.addEventListener(
		"load",
		() => {
			modal.style = "opacity: 1; pointer-events: all";
		},
		{ once: true }
	);

	const closeModal = () => {
		modal.style = "opacity: 0; pointer-events: none";
		modal.removeEventListener("click", handleModalClick);
		document.removeEventListener("keydown", handleModalEscape);
	};

	const handleModalClick = (e) => {
		if (e.target === modal) closeModal();
	};
	modal.addEventListener("click", handleModalClick);

	const handleModalEscape = (e) => {
		if (e.key === "Escape") closeModal();
	};
	document.addEventListener("keydown", handleModalEscape);
};

window.addEventListener("load", () => {
	setupGrid();
	setTimeout(handleIntro, 2000);
	document.addEventListener("mousemove", scaleNumbers);
});

const form = document.querySelector("#password");

form.addEventListener("submit", (e) => {
	e.preventDefault();

	if (input.value.toLowerCase() === "severance") {
		window.location.href = "mdr.html";
	} else {
		input.classList.add("error");
	}
});

input.addEventListener("input", () => {
	input.classList.remove("error");
});
