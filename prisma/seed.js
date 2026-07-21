const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('password123', 10);

  // Use a fixed ID for the fellowship (so we can upsert by id)
  const fellowshipId = 'test-fellowship-id';

  const fellowship = await prisma.fellowship.upsert({
    where: { id: fellowshipId },
    update: {
      name: 'Test Fellowship',
      location: 'Lagos, Nigeria',
    },
    create: {
      id: fellowshipId,
      name: 'Test Fellowship',
      location: 'Lagos, Nigeria',
    },
  });

  // Use a fixed ID for the user (so we can upsert by id)
  const userId = 'test-user-id';

  await prisma.user.upsert({
    where: { id: userId },
    update: {
      churchId: 'FT0671NG',
      passwordHash: hashedPassword,
      email: 'testfl@fountain.com',
      fullName: 'John Fellowship Leader',
      role: 'FL',
      leading: { connect: { id: fellowship.id } },
    },
    create: {
      id: userId,
      churchId: 'FT0671NG',
      email: 'testfl@fountain.com',
      fullName: 'John Fellowship Leader',
      passwordHash: hashedPassword,
      role: 'FL',
      leading: { connect: { id: fellowship.id } },
    },
  });

  await prisma.member.createMany({
    data: [
      {
        fullName: 'Jane Smith',
        phone: '+2348012345678',
        qrUniqueId: 'MEMBER-001',
        fellowshipId: fellowship.id,
      },
      {
        fullName: 'Mike Johnson',
        phone: '+2348098765432',
        qrUniqueId: 'MEMBER-002',
        fellowshipId: fellowship.id,
      },
    ],
    skipDuplicates: true,
  });

  console.log('✅ Seed data updated successfully!');
  console.log('📋 Test credentials:');
  console.log('   Church ID: FT0671NG');
  console.log('   Password:  password123');
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });