import { Event, PrismaClient } from '@prisma/client'

export const db = new PrismaClient()

async function main() {
  // ... you will write your Prisma Client queries here
  //const allUsers = await db.user.findMany();
  //console.log(allUsers);
}

main()
  .then(async () => {
    await db.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await db.$disconnect()
    process.exit(1)
  })

  async function saveEvent(event: Event){
      db.event.create({
        data: event
      });
  }

  export {saveEvent}