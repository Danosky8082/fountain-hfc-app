const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.user.update({
    where: { churchId: 'FT0671NG' },
    data: { role: 'ADMIN' },
  });
  console.log('✅ User FT0671NG is now ADMIN');
}

main().finally(async () => {
  await prisma.$disconnect();
});