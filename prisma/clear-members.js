const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // 1. Delete all attendance records first (to avoid foreign key errors)
  await prisma.attendanceRecord.deleteMany({});
  console.log('✅ Deleted all attendance records');

  // 2. Delete all members
  await prisma.member.deleteMany({});
  console.log('✅ Deleted all members');
}

main()
  .catch((e) => {
    console.error('❌ Error:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());