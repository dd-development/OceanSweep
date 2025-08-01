<p align="center">
  <img width="250" height="250" alt="OceanSweep" src="https://github.com/user-attachments/assets/38a391b2-96ff-44e4-9566-8fd6f7cec372" />
</p>

# OceanSweep
Community platform for organizing and volunteering for local waterfront cleanup and fundraising events. Built using Next.js + React, TypeScript, and PostgreSQL with Prisma.

## Overview and Credits
*OceanSweep* was designed and developed over the course of 15 weeks with a team of 4 people utilizing the Scrum Agile framework and Jira:

  - **dd-development (Myself):** Location-based functionalities (Leaflet/Google Maps implementation), about page, profile page, dashboard page, CDN implementation, events/posts creation and feeds, UI design,
                                 database queries/design/testing, seed data

  - **Onkar Dangi:** Signup/login/session management, donation page, resources page, about page, profile page, feedback page, dashboard page, CDN implementation, events/posts creation and feeds, UI design,
                     database queries and design

  - **Yurii Koval:** Signup/login, activity feed in side-navigation bar, about page, database design, refactoring, documentation

  - **Hristian Tountchev:** Project set-up, signup/login, dashboard page, about page, database design/testing, documentation

Each sprint was 1 week. We had daily Scrum meetings to discuss development progress and direction for specific objectives while forumlating plans for future sprints. We also incorporated techniques such as pair
programming and continuous integration/testing into our development cycle.

## Design and Usage
***YOU WILL NEED A .ENV FILE WITH YOUR OWN VALID API KEYS IN ORDER TO RUN THIS PROJECT, FILL IN AND SAVE THE EXAMPLE BELOW TO YOUR PROJECT DIRECTORY:***

```
DATABASE_URL=
AUTH_SECRET=
NEXT_PUBLIC_API_URL="http://localhost:3000"
NEXT_PUBLIC_GOOGLE_API_KEY=
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
NEXT_PUBLIC_CLOUDINARY_API_KEY=
NEXT_PUBLIC_CLOUDINARY_API_SECRET=
STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
```

### Main APIs Used:
  - **Google Maps:** Used for geocoding locations provided by users when creating events/posts
  - **Cloudinary:** CDN used for storing and serving user-uploaded images
  - **Stripe:** Used for payment processing for donations

### Usage Guide
1. Make sure you have Node.js, npm, and any Prisma compatible database (we used PostgreSQL) installed, preferably on a Linux environment (make sure your database is running!).
2. Download or clone this repo.
3. Create a .env file in the project directory, obtain the required API keys, and fill the .env file out as shown above.
4. Run ```npm install```, ```npx prisma migrate dev```, and ```npx prisma db seed``` in the project directory.
5. To start the project, run ```npm run dev``` in the project directory.
6. Navigate to ```http://localhost:3000``` in your web browser while the project is running to access the website.

## Example
<img width="1920" height="919" alt="example" src="https://github.com/user-attachments/assets/7bb588d1-c1fd-448c-be5d-e7122900258a" />
