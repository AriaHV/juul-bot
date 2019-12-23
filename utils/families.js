const { resolve } = require('path');
const { readdirSync, statSync } = require('fs');

module.exports = {
	getFamilies: () => {
		const families = {};
		const path = resolve(process.cwd(), 'families');
		const directories = readdirSync(path).filter(x => statSync(`${path}/${x}`).isDirectory());

		for (const family of directories) {
			const files = readdirSync(`${path}/${family}`).filter(x => x.endsWith('.js'));
			console.log(family);
			families[family] = {
				main: require(`${path}/${family}/${files.find(file => isMainFile(family, file))}`),
				commands: files
					.filter(file => !isMainFile(family, file))
					.map(file => require(`${path}/${family}/${file}`)),
			};
		}

		return families;
	},

};

const isMainFile = (family, file) => {
	return family === file.substring(0, file.length - '.js'.length);
};