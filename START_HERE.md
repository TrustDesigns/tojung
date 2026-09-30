# Tóju — project export

Start here. This archive is a source-code export of the latest published Tóju store.
Live website: https://tojung.codecampusabuja.chatgpt.site

## Included
- Customer storefront, shopping bag, checkout, responsive layouts and SEO files.
- Admin screens, staff roles, homepage CMS, product and stock management, coupons and activity logs.
- State/LGA delivery editor, matching fees at checkout and delivery snapshots on orders.
- Paystack initialization, verification and webhook code.
- Bundled catalog images in public/products, Nigerian LGA data and data attribution.
- Database schema and initial migration, build configuration, dependency lockfile and delivery regression tests.

## Not included
This is not a backup of the live store database or uploaded media. Products edited by admin, orders, customers, staff records, delivery rates, saved homepage settings and uploaded hero/product images live in the hosted D1 database and R2 storage. They are NOT in this archive. Runtime secrets (Paystack key, encryption key, authentication credentials) are also not included. The original hosted store is unchanged.

## Open the project
1. Extract the ZIP and open the toju-project folder in an editor such as VS Code.
2. Install Node.js 22.13 or newer.
3. Install the pnpm version declared in package.json (11.25.0), then run:

   pnpm install --frozen-lockfile
   pnpm dev

4. Open the local address printed in the terminal.

The clean export uses the portable development profile. Local database/storage start empty; apply the SQL in drizzle/0000_silky_agent_zero.sql to the local DB binding before using the storefront. Configure local runtime values for development. The included README.md has the starter's local-preview notes. Node.js and pnpm are development requirements, not customer requirements.

## Moving to another host
The project uses vinext/Vite with a Cloudflare Worker runtime, D1 database and R2 media storage. It is NOT a static HTML website and cannot be migrated just by uploading the ZIP to a static web host.

A developer must:
1. Configure equivalent production database and object-storage bindings (DB and BUCKET), or adapt the code to the new host's database/storage.
2. Export the original hosted database and uploaded media separately, import them into the new services, and update any media URLs in products and homepage settings.
3. Replace the ChatGPT Sites sign-in integration with real server-verified authentication on the new host. app/chatgpt-auth.ts currently reads identity headers supplied by the trusted Sites hosting layer. Do not trust user-supplied versions of those headers on an external host. Replace sign-in/sign-out links, protect admin APIs, and preserve the email-based staff roles.
4. Configure ADMIN_OWNER_EMAIL with the owner's email. Configure STORE_ENCRYPTION_KEY as a base64-encoded 32-byte AES-GCM key. A fresh payment setup can use the owner's Paystack key through admin after authentication is working. If migrating an encrypted saved Paystack key, it requires the ORIGINAL encryption key; alternatively reconnect Paystack with the owner on the new host.
5. Set SITE_URL or update lib/seo.ts to the confirmed new public origin. Verify canonical URL, sitemap, robots and structured data there.
6. Update Paystack's webhook to https://NEW-DOMAIN/api/payment/webhook and run a full Paystack test order before live payments.
7. Configure external Worker deployment. .openai/hosting.json identifies the original ChatGPT Site; it is reference configuration and does not grant access or deploy this project to a new service. The placeholder database identifiers in vite.config.ts are for local development, not production deployment.

## Checks
Run `pnpm exec tsc --noEmit`, `pnpm test:delivery` and `pnpm build` after migration changes. Delivery tests use mocked database and payment services; they do not place a live payment. Validate admin sign-in, staff permissions, image upload, delivery matching, payment verification and the webhook on the new production host.

## Optional GitHub upload later
No GitHub app is required to download or edit this export. If you later want a repository, create an empty private repository on GitHub and use local Git to commit this folder and push it. Never commit runtime secrets or a customer database export.
