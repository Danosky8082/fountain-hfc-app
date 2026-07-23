const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // 1. Get all fellowships
  const fellowships = await prisma.fellowship.findMany({
    orderBy: { createdAt: 'asc' },
  });

  // 2. Group by name (case-insensitive)
  const seen = new Map();
  const toDelete = [];

  for (const f of fellowships) {
    const key = f.name.toLowerCase().trim();
    if (seen.has(key)) {
      // Keep the first one, mark this for deletion
      toDelete.push(f.id);
    } else {
      seen.set(key, f.id);
    }
  }

  if (toDelete.length === 0) {
    console.log('✅ No duplicate fellowships found.');
    return;
  }

  console.log(`Found ${toDelete.length} duplicate fellowship(s) to delete.`);

  // 3. Delete duplicates (they have no members? If they do, we need to handle)
  // Option A: Hard delete (if they have no members/attendance)
  // Option B: Soft delete (set isActive? – but we don't have that field on Fellowship)
  // We'll hard delete, but first check if they have members.

  for (const id of toDelete) {
    const members = await prisma.member.count({ where: { fellowshipId: id } });
    if (members > 0) {
      console.warn(`⚠️ Fellowship ${id} has ${members} members. Skipping.`);
      continue;
    }
    await prisma.fellowship.delete({ where: { id } });
    console.log(`✅ Deleted fellowship ${id}`);
  }

  console.log('🎉 Cleanup complete.');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());