// prisma/seed.js
const prisma = require('../src/prisma'); // Use shared instance with adapter
const bcrypt = require('bcryptjs');

async function main() {
  // 1. Hash password
  const hashedPassword = await bcrypt.hash('password123', 10);

  // 2. Create or get the fellowship
  const fellowship = await prisma.fellowship.upsert({
    where: { name: 'Test Fellowship' },
    update: {},
    create: {
      name: 'Test Fellowship',
      location: 'Lagos, Nigeria',
    },
  });

  // 3. Create or update the user
  const user = await prisma.user.upsert({
    where: { churchId: 'FT0671NG' },
    update: {
      passwordHash: hashedPassword,
      email: 'testfl@fountain.com',
      fullName: 'John Fellowship Leader',
      role: 'FL',
    },
    create: {
      churchId: 'FT0671NG',
      email: 'testfl@fountain.com',
      fullName: 'John Fellowship Leader',
      passwordHash: hashedPassword,
      role: 'FL',
    },
  });

  // 4. Update the fellowship to set leader to this user
  //    First, disconnect any existing leader (avoids unique constraint violation)
  await prisma.fellowship.update({
    where: { id: fellowship.id },
    data: {
      leader: {
        disconnect: true, // removes any existing leader relation
      },
    },
  });

  //    Then connect the user as leader
  await prisma.fellowship.update({
    where: { id: fellowship.id },
    data: {
      leader: {
        connect: { id: user.id },
      },
    },
  });

  // 5. Create sample members (skip duplicates)
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