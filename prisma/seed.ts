import { hashPassword } from "@/lib/auth";
import { db } from "@/lib/db";


const habits = ['Meditating', 'Studying', 'Praying', 'Exercising', 'Cleaning','Reading']


async function main() {
  const user = await db.user.upsert({
    where: { email: "user@email.com" },
    update: {},
    create: {
      email: "user@email.com",
      firstName: "User",
      lastName: "Person",
      password: await hashPassword('password'),
      clusters: {
        create: new Array(5).fill(1).map((_, i) => ({
          name: `Project ${i}`,
          habits: {
            create:  new Array(Math.floor(Math.random() * habits.length)).fill(1).map((_, i) => ({
              name: habits[Math.floor(Math.random() * habits.length)],
              habitsInstance: {
                create: new Array(10).fill({status: false})
              }
            })),
          },
        })),
      }
      
    },
    include: {
      clusters: true,
    },
  });


}
main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
