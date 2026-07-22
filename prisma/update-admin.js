// prisma/update-admin.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Update the user with churchId 'FT0671NG' to ADMIN role
  const user = await prisma.user.update({
    where: { churchId: 'FT0671NG' },
    data: { role: 'ADMIN' },
  });
  console.log(`✅ User ${user.fullName} (${user.churchId}) is now ADMIN`);
}

main()
  .catch((e) => {
    console.error('❌ Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });