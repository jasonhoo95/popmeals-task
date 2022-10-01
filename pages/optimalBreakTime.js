import { useEffect } from "react";

export default function OptimalBreakTime() {
	useEffect(() => {
		const array = [1, 4, 1, 3, 1];
		var secondRes = 0;
		var firstRes = 0;
		let arrayMatchFirst = [];
		let arrayMatchSecond = [];
		for (var i = 0; i < array.length; i++) {
			for (var t = 0; t < i; t++) {
				firstRes += array[t];
				if (t == i - 1) {
					arrayMatchFirst.push({ value: firstRes, id: i - 1 });

					firstRes = 0;
				}
			}

			for (var u = i + 1; u < array.length; u++) {
				secondRes += array[u];
				if (u == array.length - 1) {
					arrayMatchSecond.push({ value: secondRes });
					secondRes = 0;
				}
			}
		}
		if (arrayMatchFirst.length == arrayMatchSecond.length) {
			let pass = false;
			let indexNo;
			for (var p = 0; p < arrayMatchFirst.length; p++) {
				if (arrayMatchFirst[p].value == arrayMatchSecond[p].value) {
					pass = true;
					indexNo = arrayMatchFirst[p].id;
				}
			}

			if (pass) {
				console.log(indexNo, "index number match");
			} else {
				console.log("no index number match");
			}
		}
	}, []);
	return <div></div>;
}
