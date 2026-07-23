const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

const ADMIN_CHURCH_ID = 'FT0772NG';
const ADMIN_PASSWORD = 'admin123';

async function main() {
  console.log('🧹 Keeping only admin user...');

  // 1. Delete all OTPs (to avoid foreign key errors)
  console.log('🗑️ Deleting all OTPs...');
  await prisma.oTP.deleteMany({});
  console.log('✅ OTPs deleted.');

  // 2. Delete all users except the admin
  console.log('🗑️ Deleting all users except admin...');
  const deleted = await prisma.user.deleteMany({
    where: {
      churchId: { not: ADMIN_CHURCH_ID },
    },
  });
  console.log(`✅ Deleted ${deleted.count} user(s)`);

  // 3. Ensure admin exists and has correct role/password
  console.log('👤 Ensuring admin user...');
  const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10);
  const admin = await prisma.user.upsert({
    where: { churchId: ADMIN_CHURCH_ID },
    update: {
      passwordHash: hashedPassword,
      role: 'ADMIN',
      leading: { disconnect: true },
      assisting: { disconnect: true },
    },
    create: {
      churchId: ADMIN_CHURCH_ID,
      email: 'admin@yourchurch.com',
      fullName: 'System Administrator',
      passwordHash: hashedPassword,
      role: 'ADMIN',
    },
  });

  console.log(`👤 Admin ${admin.churchId} is set with role ${admin.role}`);
  console.log(`🔑 Password: ${ADMIN_PASSWORD}`);
  console.log('🎉 Done.');
}

main()
  .catch((e) => {
    console.error('❌ Error:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());