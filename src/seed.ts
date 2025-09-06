import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const products = [
  {
    "title": "Aura Pro Wireless Headphones",
    "description": "Noise-cancelling over-ear headphones with 40-hour battery life and crystal-clear audio.",
    "price": 14999,
    "category": "Headphones",
    "quantity": 50,
    "imageUrl": "https://placehold.co/600x400/1a1a1a/ffffff?text=Aura+Pro"
  },
  {
    "title": "Zenith Z1 Pro Smartphone",
    "description": "A flagship smartphone with a 120Hz display, 108MP camera, and next-gen AI processor.",
    "price": 69999,
    "category": "Smartphones",
    "quantity": 30,
    "imageUrl": "https://placehold.co/600x400/1a1a1a/ffffff?text=Zenith+Z1+Pro"
  },
  {
    "title": "NovaBook Ultra Thin Laptop",
    "description": "An incredibly light and powerful laptop for professionals on the go. 16GB RAM, 1TB SSD.",
    "price": 129999,
    "category": "Laptops",
    "quantity": 20,
    "imageUrl": "https://placehold.co/600x400/1a1a1a/ffffff?text=NovaBook+Ultra"
  },
  {
    "title": "Chrono Series 5 Smartwatch",
    "description": "Track your fitness, notifications, and more with this sleek and stylish smartwatch.",
    "price": 24999,
    "category": "Smartwatches",
    "quantity": 75,
    "imageUrl": "https://placehold.co/600x400/1a1a1a/ffffff?text=Chrono+5"
  },
  {
    "title": "Orbit Gaming Mouse",
    "description": "High-precision wireless gaming mouse with customizable RGB lighting and 16,000 DPI sensor.",
    "price": 4999,
    "category": "Accessories",
    "quantity": 150,
    "imageUrl": "https://placehold.co/600x400/1a1a1a/ffffff?text=Orbit+Mouse"
  },
  {
    "title": "SoundPod Mini Earbuds",
    "description": "True wireless earbuds with a compact charging case and immersive sound quality.",
    "price": 7999,
    "category": "Headphones",
    "quantity": 200,
    "imageUrl": "https://placehold.co/600x400/1a1a1a/ffffff?text=SoundPod+Mini"
  },
  {
    "title": "Pixel Slate Graphics Tablet",
    "description": "A professional graphics tablet for digital artists and designers. 8192 levels of pressure sensitivity.",
    "price": 19999,
    "category": "Accessories",
    "quantity": 40,
    "imageUrl": "https://placehold.co/600x400/1a1a1a/ffffff?text=Pixel+Slate"
  },
  {
    "title": "Apex Pro Mechanical Keyboard",
    "description": "A full-sized mechanical keyboard with customizable switches and per-key RGB backlighting.",
    "price": 11999,
    "category": "Accessories",
    "quantity": 60,
    "imageUrl": "https://placehold.co/600x400/1a1a1a/ffffff?text=Apex+Pro"
  },
  {
    "title": "Nebula 15 Gaming Laptop",
    "description": "A high-performance gaming laptop with the latest GPU and a 144Hz high-refresh-rate screen.",
    "price": 179999,
    "category": "Laptops",
    "quantity": 15,
    "imageUrl": "https://placehold.co/600x400/1a1a1a/ffffff?text=Nebula+15"
  },
  {
    "title": "Zenith Z1 Lite Smartphone",
    "description": "The budget-friendly version of our flagship, offering a premium experience at an affordable price.",
    "price": 29999,
    "category": "Smartphones",
    "quantity": 100,
    "imageUrl": "https://placehold.co/600x400/1a1a1a/ffffff?text=Zenith+Z1+Lite"
  },
  {
    "title": "Chrono SE Smartwatch",
    "description": "A stylish and lightweight smartwatch with essential fitness tracking and a vibrant display.",
    "price": 15999,
    "category": "Smartwatches",
    "quantity": 90,
    "imageUrl": "https://placehold.co/600x400/1a1a1a/ffffff?text=Chrono+SE"
  },
  {
    "title": "Aura Studio Headphones",
    "description": "Studio-grade wired headphones for audiophiles and music producers. Flat frequency response.",
    "price": 29999,
    "category": "Headphones",
    "quantity": 25,
    "imageUrl": "https://placehold.co/600x400/1a1a1a/ffffff?text=Aura+Studio"
  },
  {
    "title": "WorkPad Pro Laptop",
    "description": "A reliable and secure business laptop with a focus on productivity and all-day battery life.",
    "price": 99999,
    "category": "Laptops",
    "quantity": 35,
    "imageUrl": "https://placehold.co/600x400/1a1a1a/ffffff?text=WorkPad+Pro"
  },
  {
    "title": "Zenith Fold Smartphone",
    "description": "Experience the future with our new foldable smartphone, combining a large tablet display with pocketable convenience.",
    "price": 149999,
    "category": "Smartphones",
    "quantity": 10,
    "imageUrl": "https://placehold.co/600x400/1a1a1a/ffffff?text=Zenith+Fold"
  },
  {
    "title": "PowerHub 4-in-1 Charger",
    "description": "A compact and powerful charging hub for your laptop, phone, watch, and earbuds.",
    "price": 6999,
    "category": "Accessories",
    "quantity": 250,
    "imageUrl": "https://placehold.co/600x400/1a1a1a/ffffff?text=PowerHub"
  }
]

async function main() {
  console.log(`Start seeding ...`)
  for (const p of products) {
    const product = await prisma.product.create({
      data: p,
    })
    console.log(`Created product with id: ${product.id}`)
  }
  console.log(`Seeding finished.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })