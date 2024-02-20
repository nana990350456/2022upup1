export const Color= class Color {

	#r;

	#g;

	#b;

	constructor(r, g, b) {
		this.#r = r;
		this.#g = g;
		this.#b = b;

	}

	get r() {
		return this.#r;
	}

	set r(r) {
		this.#r = r;
	}

	get g() {
		return this.#g;
	}

	set g(g) {
		this.#g = g;
	}

	get b() {
		return this.#b;
	}

	set b(b) {
		this.#b = b;
	}

	toRgb() {
		return `rgb(${this.#r},${this.#g},${this.#b})`;
	}
}

export const ColorConventer= class ColorConventer {

	/**
	 * @param {Object} count色标条高度
	 */
	createColorRule(count) {
		//色标尺分4块:分别为3/8,1/8,2/8,2/8
		// bar1 = get_multi_colors_by_rgb([255,255,255],[0,200,255],300)   #512-15-3
		// bar2 = get_multi_colors_by_rgb([0,200,255],[0,140,255],100)   #512-15-3
		// bar3 = get_multi_colors_by_rgb([0,140,255],[150,0,127],200)   #512-15-3
		// bar4 = get_multi_colors_by_rgb([150,0,127],[0,0,0],200)   #512-15-3
		let count1 = Math.floor(count * 3 / 8);
		let count2 = Math.floor(count * 1 / 8);
		let count3 = Math.floor(count * 2 / 8);
		let count4 = count - count1 - count2 - count3;
		let colors = [];
		colors.push(...this.createColorRuleSeqment(new Color(255, 255, 255), new Color(255, 200, 0), count1));
		colors.push(...this.createColorRuleSeqment(new Color(255, 200, 0), new Color(255, 140, 0), count2));
		colors.push(...this.createColorRuleSeqment(new Color(255, 140, 0), new Color(127, 0, 150), count3));
		colors.push(...this.createColorRuleSeqment(new Color(127, 0, 150), new Color(0, 0, 0), count4));
		return colors;
	}

	createColorRuleSeqment(start, end, count) {
		let colors = [];
		let stepR = (end.r - start.r) / count;
		let stepG = (end.g - start.g) / count;
		let stepB = (end.b - start.b) / count;
		let r = start.r;
		let g = start.g;
		let b = start.b;
		for (let i = 0; i < count; i++) {
			let tr = Math.floor(r + stepR * i);
			let tg = Math.floor(g + stepG * i);
			let tb = Math.floor(b + stepB * i);
			colors.push(new Color(tr, tg, tb));
		}
		return colors;
	}

	/**
	 * @param {Object} maxT 最高温度
	 * @param {Object} minT 最低温度
	 * @param {Object} Tmatrix 温度矩阵
	 * @param {Object} count  色标尺的长度
	 */
	conventColor(maxT, minT, tMatrix, count) {
		let ruleColors = this.createColorRule(count);
		let colors = [];
		let stepT = (maxT - minT) / count;
		for (let i = 0, len = tMatrix.length; i < len; i++) {
			let t = tMatrix[i];
			if (t >= maxT) {
				colors.push(new Color(255, 255, 255));
			} else if (t <= minT) {
				colors.push(new Color(0, 0, 0));
			} else {
				let index = Math.floor((t - minT) / stepT);
				//colors.push(ruleColors[index]);
				colors.push(ruleColors[count - index - 1]);
			}
		}
		return colors;
	}
}
