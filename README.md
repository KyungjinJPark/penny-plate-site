# Node.js App for [Penny Plate](http://pennyplate.com/)
## React App
This repository contains the `React` Site for Penny Plate.

Site Features:
- Fetches product information from a Headless CMS using GraphQL
- Filters items by given categories also fetched from CMS
- Search for items by item ID or a keyword in the description
- Items can be "saved", and "saved items" can be viewed together in a modal
- A PDF can be generated from the "saved items" and downloaded
- An email can be sent to Penny Plate's contact email directly from the site's contact page.

## Mail API
This repository also contains the code for the Node.js API server which uses `express`. The mail API accepts post requests, and uses `nodemailer` to send emails to Penny Plate's contact email.

### File Structure
The repository has a wrapper folder around everything not repository related so that deployment to heroku is easier. It also allows for a seperate `.gitignore` for deployment: one that does not exclude the`.env`. When deploying to heroku, create the git repository at the `/heroku-wrap` level.