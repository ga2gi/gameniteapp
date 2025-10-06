<script>
	let showModal = false;

	function openModal() {
		showModal = true;
	}

	function closeModal() {
		showModal = false;
	}

	function handlePayment() {
		// ⚙️ Replace this with your Paystack M-Pesa integration
		alert("Redirecting to Paystack for M-Pesa payment of KES 500...");
		// Example: window.location.href = "https://paystack.com/pay/yourlink";
	}
</script>

<div class="homepage">
	<header class="hero">
		<h1 class="title">Welcome to ChezaNite 🎮</h1>
		<p class="tagline">
			Kenya’s ultimate game night app — perfect for <strong>picnics</strong>, <strong>hangouts</strong>,
			<strong>date nights</strong>, <strong>solo play</strong>, <strong>events</strong>, and even
			<strong>nationwide competitions</strong>!
		</p>
		<button class="subscribe-btn" on:click={openModal}>
			Subscribe for KES 500/month
		</button>
	</header>

	<section class="about">
		<h2>About ChezaNite</h2>
		<p>
			ChezaNite turns any moment into a fun game night! Play trivia, charades, murder mystery, or
			imposter with friends — or go solo in our nationwide challenges. Whether you’re chilling at home,
			on a date, or hosting an event, ChezaNite brings people together through laughter, competition,
			and connection.
		</p>
	</section>

	{#if showModal}
		<div class="modal-overlay" on:click={closeModal}>
			<div class="modal" on:click|stopPropagation>
				<h2>Subscribe to ChezaNite 💚</h2>
				<p>
					Unlock all games and features for only <strong>KES 500/month</strong>.<br />
					Payments powered by <strong>Paystack (M-Pesa, Card, or Mobile Money)</strong>.
				</p>
				<button class="pay-btn" on:click={handlePayment}>Pay with M-Pesa</button>
				<button class="cancel-btn" on:click={closeModal}>Cancel</button>
			</div>
		</div>
	{/if}
</div>

<style>
.homepage {
	display: flex;
	flex-direction: column;
	align-items: center;
	text-align: center;
	min-height: 100vh;
	background: #fdfdfd;
	font-family: "Poppins", sans-serif;
	color: #222;
	padding: 2rem 1rem;
}

/* HERO SECTION */
.hero {
	margin-top: 3rem;
	background: linear-gradient(135deg, #ff66b2, #4caf50);
	color: white;
	padding: 3rem 2rem;
	border-radius: 1.5rem;
	box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
	max-width: 750px;
	width: 100%;
}

.title {
	font-size: 2.5rem;
	margin-bottom: 1rem;
	font-weight: 700;
}

.tagline {
	font-size: 1.2rem;
	margin-bottom: 2rem;
	line-height: 1.7;
	font-weight: 500;
}

/* BUTTONS */
.subscribe-btn {
	background: white;
	color: #4caf50;
	border: none;
	padding: 0.9rem 2rem;
	border-radius: 50px;
	font-weight: bold;
	font-size: 1rem;
	cursor: pointer;
	transition: 0.3s;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.subscribe-btn:hover {
	background: #4caf50;
	color: white;
	transform: scale(1.05);
}

/* ABOUT SECTION */
.about {
	max-width: 750px;
	margin: 4rem auto;
	padding: 2.5rem;
	background: #ffffff;
	border-radius: 1rem;
	box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
}

.about h2 {
	color: #4caf50;
	margin-bottom: 1rem;
	font-size: 1.8rem;
	font-weight: 600;
}

.about p {
	line-height: 1.8;
	color: #333;
	font-size: 1rem;
}

/* MODAL STYLING */
.modal-overlay {
	position: fixed;
	inset: 0;
	background: rgba(0, 0, 0, 0.6);
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 1000;
	backdrop-filter: blur(3px);
}

.modal {
	background: white;
	padding: 2rem;
	border-radius: 1rem;
	box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
	max-width: 400px;
	width: 90%;
	text-align: center;
}

.modal h2 {
	color: #4caf50;
	margin-bottom: 1rem;
}

.modal p {
	font-size: 1rem;
	margin-bottom: 1.5rem;
	line-height: 1.6;
}

.pay-btn {
	background: #4caf50;
	color: white;
	border: none;
	padding: 0.8rem 2rem;
	border-radius: 50px;
	font-weight: bold;
	font-size: 1rem;
	cursor: pointer;
	margin-bottom: 0.5rem;
	transition: 0.3s;
}

.pay-btn:hover {
	background: #43a047;
	transform: scale(1.05);
}

.cancel-btn {
	background: transparent;
	color: #555;
	border: none;
	font-size: 0.9rem;
	cursor: pointer;
	text-decoration: underline;
}

/* RESPONSIVE */
@media (max-width: 600px) {
	.title {
		font-size: 2rem;
	}
	.tagline {
		font-size: 1rem;
	}
	.about {
		margin: 2rem 1rem;
		padding: 1.5rem;
	}
}
</style>
