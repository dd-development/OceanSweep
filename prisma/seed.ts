import { prisma } from "../app/lib/prisma";
import bcrypt from "bcryptjs";

async function main() {
  console.log("🌱 Seeding database...");

  // Hash passwords for users
  const hashedPasswords = await Promise.all([
    bcrypt.hash("password123", 10),
    bcrypt.hash("securepass456", 10),
    bcrypt.hash("testingpass789", 10),
    bcrypt.hash("strongpass000", 10),
    bcrypt.hash("randompass321", 10),
  ]);

  // Create Users
  const users = await Promise.all([
    prisma.users.create({
      data: {
        firstname: "John",
        lastname: "Doe",
        email: "johndoe@example.com",
        hashedpassword: hashedPasswords[0],
        zip: "10001",
        username: "johndoe",
        image: "user1_ykui9d",
        userrole: "VOLUNTEER",
        status: "ACTIVE",
        discardflag: "NO",
      },
    }),
    prisma.users.create({
      data: {
        firstname: "Jane",
        lastname: "Smith",
        email: "janesmith@example.com",
        hashedpassword: hashedPasswords[1],
        zip: "90210",
        username: "janesmith",
        image: "user2_mlkwcs",
        userrole: "EXPERT",
        status: "ACTIVE",
        discardflag: "NO",
      },
    }),
    prisma.users.create({
      data: {
        firstname: "Michael",
        lastname: "Jefferson",
        email: "michaeljefferson@example.com",
        hashedpassword: hashedPasswords[2],
        zip: "30301",
        username: "michaeljefferson",
        image: "user3_p0act0",
        userrole: "ORGANIZER",
        status: "ACTIVE",
        discardflag: "NO",
      },
    }),
    prisma.users.create({
      data: {
        firstname: "Emily",
        lastname: "Davis",
        email: "emilydavis@example.com",
        hashedpassword: hashedPasswords[3],
        zip: "60601",
        username: "emilydavis",
        image: "user4_boe3rf",
        userrole: "CONSULTANT",
        status: "ACTIVE",
        discardflag: "NO",
      },
    }),
    prisma.users.create({
      data: {
        firstname: "David",
        lastname: "Wilson",
        email: "davidwilson@example.com",
        hashedpassword: hashedPasswords[4],
        zip: "73301",
        username: "davidwilson",
        image: "user5_p3gpx4",
        userrole: "VOLUNTEER",
        status: "ACTIVE",
        discardflag: "NO",
      },
    }),
  ]);

  await prisma.events.create({ // Event 1 - Montrose Beach Cleanup
    data: {
      scheduleddate: new Date(`2025-05-08`),
      content: {
        create: {
          description: "Join the Chicago Beach CleanUp (CBCU) for a volunteer event focused on cleaning up Montrose Beach. Volunteers will help remove litter and debris to protect the local ecosystem and maintain the beauty of the beach. CBCU provides all necessary materials and guidance for participants. ",
          createdby: 1,
          address: "4400 N Lake Shore Dr",
          city: "Chicago",
          statecode: "IL",
          zip: "60640",
          latitude: 41.9610,
          longitude: -87.6380,
          image: `event1_el2izc`,
          status: "ACTIVE",
          discardflag: "NO",
          title: "Beach Cleanup at Montrose Beach",
          type: "EVENT",
        },
      },
    },
  });
  await prisma.events.create({ // Event 2 - Venice Beach Cleanup
    data: {
      scheduleddate: new Date(`2025-05-19`),
      content: {
        create: {
          description: "Join a collaborative effort to clean up Venice Beach, preventing marine debris and microplastics from entering our waterways. Volunteers will be provided with cleanup supplies, including gloves and bags. The event includes grounding practices, impact sorting, and community engagement activities.",
          createdby: 2,
          address: "Venice Beach & Fishing Pier",
          city: "Los Angeles",
          statecode: "CA",
          zip: "90292",
          latitude: 34.0046,
          longitude: -118.4732,
          image: `event2_tryesg`,
          status: "ACTIVE",
          discardflag: "NO",
          title: "Venice Beach Community Cleanup",
          type: "EVENT",
        },
      },
    },
  });
  await prisma.events.create({ // Event 3 - Lincoln Park Charity Run
    data: {
      scheduleddate: new Date(`2025-05-27`),
      content: {
        create: {
          description: "Join us for a charity run at the Lincoln Park Zoo hosted by the Chicago Environmental Network!",
          createdby: 3,
          address: "2001 N Clark St",
          city: "Chicago",
          statecode: "IL",
          zip: "60614",
          latitude: 41.91874007658602,
          longitude: -87.6353720752994,
          image: `event3_jdfyyu`,
          status: "ACTIVE",
          discardflag: "NO",
          title: "Lincoln Park Charity Run",
          type: "EVENT",
        },
      },
    },
  });
  await prisma.events.create({ // Event 4 - Sea Turtle Habitat Preservation Cleanup
    data: {
      scheduleddate: new Date(`2025-06-04`),
      content: {
        create: {
          description: "Participate in a beach cleanup event focused on removing litter and protecting sea turtle habitats. Volunteers will collect debris and learn about the importance of maintaining clean beaches.",
          createdby: 4,
          address: "3860 N Ocean Blvd",
          city: "Boca Raton",
          statecode: "FL",
          zip: "33431",
          latitude: 26.3912,
          longitude: -80.0650,
          image: `event4_pdlbk9`,
          status: "ACTIVE",
          discardflag: "NO",
          title: "Sea Turtle Habitat Preservation Cleanup at Ocean Reef Park",
          type: "EVENT",
        },
      },
    },
  });
  await prisma.events.create({ // Event 5 - Beach Cleanup at Woodlawn Beach State Park
    data: {
      scheduleddate: new Date(`2025-06-17`),
      content: {
        create: {
          description: "Join the American Littoral Society for a beach cleanup at Woodlawn Beach State Park. Volunteers will help remove trash and contribute to data collection efforts to support environmental conservation.",
          createdby: 5,
          address: "S-3580 Lakeshore Rd",
          city: "Blasdell",
          statecode: "NY",
          zip: "14219",
          latitude: 42.7902,
          longitude: -78.8503,
          image: `event5_c6t82s`,
          status: "ACTIVE",
          discardflag: "NO",
          title: "Beach Cleanup at Woodlawn Beach State Park",
          type: "EVENT",
        },
      },
    },
  });

  await prisma.post.create({ // Post 5: Seal Eating Plastic
    data: {
      content: {
        create: {
          description: "My friend took this photo of a monk seal at Wailea Beach in Maui. Please let this be a reminder not to leave your water bottles or other belongings/trash on the beach, as sea life often mistake plastic objects for food, and ingesting them can cause great harm. Let's all do better together.",
          createdby: 5,
          address: "Wailea Beach",
          city: "Maui",
          statecode: "HI",
          zip: "96753",
          image: `https://res.cloudinary.com/dd7uxdfui/image/upload/v1745545842/post5_sf9uer.jpg`, // USE URL SO CLICKABLE
          status: "ACTIVE",
          discardflag: "NO",
          title: "Seal Holding Plastic Water Bottle in Mouth in Maui",
          type: "POST",
        },
      },
    },
  });
  await prisma.post.create({ // Post 4: Gator in Trash Can
    data: {
      content: {
        create: {
          description: "Me and my cousin were cleaning up some trash near the pond by our house, and when we got back this absolutely massive gator came charging out of the grass near our porch. My cousin immediately grabbed our garbage can and trapped the thing, then we released it back into the pond. BE CAREFUL OUT THERE, ESPECIALLY IF YOU'RE WALKING YOUR DOGS NEAR THE WATER!!!",
          createdby: 4,
          address: "Fort Family Park",
          city: "Jacksonville",
          statecode: "FL",
          zip: "32256",
          image: `https://res.cloudinary.com/dd7uxdfui/image/upload/v1745545443/post4_evmdgj.jpg`,
          status: "ACTIVE",
          discardflag: "NO",
          title: "CAUGHT A GATOR IN A TRASH CAN IN JACKSONVILLE",
          type: "POST",
        },
      },
    },
  });
  await prisma.post.create({ // Post 3: Glass at South Haven Beach
    data: {
      content: {
        create: {
          description: "Please be careful, I almost stepped on this broken bottle right near the entrance of the beach 15 minutes ago. We tried to clean it up as best as we could but I'm not sure if we got it all. Can't believe someone would just leave a hazard like this.",
          createdby: 3,
          address: "South Beach",
          city: "South Haven",
          statecode: "MI",
          zip: "49090",
          image: `https://res.cloudinary.com/dd7uxdfui/image/upload/v1745544832/post3_d7q3hb.jpg`,
          status: "ACTIVE",
          discardflag: "NO",
          title: "Broken Glass in Sand at South Haven Beach",
          type: "POST",
        },
      },
    },
  });
  await prisma.post.create({ // Post 2: Lake Geneva Trash
    data: {
      content: {
        create: {
          description: "Hey guys, looks like a large group of people left a huge mess on the public beach last night (opposite side from the shops). I can't clean all of it up by myself, but I'll be here for another hour if anyone wants to come help out.",
          createdby: 2,
          address: "Lake Geneva Public Beach",
          city: "Lake Geneva",
          statecode: "WI",
          zip: "53147",
          image: `https://res.cloudinary.com/dd7uxdfui/image/upload/v1745543169/post2_jcfkuw.jpg`,
          status: "ACTIVE",
          discardflag: "NO",
          title: "Trash Left on Shore at Lake Geneva",
          type: "POST",
        },
      },
    },
  });
  await prisma.post.create({ // Post 1: Galveston Oil Spill
    data: {
      content: {
        create: {
          description: "A barge slammed into a bridge pillar in Galveston on Wednesday, spilling oil into surrounding waters and closing the only road to a smaller and separate island that is home to a university, officials said. There were no immediate reports of injuries, although officials said one person on the barge was knocked into the water and quickly rescued.",
          createdby: 1,
          address: "Pelican Island",
          city: "Galveston",
          statecode: "TX",
          zip: "77550",
          image: `https://res.cloudinary.com/dd7uxdfui/image/upload/v1745542536/post1_jgu2mz.jpg`,
          status: "ACTIVE",
          discardflag: "NO",
          title: "Barge hits bridge in Galveston, causing an oil spill",
          type: "POST",
        },
      },
    },
  });

  // Create Event Attendees (Users attending random events)
  const events = await prisma.events.findMany();
  for (const user of users) {
    for (let i = 0; i < 3; i++) {
      const randomEvent = events[Math.floor(Math.random() * events.length)];
      await prisma.eventAttendees.create({
        data: {
          eventId: randomEvent.id,
          userId: user.id,
        },
      });
    }
  }

  console.log("✅ Seeding complete!");
}

main()
  .catch((e) => {
    console.error("❌ Error seeding the database", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
