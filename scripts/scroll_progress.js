document.addEventListener('DOMContentLoaded', () => {
	const progressBar = document.getElementById('progress');
	const sections = document.querySelectorAll('.track-section');

	function updateProgressBar() {
		const scrollY = window.scrollY;
		const viewportHeight = window.innerHeight;
		const viewportMid = scrollY + viewportHeight / 2;

		let activeSection = null;

		for (const section of sections) {
			const sectionTop = section.offsetTop;
			const sectionHeight = section.offsetHeight;

			if (viewportMid >= sectionTop && viewportMid < sectionTop + sectionHeight) {
				activeSection = section;

				const progress = Math.max(0, Math.min(1, (scrollY - sectionTop) / sectionHeight));
				progressBar.style.height = `${progress * 100}vh`;
				progressBar.style.backgroundColor = section.dataset.color || 'red';
				return;
			}
		}

		// If not in any tracked section
		progressBar.style.height = '0';
	}

	window.addEventListener('scroll', updateProgressBar);
	window.addEventListener('resize', updateProgressBar);
	updateProgressBar();
});
