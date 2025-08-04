<p align="center">
  <img width="250" height="250" alt="OceanSweep" src="https://github.com/user-attachments/assets/6492d28b-3db4-47d3-8bac-0591c9e6f6ea" />
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
<img width="1920" height="912" alt="example 1" src="https://github.com/user-attachments/assets/78bc87c2-77ef-464e-a042-6a74dbac7555" />

<img width="1920" height="912" alt="example 2" src="https://github.com/user-attachments/assets/2b2838de-aaf9-4700-9b6d-e0cab4937ab5" />

<img width="1920" height="916" alt="example 3" src="https://github.com/user-attachments/assets/59474238-3e05-4b63-b7e3-5cbbfbdb9e0c" />

<img width="1920" height="918" alt="example 4" src="https://github.com/user-attachments/assets/02f25687-7877-4b0a-a738-e1e7482079b4" />

<img width="1920" height="916" alt="example 5" src="https://github.com/user-attachments/assets/d9fb0fdd-0a06-49d5-ac4a-40f2b4f3b3e7" />

<img width="1920" height="919" alt="example 6" src="https://github.com/user-attachments/assets/f70fee30-8f8d-46e8-838d-5fae44541442" />
