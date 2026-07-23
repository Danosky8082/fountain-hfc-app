const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('🧹 Starting database cleanup...');

  // 1. Delete attendance records (must delete first due to foreign key)
  await prisma.attendanceRecord.deleteMany({});
  console.log('✅ Deleted AttendanceRecords');

  // 2. Delete members
  await prisma.member.deleteMany({});
  console.log('✅ Deleted Members');

  // 3. Delete monthly reports
  await prisma.monthlyReport.deleteMany({});
  console.log('✅ Deleted MonthlyReports');

  // 4. Delete OTPs
  await prisma.oTP.deleteMany({});
  console.log('✅ Deleted OTPs');

  // 5. Delete attendance sessions
  await prisma.attendanceSession.deleteMany({});
  console.log('✅ Deleted AttendanceSessions');

  // (Optional) Delete fellowships? Uncomment if needed
  // await prisma.fellowship.deleteMany({});
  // console.log('✅ Deleted Fellowships');

  console.log('🎉 Cleanup complete! All data (except users and fellowships) removed.');
}

main()
  .catch((e) => {
    console.error('❌ Error:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());