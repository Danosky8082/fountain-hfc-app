const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const updated = await prisma.user.update({
    where: { churchId: 'FT0671NG' },
    data: { email: 'dcmitch2000ng@gmail.com' },
  });
  console.log('✅ Updated:', updated.churchId, '->', updated.email);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());