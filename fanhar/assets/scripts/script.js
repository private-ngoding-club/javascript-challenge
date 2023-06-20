let gameTimer;

// HTML.
const timeLeft = document.querySelector(".timer__left");
const yourHand = document.querySelector(".hand__you img");
const computerHand = document.querySelector(".hand__computer img");
const choiceButtons = document.querySelectorAll(".choice__box-thingy button");
const opponentChoosingMessage = document.querySelector(".choice__opponent-message");

function selectChoice() {
	let gameResult;

	const yourChoice = this.dataset.choice == "random" ? ["rock", "paper", "scissors"][Math.floor(Math.random() * 3)] : this.dataset.choice; // If choose random, get random choice, if not random, no random choice.
	console.log("Your choice:", yourChoice);
	
	updateHand(yourHand, yourChoice);
	clearInterval(gameTimer); // Stop timer after clicked.

	this.dataset.chosen = "true"; // Keep focus on selected button.
	choiceButtons.forEach((button, index) => button.disabled = true); // Disable button so you can only click once.
	opponentChoosingMessage.dataset.choosing = "true"; // Show "Opponent is choosing a hand..." message.

	setTimeout(() => {
		const computerChoice = ["rock", "paper", "scissors"][Math.floor(Math.random() * 3)];
		console.log("Computer choice:", computerChoice);

		updateHand(computerHand, computerChoice);

		// Checking your choice.
		if (yourChoice == computerChoice) { // Draw.
			gameResult = `Your choice: ${yourChoice}\nComputer choice: ${computerChoice}\n\nDraw. Press to continue.`;
		} else if (yourChoice == "rock") { // Rock.
			if (computerChoice == "scissors") {
				gameResult = `Your choice: ${yourChoice}\nComputer choice: ${computerChoice}\n\nYou win! Press to continue.`;
			} else if (computerChoice == "paper") {
				gameResult = `Your choice: ${yourChoice}\nComputer choice: ${computerChoice}\n\nYou lose! Press to continue.`;
			};
		} else if (yourChoice == "paper") { // Paper.
			if (computerChoice == "rock") {
				gameResult = `Your choice: ${yourChoice}\nComputer choice: ${computerChoice}\n\nYou win! Press to continue.`;
			} else if (computerChoice == "scissors") {
				gameResult = `Your choice: ${yourChoice}\nComputer choice: ${computerChoice}\n\nYou lose! Press to continue.`;
			};
		} else if (yourChoice == "scissors") { // Scissors.
			if (computerChoice == "paper") {
				gameResult = `Your choice: ${yourChoice}\nComputer choice: ${computerChoice}\n\nYou win! Press to continue.`;
			} else if (computerChoice == `rock`) {
				gameResult = `Your choice: ${yourChoice}\nComputer choice: ${computerChoice}\n\nYou lose! Press to continue.`;
			};
		};

		console.log(gameResult);
		opponentChoosingMessage.dataset.choosing = "false"; // Hide "Opponent is choosing a hand..." message.

		setTimeout(() => {
			window.alert(gameResult);

			this.dataset.chosen = "false"; // Remove focus state on selected button.
			choiceButtons.forEach((button, index) => button.disabled = false); // Enable button for next round.

			startTimer();
		}, 20);

	}, Math.floor(Math.random() * (5000 - 1800 + 1) + 1800)); // Computer will select after 1.8 to 5 seconds.
};

function updateHand(hand, choice) {
	hand.src = `./assets/images/${choice}.png`;
	hand.alt = `Hand ${choice}.`;
};

function startTimer() {
	let seconds = 5;

	timeLeft.innerText = "05 sec";

	gameTimer = setInterval(() => {
		if (seconds == 0) {
			clearInterval(gameTimer);
			choiceButtons[3].click();
			return;
		};

		seconds--;
		timeLeft.innerText = `0${seconds} sec`;
	}, 1000);
};

choiceButtons.forEach((button, index) => button.addEventListener("click", selectChoice));

document.addEventListener("DOMContentLoaded", () => {
	window.alert("Press to play.");
	startTimer();
});