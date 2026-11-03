const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Seeding categories...');
  const categoryNames = [
    'Batik',
    'Tenun Ikat',
    'Kerajinan',
    'Aksesori',
    'Pakaian Adat',
    'Alat Musik',
    'Lainnya',
  ];

  const categories = {};
  for (const name of categoryNames) {
    const cat = await prisma.category.upsert({
      where: { name },
      update: {},
      create: { name },
    });
    categories[name] = cat.id;
  }
  console.log('Categories seeded:', Object.keys(categories));

  console.log('Seeding initial products...');
  const existingProduct = await prisma.product.findFirst({
    where: { name: 'Batik Solo' },
  });

  if (!existingProduct) {
    await prisma.product.create({
      data: {
        name: 'Batik Solo',
        categoryId: categories['Batik'],
        price: 1000000,
        stock: 25,
        sku: 'BTK-SOLO-001',
        description: 'Batik Solo kualitas prima dengan motif klasik nan elegan.',
        image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=600&auto=format&fit=crop',
      },
    });
    console.log('Product "Batik Solo" created with stock 25!');
  } else {
    await prisma.product.update({
      where: { id: existingProduct.id },
      data: { stock: 25 },
    });
    console.log('Product "Batik Solo" updated with stock 25!');
  }
}

main()
  .catch((e) => {
    console.error('Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
