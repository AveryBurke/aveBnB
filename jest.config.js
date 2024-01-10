const nextJest = require("next/jest");

// Providing the path to your Next.js app which will enable loading next.config.js and .env files
const createJestConfig = nextJest({ dir: "./" });

/** @type {import('jest').Config} */

// Any custom config you want to pass to Jest
const customJestConfig = {
	setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
	testEnvironment: "jest-environment-jsdom",
	preset: "ts-jest",
	verbose: true,
	moduleDirectories: ["node_modules", "<rootDir>/"],
	moduleNameMapper: {
		// Force module uuid to resolve with the CJS entry point, because Jest does not support package.json.exports. See https://github.com/uuidjs/uuid/issues/451
		"@auth/(.*)": require.resolve("uuid"),
		"^(\\.{1,2}/.*)\\.js$": "$1",
		// "^@/*": "$1",
	},
	// jest removes fetch from jsdom. but I need to mock fetch calls, so I have to add it back
	globals: {
		fetch: global.fetch,
	  }
};

// createJestConfig is exported in this way to ensure that next/jest can load the Next.js configuration, which is async
module.exports = createJestConfig(customJestConfig);
