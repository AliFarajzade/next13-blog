/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.SITE_URL ?? 'http://localhost:1234',
    generateRobotsTxt: true, // (optional)
    generateIndexSitemap: false,
}
