/** @type {import('next').NextConfig} */
const nextConfig = {
    transpilePackages:["query-string", "decode-uri-component", "split-on-first", "filter-obj"],
	images: {
		remotePatterns: [
            {
                protocol: 'https',
                hostname: "avatars.githubusercontent.com",
                pathname:"**"
            },
            {
                protocol: 'https',
                hostname: "lh3.googleusercontent.com",
                pathname:"**"
            }
        ]
	},
};

module.exports = nextConfig;
