// HTML.
const timeLeft = document.querySelector(".timer__left");
const yourHand = document.querySelector(".hand__you img");
const computerHand = document.querySelector(".hand__computer img");
const choiceButtons = document.querySelectorAll(".choice-box-thingy button");
const opponentChoosingMessage = document.querySelector(".choice__opponent-message");

function selectChoice() {
	let gameResult;

	const yourChoice = this.dataset.choice == "random" ? ["rock", "paper", "scissors"][Math.floor(Math.random() * 3)] : this.dataset.choice; // If choose random, get random choice, if not random, no random choice.
	console.log("Your choice:", yourChoice);
	
	this.dataset.chosen = "true"; // Keep focus on selected button.
	choiceButtons.forEach((button, index) => button.disabled = true); // Disable button so you can only click once.
	opponentChoosingMessage.dataset.choosing = "true"; // Show "Opponent is choosing a hand..." message.

	setTimeout(() => {
		const computerChoice = ["rock", "paper", "scissors"][Math.floor(Math.random() * 3)];
		console.log("Computer choice:", computerChoice);

		// Checking your choice.
		if (yourChoice == computerChoice) { // Draw.
			gameResult = "Draw. Press to continue.";
		} else if (yourChoice == "rock") { // Rock.
			if (computerChoice == "scissors") {
				gameResult = "You win! Press to continue.";
			} else if (computerChoice == "paper") {
				gameResult = "You lose! Press to continue.";
			};
		} else if (yourChoice == "paper") { // Paper.
			if (computerChoice == "rock") {
				gameResult = "You win! Press to continue.";
			} else if (computerChoice == "scissors") {
				gameResult = "You lose! Press to continue.";
			};
		} else if (yourChoice == "scissors") { // Scissors.
			if (computerChoice == "paper") {
				gameResult = "You win! Press to continue.";
			} else if (computerChoice == "rock") {
				gameResult = "You lose! Press to continue.";
			};
		};

		console.log(gameResult);
		opponentChoosingMessage.dataset.choosing = "false"; // Hide "Opponent is choosing a hand..." message.

		setTimeout(() => {
			window.alert(gameResult);

			this.dataset.chosen = "false"; // Remove focus state on selected button.
			choiceButtons.forEach((button, index) => button.disabled = false); // Enable button for next round.
		}, 1);

	}, Math.floor(Math.random() * (5000 - 1800 + 1) + 1800)); // Computer will select after 1.8 to 5 seconds.
};

choiceButtons.forEach((button, index) => button.addEventListener("click", selectChoice));