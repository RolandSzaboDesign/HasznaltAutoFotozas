document.addEventListener("DOMContentLoaded", function () {
	const el = document.getElementById("js-benefits");
	const benefits = ["gyorsabban", "drágábban", "idegeskedés nélkül", "profi képekkel"];
	let benefitIndex = 0;
	let charIndex = 0;
	let typing = true;

	function type() {
		if (typing) {
			if (charIndex < benefits[benefitIndex].length) {
				el.textContent += benefits[benefitIndex].charAt(charIndex);
				charIndex++;
				setTimeout(type, 60);
			} else {
				typing = false;
				setTimeout(type, 1000);
			}
		} else {
			if (charIndex > 0) {
				el.textContent = benefits[benefitIndex].substring(0, charIndex - 1);
				charIndex--;
				setTimeout(type, 15);
			} else {
				typing = true;
				benefitIndex = (benefitIndex + 1) % benefits.length;
				setTimeout(type, 250);
			}
		}
	}

	type();
});
