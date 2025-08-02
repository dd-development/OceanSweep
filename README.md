<p align="center">
  <img width="250" height="250" alt="OceanSweep" src="https://github.com/user-attachments/assets/ab1773c2-4369-44ee-b33b-d5993112c1f4" />
</p>

# OceanSweep
Community platform for organizing and volunteering for local waterfront cleanup and fundraising events. Built using Next.js + React, Tailwind CSS, TypeScript, and PostgreSQL with Prisma.

## Overview and Credits
*OceanSweep* was designed and developed over the course of 15 weeks with a team of 4 people utilizing the Scrum Agile framework and Jira:

  - **dd-development (Myself):** Location-based functionalities (Leaflet/Google Maps implementation), about page, profile page, dashboard page, CDN implementation, events/posts creation and feeds, UI design,
                                 database queries/design/testing, seed data

  - **Onkar Dangi:** Signup/login/session management, donation page, resources page, about page, profile page, feedback page, dashboard page, CDN implementation, events/posts creation and feeds, UI design,
                     database queries and design

  - **Yurii Koval:** Signup/login, activity feed in side-navigation bar, about page, database design, refactoring, documentation

  - **Hristian Tountchev:** Project set-up, signup/login, dashboard page, about page, database design/testing, documentation

Each sprint was 1 week. We had daily Scrum meetings to discuss development progress and direction for specific objectives while forumlating plans for future sprints. We also incorporated techniques such as pair
programming and continuous integration/testing into our development cycle. We made any changes/additions on separate branches, created pull requests, and received code reviews from other group members prior to any merges to the main branch. This ensured all code was functional and the team was on the same page throughout the development process.

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

## Examples
<img width="1920" height="912" alt="example 1" src="https://github.com/user-attachments/assets/1a53ace3-f808-47f2-b74d-faafcfa382a7" />

<img width="1920" height="912" alt="example 2" src="https://github.com/user-attachments/assets/bba81d04-4c9c-4055-8441-4124823b65d3" />

<img width="1920" height="916" alt="example 3" src="https://github.com/user-attachments/assets/7b8b1c16-5133-44ef-9999-4300a2744504" />

<img width="1920" height="918" alt="example 4" src="https://github.com/user-attachments/assets/e63e10e5-50bd-4b46-af7f-dfe1e59fa979" />

<img width="1920" height="916" alt="example 5" src="https://github.com/user-attachments/assets/9b03f1e7-35d5-47c8-a8b6-4945b70b0609" />

<img width="1920" height="919" alt="example 6" src="https://github.com/user-attachments/assets/005006a5-eb3c-485e-afc2-8f16ce3b4e4e" />
