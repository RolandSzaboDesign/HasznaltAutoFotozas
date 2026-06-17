const Image = require("@11ty/eleventy-img");
const path = require("path");

module.exports = function (eleventyConfig) {
	// --- STATIC FILES ---
	eleventyConfig.addPassthroughCopy("src/favicon.ico");
	eleventyConfig.addPassthroughCopy("src/assets");
	eleventyConfig.addPassthroughCopy("src/assets/js");

	eleventyConfig.addWatchTarget("src/assets/css");
	eleventyConfig.addWatchTarget("src/assets/js");
	eleventyConfig.setQuietMode(true);

	// --- IMAGE SHORTCODE ---
	async function imageShortcode(src, alt, sizes = "(max-width: 991px) 50vw, (max-width: 1199px) 33vw, 33vw") {
		let metadata = await Image(src, {
			widths: [480, 600, 800],
			formats: ["webp"],
			urlPath: "/assets/images/gallery/",
			outputDir: "./public/assets/images/gallery/",
			filenameFormat: function (id, src, width, format) {
				const { name } = path.parse(src);
				return `${name}-${width}.${format}`;
			},
			sharpWebpOptions: { quality: 85 }
		});

		let imageAttributes = {
			alt,
			sizes,
			loading: "lazy",
			decoding: "async",
			class: "js-lightbox"
		};

		const originalSrc = src.replace("./src", "");
		const html = Image.generateHTML(metadata, imageAttributes, { whitespaceMode: "inline" });
		return html.replace("<img ", `<img data-highres="${originalSrc}" `);
	}

	eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcode);
	eleventyConfig.addLiquidShortcode("image", imageShortcode);

	// --- TIP MEDIA IMAGE SHORTCODE ---
	function getTipMediaImageSizes(columns = 1) {
		const columnCount = Number(columns);

		if (columnCount === 3) {
			return "(min-width: 1060px) calc((100rem - 2.4rem) / 3), (min-width: 576px) calc((100vw - 6.4rem) / 3), calc(100vw - 4rem)";
		}

		if (columnCount === 2) {
			return "(min-width: 1060px) calc((100rem - 1.2rem) / 2), (min-width: 576px) calc((100vw - 5.2rem) / 2), calc(100vw - 4rem)";
		}

		return "(min-width: 1060px) 100rem, calc(100vw - 4rem)";
	}

	function getTipMediaImageWidths(columns = 1) {
		const columnCount = Number(columns);

		if (columnCount === 3) {
			return [320, 480, 640];
		}

		if (columnCount === 2) {
			return [480, 640, 800];
		}

		return [640, 800, 960, 1200];
	}

	function getTipMediaImageInputPath(src) {
		if (src.startsWith("./src/")) {
			return src;
		}

		const cleanSrc = src.replace(/^\/+/, "");
		return `./src/${cleanSrc}`;
	}

	async function tipMediaImageShortcode(src, alt, columns = 1, className = "tip-media__image") {
		const columnCount = Number(columns);

		const metadata = await Image(getTipMediaImageInputPath(src), {
			widths: getTipMediaImageWidths(columnCount),
			formats: ["webp"],
			urlPath: "/assets/images/tips/generated/",
			outputDir: "./public/assets/images/tips/generated/",
			filenameFormat: function (id, src, width, format) {
				const { name } = path.parse(src);
				return `${name}-${width}.${format}`;
			},
			sharpWebpOptions: {
				quality: 85
			}
		});

		const imageAttributes = {
			alt,
			sizes: getTipMediaImageSizes(columnCount),
			loading: "lazy",
			decoding: "async",
			class: className
		};

		return Image.generateHTML(metadata, imageAttributes, {
			whitespaceMode: "inline"
		});
	}

	eleventyConfig.addNunjucksAsyncShortcode("tipMediaImage", tipMediaImageShortcode);
	eleventyConfig.addLiquidShortcode("tipMediaImage", tipMediaImageShortcode);

	// --- TIPS COLLECTION ---
	eleventyConfig.addCollection("tips", function(collectionApi) {
		return collectionApi
			.getFilteredByTag("tips")
			.sort((a, b) => {
				return (a.data.order || 999) - (b.data.order || 999);
			});
	});

	// --- DIRECTORIES ---
	return {
		dir: {
			input: "src",
			output: "public",
			includes: "_includes"
		}
	};
};
