"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const products = [
    {
        "title": "Aura Pro Wireless Headphones",
        "description": "Noise-cancelling over-ear headphones with 40-hour battery life and crystal-clear audio.",
        "price": 14999,
        "category": "Headphones",
        "quantity": 50,
        "imageUrl": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop"
    },
    {
        "title": "Zenith Z1 Pro Smartphone",
        "description": "A flagship smartphone with a 120Hz display, 108MP camera, and next-gen AI processor.",
        "price": 69999,
        "category": "Smartphones",
        "quantity": 30,
        "imageUrl": "https://images.unsplash.com/photo-1580910051074-3eb694886505?q=80&w=1965&auto=format&fit=crop"
    },
    {
        "title": "NovaBook Ultra Thin Laptop",
        "description": "An incredibly light and powerful laptop for professionals on the go. 16GB RAM, 1TB SSD.",
        "price": 129999,
        "category": "Laptops",
        "quantity": 20,
        "imageUrl": "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1926&auto=format&fit=crop"
    },
    {
        "title": "Chrono Series 5 Smartwatch",
        "description": "Track your fitness, notifications, and more with this sleek and stylish smartwatch.",
        "price": 24999,
        "category": "Smartwatches",
        "quantity": 75,
        "imageUrl": "https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=1964&auto=format&fit=crop"
    },
    {
        "title": "Orbit Gaming Mouse",
        "description": "High-precision wireless gaming mouse with customizable RGB lighting and 16,000 DPI sensor.",
        "price": 4999,
        "category": "Accessories",
        "quantity": 150,
        "imageUrl": "https://images.unsplash.com/photo-1615663249853-2d1b9a1286c0?q=80&w=1974&auto=format&fit=crop"
    },
    {
        "title": "SoundPod Mini Earbuds",
        "description": "True wireless earbuds with a compact charging case and immersive sound quality.",
        "price": 7999,
        "category": "Headphones",
        "quantity": 200,
        "imageUrl": "https://images.unsplash.com/photo-1606220588913-b3aaa16c47b4?q=80&w=2070&auto=format&fit=crop"
    },
    {
        "title": "Pixel Slate Graphics Tablet",
        "description": "A professional graphics tablet for digital artists and designers. 8192 levels of pressure sensitivity.",
        "price": 19999,
        "category": "Accessories",
        "quantity": 40,
        "imageUrl": "https://images.unsplash.com/photo-1622228519783-6223403a55e6?q=80&w=2070&auto=format&fit=crop"
    },
    {
        "title": "Apex Pro Mechanical Keyboard",
        "description": "A full-sized mechanical keyboard with customizable switches and per-key RGB backlighting.",
        "price": 11999,
        "category": "Accessories",
        "quantity": 60,
        "imageUrl": "https://images.unsplash.com/photo-1618384887924-2c8ab63a4c32?q=80&w=1964&auto=format&fit=crop"
    },
    {
        "title": "Nebula 15 Gaming Laptop",
        "description": "A high-performance gaming laptop with the latest GPU and a 144Hz high-refresh-rate screen.",
        "price": 179999,
        "category": "Laptops",
        "quantity": 15,
        "imageUrl": "https://images.unsplash.com/photo-1603302576837-37561b2e2302?q=80&w=2068&auto=format&fit=crop"
    },
    {
        "title": "Zenith Z1 Lite Smartphone",
        "description": "The budget-friendly version of our flagship, offering a premium experience at an affordable price.",
        "price": 29999,
        "category": "Smartphones",
        "quantity": 100,
        "imageUrl": "https://images.unsplash.com/photo-1567581935887-289502c25a08?q=80&w=1974&auto=format&fit=crop"
    },
    {
        "title": "Chrono SE Smartwatch",
        "description": "A stylish and lightweight smartwatch with essential fitness tracking and a vibrant display.",
        "price": 15999,
        "category": "Smartwatches",
        "quantity": 90,
        "imageUrl": "https://images.unsplash.com/photo-1579586337278-35d9addb318d?q=80&w=2070&auto=format&fit=crop"
    },
    {
        "title": "Aura Studio Headphones",
        "description": "Studio-grade wired headphones for audiophiles and music producers. Flat frequency response.",
        "price": 29999,
        "category": "Headphones",
        "quantity": 25,
        "imageUrl": "https://images.unsplash.com/photo-1545127398-14699f92334b?q=80&w=1974&auto=format&fit=crop"
    },
    {
        "title": "WorkPad Pro Laptop",
        "description": "A reliable and secure business laptop with a focus on productivity and all-day battery life.",
        "price": 99999,
        "category": "Laptops",
        "quantity": 35,
        "imageUrl": "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2071&auto=format&fit=crop"
    },
    {
        "title": "Zenith Fold Smartphone",
        "description": "Experience the future with our new foldable smartphone, combining a large tablet display with pocketable convenience.",
        "price": 149999,
        "category": "Smartphones",
        "quantity": 10,
        "imageUrl": "https://images.unsplash.com/photo-1610792516307-ea2acd0c4208?q=80&w=2070&auto=format&fit=crop"
    },
    {
        "title": "PowerHub 4-in-1 Charger",
        "description": "A compact and powerful charging hub for your laptop, phone, watch, and earbuds.",
        "price": 6999,
        "category": "Accessories",
        "quantity": 250,
        "imageUrl": "https://images.unsplash.com/photo-1588881947872-3518c7c936c9?q=80&w=2030&auto=format&fit=crop"
    }
];
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(`Start seeding ...`);
        for (const p of products) {
            const product = yield prisma.product.create({
                data: p,
            });
            console.log(`Created product with id: ${product.id}`);
        }
        console.log(`Seeding finished.`);
    });
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
}));
