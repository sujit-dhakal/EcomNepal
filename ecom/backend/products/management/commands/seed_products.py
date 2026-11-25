from decimal import Decimal
from pathlib import Path
from xml.sax.saxutils import escape

from django.conf import settings
from django.core.management.base import BaseCommand
from django.db import transaction
from django.utils.text import slugify

from products.models import Category, Product


CATALOG = (
    {
        "category": "Electronics",
        "name": "Wireless Headphones",
        "image": "images/wireless-headphones.svg",
        "description": "Comfortable over-ear wireless headphones with clear sound and a long-lasting battery.",
        "price": "79.99",
        "stock": 25,
        "tags": ("audio", "headphones", "electronics", "bestselling"),
    },
    {
        "category": "Electronics",
        "name": "Smart Watch",
        "image": "images/smart-watch.svg",
        "description": "A lightweight smart watch for notifications, activity tracking, and everyday timekeeping.",
        "price": "129.99",
        "stock": 18,
        "tags": ("wearable", "fitness", "electronics", "bestselling"),
    },
    {
        "category": "Electronics",
        "name": "USB-C Fast Charger",
        "image": "images/usb-c-fast-charger.svg",
        "description": "Compact fast charger with USB-C power delivery for phones, tablets, and other devices.",
        "price": "24.99",
        "stock": 40,
        "tags": ("charger", "usb-c", "accessories", "latest"),
    },
    {
        "category": "Electronics",
        "name": "Portable Bluetooth Speaker",
        "image": "images/portable-bluetooth-speaker.svg",
        "description": "Portable Bluetooth speaker with rich sound for home, travel, and outdoor listening.",
        "price": "54.99",
        "stock": 22,
        "tags": ("audio", "bluetooth", "speaker", "bestselling"),
    },
    {
        "category": "Fashion",
        "name": "Classic Cotton T-Shirt",
        "image": "images/classic-cotton-tshirt.svg",
        "description": "Soft everyday cotton t-shirt with a comfortable regular fit and easy-care fabric.",
        "price": "19.99",
        "stock": 60,
        "tags": ("clothing", "cotton", "fashion"),
    },
    {
        "category": "Fashion",
        "name": "Running Sneakers",
        "image": "images/running-sneakers.svg",
        "description": "Lightweight running sneakers with cushioned support for walks, workouts, and daily use.",
        "price": "64.99",
        "stock": 30,
        "tags": ("shoes", "running", "fashion", "bestselling"),
    },
    {
        "category": "Fashion",
        "name": "Canvas Backpack",
        "image": "images/canvas-backpack.svg",
        "description": "Durable canvas backpack with a padded laptop compartment and practical storage pockets.",
        "price": "39.99",
        "stock": 35,
        "tags": ("bag", "backpack", "travel", "latest"),
    },
    {
        "category": "Fashion",
        "name": "Denim Jacket",
        "image": "images/denim-jacket.svg",
        "description": "Versatile denim jacket designed for comfortable layering across the seasons.",
        "price": "89.99",
        "stock": 16,
        "tags": ("clothing", "denim", "jacket"),
    },
    {
        "category": "Home & Living",
        "name": "Insulated Water Bottle",
        "image": "images/insulated-water-bottle.svg",
        "description": "Reusable insulated bottle that keeps drinks cold or warm throughout the day.",
        "price": "22.50",
        "stock": 45,
        "tags": ("kitchen", "bottle", "reusable"),
    },
    {
        "category": "Home & Living",
        "name": "LED Desk Lamp",
        "image": "images/led-desk-lamp.svg",
        "description": "Adjustable LED desk lamp with bright, comfortable light for study and work spaces.",
        "price": "34.99",
        "stock": 20,
        "tags": ("home", "lighting", "office"),
    },
    {
        "category": "Home & Living",
        "name": "Ceramic Coffee Mug",
        "image": "images/ceramic-coffee-mug.svg",
        "description": "Simple ceramic coffee mug for tea, coffee, and everyday drinks at home or work.",
        "price": "12.99",
        "stock": 50,
        "tags": ("kitchen", "mug", "home"),
    },
    {
        "category": "Beauty & Personal Care",
        "name": "Herbal Face Wash",
        "image": "images/herbal-face-wash.svg",
        "description": "Gentle daily face wash made to remove dirt and excess oil without drying the skin.",
        "price": "14.99",
        "stock": 32,
        "tags": ("beauty", "skincare", "face-wash"),
    },
    {
        "category": "Beauty & Personal Care",
        "name": "Aloe Vera Moisturizer",
        "image": "images/aloe-vera-moisturizer.svg",
        "description": "Lightweight aloe vera moisturizer for fresh, hydrated skin throughout the day.",
        "price": "18.99",
        "stock": 28,
        "tags": ("beauty", "skincare", "moisturizer", "latest"),
    },
    {
        "category": "Sports & Outdoors",
        "name": "Yoga Mat",
        "image": "images/yoga-mat.svg",
        "description": "Non-slip exercise mat with comfortable cushioning for yoga, stretching, and home workouts.",
        "price": "29.99",
        "stock": 24,
        "tags": ("fitness", "yoga", "sports"),
    },
    {
        "category": "Sports & Outdoors",
        "name": "Training Football",
        "image": "images/training-football.svg",
        "description": "Durable training football suitable for recreational games, practice, and outdoor play.",
        "price": "24.99",
        "stock": 26,
        "tags": ("sports", "football", "outdoors", "latest"),
    },
)


def catalog_item(
    *,
    category,
    name,
    description,
    price,
    stock,
    tags,
    art_style,
    art_color,
    bestselling=False,
):
    item_tags = list(tags)
    if "latest" not in item_tags:
        item_tags.append("latest")
    if bestselling:
        item_tags.append("bestselling")
    return {
        "category": category,
        "name": name,
        "image": f"images/{slugify(name)}.svg",
        "description": description,
        "price": price,
        "stock": stock,
        "tags": tuple(item_tags),
        "art_style": art_style,
        "art_color": art_color,
    }


ADDITIONAL_CATALOG = (
    catalog_item(
        category="Electronics",
        name="4K Action Camera",
        description="Compact action camera with stabilized 4K video for travel, sports, and everyday adventures.",
        price="149.99",
        stock=14,
        tags=("camera", "video", "travel"),
        art_style="camera",
        art_color="#2563eb",
        bestselling=True,
    ),
    catalog_item(
        category="Electronics",
        name="Mechanical Keyboard",
        description="Responsive mechanical keyboard with tactile switches, bright backlighting, and a durable frame.",
        price="69.99",
        stock=21,
        tags=("keyboard", "computer", "office"),
        art_style="keyboard",
        art_color="#7c3aed",
        bestselling=True,
    ),
    catalog_item(
        category="Electronics",
        name="Wireless Charging Pad",
        description="Slim wireless charging pad for compatible phones, earbuds, and other everyday devices.",
        price="29.99",
        stock=34,
        tags=("charger", "wireless", "accessories"),
        art_style="charging-pad",
        art_color="#0891b2",
    ),
    catalog_item(
        category="Electronics",
        name="Portable Power Bank",
        description="High-capacity portable power bank with dual USB outputs for dependable charging on the go.",
        price="44.99",
        stock=27,
        tags=("power-bank", "battery", "travel"),
        art_style="power-bank",
        art_color="#0f766e",
    ),
    catalog_item(
        category="Electronics",
        name="Mini Projector",
        description="Portable mini projector for movie nights, presentations, and compact home entertainment.",
        price="189.99",
        stock=9,
        tags=("projector", "entertainment", "home"),
        art_style="projector",
        art_color="#be123c",
        bestselling=True,
    ),
    catalog_item(
        category="Fashion",
        name="Linen Summer Shirt",
        description="Breathable linen shirt with a relaxed fit for warm days, holidays, and casual evenings.",
        price="34.99",
        stock=38,
        tags=("shirt", "linen", "summer"),
        art_style="shirt",
        art_color="#ea580c",
        bestselling=True,
    ),
    catalog_item(
        category="Fashion",
        name="Leather Wallet",
        description="Slim genuine leather wallet with organized card slots and a secure cash compartment.",
        price="29.99",
        stock=29,
        tags=("wallet", "leather", "accessories"),
        art_style="wallet",
        art_color="#92400e",
    ),
    catalog_item(
        category="Fashion",
        name="Baseball Cap",
        description="Adjustable cotton baseball cap with a curved brim for comfortable everyday sun protection.",
        price="16.99",
        stock=42,
        tags=("cap", "cotton", "accessories"),
        art_style="cap",
        art_color="#1d4ed8",
    ),
    catalog_item(
        category="Fashion",
        name="Wool Scarf",
        description="Soft woven wool scarf that adds warmth and an easy layer to cool-weather outfits.",
        price="27.99",
        stock=24,
        tags=("scarf", "wool", "winter"),
        art_style="scarf",
        art_color="#c2410c",
    ),
    catalog_item(
        category="Fashion",
        name="Polarized Sunglasses",
        description="Classic polarized sunglasses with UV protection and comfortable lightweight frames.",
        price="39.99",
        stock=31,
        tags=("sunglasses", "eyewear", "summer"),
        art_style="sunglasses",
        art_color="#0f172a",
        bestselling=True,
    ),
    catalog_item(
        category="Home & Living",
        name="Memory Foam Pillow",
        description="Supportive memory foam pillow shaped for comfortable sleep and balanced neck alignment.",
        price="31.99",
        stock=23,
        tags=("pillow", "bedroom", "sleep"),
        art_style="pillow",
        art_color="#6366f1",
    ),
    catalog_item(
        category="Home & Living",
        name="Bamboo Cutting Board",
        description="Durable bamboo cutting board with a smooth food-safe surface and easy-grip edges.",
        price="21.99",
        stock=36,
        tags=("kitchen", "bamboo", "cooking"),
        art_style="cutting-board",
        art_color="#a16207",
    ),
    catalog_item(
        category="Home & Living",
        name="Indoor Planter",
        description="Modern indoor planter with a drainage tray for herbs, flowers, and small houseplants.",
        price="18.99",
        stock=30,
        tags=("planter", "plants", "decor"),
        art_style="planter",
        art_color="#15803d",
    ),
    catalog_item(
        category="Home & Living",
        name="Scented Soy Candle",
        description="Hand-poured soy candle with a gentle botanical scent for a warm, relaxing room atmosphere.",
        price="15.99",
        stock=44,
        tags=("candle", "decor", "relaxation"),
        art_style="candle",
        art_color="#a21caf",
    ),
    catalog_item(
        category="Home & Living",
        name="Woven Storage Basket",
        description="Flexible woven storage basket for blankets, toys, laundry, and tidy everyday organization.",
        price="26.99",
        stock=19,
        tags=("storage", "basket", "organization"),
        art_style="basket",
        art_color="#b45309",
    ),
    catalog_item(
        category="Beauty & Personal Care",
        name="Vitamin C Serum",
        description="Lightweight vitamin C face serum formulated for a bright, fresh-looking daily skincare routine.",
        price="22.99",
        stock=26,
        tags=("beauty", "skincare", "serum"),
        art_style="serum",
        art_color="#f59e0b",
        bestselling=True,
    ),
    catalog_item(
        category="Beauty & Personal Care",
        name="Bamboo Hair Brush",
        description="Gentle bamboo hair brush with smooth rounded pins for comfortable everyday detangling.",
        price="13.99",
        stock=33,
        tags=("beauty", "hair-care", "bamboo"),
        art_style="hair-brush",
        art_color="#65a30d",
    ),
    catalog_item(
        category="Beauty & Personal Care",
        name="Lavender Body Lotion",
        description="Moisturizing body lotion with a soft lavender scent for smooth, comfortable skin.",
        price="17.99",
        stock=35,
        tags=("beauty", "body-care", "lavender"),
        art_style="lotion",
        art_color="#9333ea",
    ),
    catalog_item(
        category="Beauty & Personal Care",
        name="Mineral Sunscreen",
        description="Daily mineral sunscreen with broad-spectrum protection and a lightweight, comfortable finish.",
        price="19.99",
        stock=28,
        tags=("beauty", "skincare", "sun-care"),
        art_style="sunscreen",
        art_color="#0284c7",
    ),
    catalog_item(
        category="Beauty & Personal Care",
        name="Travel Grooming Kit",
        description="Compact grooming kit with practical essentials for organized trips and everyday care.",
        price="32.99",
        stock=17,
        tags=("beauty", "grooming", "travel"),
        art_style="grooming-kit",
        art_color="#334155",
    ),
    catalog_item(
        category="Sports & Outdoors",
        name="Resistance Bands Set",
        description="Five-level resistance bands set for strength training, stretching, and convenient home workouts.",
        price="25.99",
        stock=41,
        tags=("fitness", "training", "bands"),
        art_style="resistance-bands",
        art_color="#dc2626",
        bestselling=True,
    ),
    catalog_item(
        category="Sports & Outdoors",
        name="Hiking Daypack",
        description="Lightweight hiking daypack with hydration storage and comfortable adjustable shoulder straps.",
        price="49.99",
        stock=18,
        tags=("hiking", "backpack", "outdoors"),
        art_style="hiking-pack",
        art_color="#166534",
    ),
    catalog_item(
        category="Sports & Outdoors",
        name="Stainless Steel Sports Flask",
        description="Rugged stainless steel flask that keeps water cold during workouts, hikes, and outdoor trips.",
        price="23.99",
        stock=37,
        tags=("sports", "flask", "hydration"),
        art_style="sports-flask",
        art_color="#0369a1",
    ),
    catalog_item(
        category="Sports & Outdoors",
        name="Speed Jump Rope",
        description="Adjustable speed jump rope with smooth bearings for cardio sessions and interval training.",
        price="14.99",
        stock=45,
        tags=("fitness", "cardio", "jump-rope"),
        art_style="jump-rope",
        art_color="#db2777",
    ),
    catalog_item(
        category="Sports & Outdoors",
        name="Rechargeable Camping Lantern",
        description="Bright rechargeable camping lantern with multiple light modes for tents, patios, and emergencies.",
        price="28.99",
        stock=22,
        tags=("camping", "lighting", "outdoors"),
        art_style="camping-lantern",
        art_color="#ca8a04",
    ),
    catalog_item(
        category="Grocery & Food",
        name="Himalayan Green Tea",
        description="Fragrant loose-leaf green tea selected for a clean, refreshing cup at home or work.",
        price="11.99",
        stock=48,
        tags=("tea", "beverages", "grocery"),
        art_style="tea-pack",
        art_color="#15803d",
    ),
    catalog_item(
        category="Grocery & Food",
        name="Organic Coffee Beans",
        description="Fresh roasted organic coffee beans with a balanced aroma for a rich morning brew.",
        price="16.99",
        stock=39,
        tags=("coffee", "beverages", "organic"),
        art_style="coffee-pack",
        art_color="#78350f",
        bestselling=True,
    ),
    catalog_item(
        category="Grocery & Food",
        name="Raw Himalayan Honey",
        description="Naturally sweet raw honey with a smooth texture for tea, breakfast, baking, and snacks.",
        price="13.99",
        stock=32,
        tags=("honey", "natural", "grocery"),
        art_style="honey-jar",
        art_color="#d97706",
    ),
    catalog_item(
        category="Grocery & Food",
        name="Roasted Almonds",
        description="Crunchy roasted almonds packed as a wholesome snack for home, office, or travel.",
        price="9.99",
        stock=54,
        tags=("snacks", "almonds", "grocery"),
        art_style="snack-pack",
        art_color="#a16207",
    ),
    catalog_item(
        category="Grocery & Food",
        name="Dark Chocolate Bar",
        description="Rich dark chocolate bar made for a satisfying treat with coffee, tea, or dessert.",
        price="5.99",
        stock=65,
        tags=("chocolate", "snacks", "grocery"),
        art_style="chocolate-bar",
        art_color="#7f1d1d",
    ),
    catalog_item(
        category="Books & Stationery",
        name="Daily Planner Notebook",
        description="Structured daily planner notebook with space for priorities, notes, schedules, and habits.",
        price="12.99",
        stock=46,
        tags=("stationery", "planner", "office"),
        art_style="planner",
        art_color="#4f46e5",
    ),
    catalog_item(
        category="Books & Stationery",
        name="Hardcover Sketchbook",
        description="Heavyweight-paper sketchbook with a durable cover for drawing, design, and creative practice.",
        price="15.99",
        stock=29,
        tags=("stationery", "sketchbook", "art"),
        art_style="sketchbook",
        art_color="#ea580c",
    ),
    catalog_item(
        category="Books & Stationery",
        name="Gel Pen Set",
        description="Smooth-writing gel pen set with colorful ink for notes, journaling, and creative projects.",
        price="8.99",
        stock=58,
        tags=("stationery", "pens", "office"),
        art_style="gel-pens",
        art_color="#2563eb",
    ),
    catalog_item(
        category="Books & Stationery",
        name="Desktop Organizer",
        description="Compact desktop organizer with sections for pens, cards, clips, and everyday work essentials.",
        price="17.99",
        stock=25,
        tags=("stationery", "organization", "office"),
        art_style="desk-organizer",
        art_color="#475569",
    ),
    catalog_item(
        category="Books & Stationery",
        name="Inspirational Journal",
        description="Lined journal with a calm, durable cover for reflections, goals, gratitude, and ideas.",
        price="10.99",
        stock=43,
        tags=("stationery", "journal", "writing"),
        art_style="journal",
        art_color="#be185d",
    ),
    catalog_item(
        category="Toys & Games",
        name="Building Blocks Set",
        description="Colorful building blocks set that encourages creative construction and hands-on play.",
        price="24.99",
        stock=31,
        tags=("toys", "building", "family"),
        art_style="building-blocks",
        art_color="#dc2626",
        bestselling=True,
    ),
    catalog_item(
        category="Toys & Games",
        name="Wooden Puzzle Board",
        description="Colorful wooden puzzle board designed for focused play, problem solving, and family time.",
        price="18.99",
        stock=27,
        tags=("toys", "puzzle", "wooden"),
        art_style="puzzle",
        art_color="#7c3aed",
    ),
    catalog_item(
        category="Toys & Games",
        name="Remote Control Car",
        description="Fast remote control car with responsive steering for exciting indoor and outdoor play.",
        price="36.99",
        stock=20,
        tags=("toys", "remote-control", "cars"),
        art_style="toy-car",
        art_color="#0284c7",
    ),
    catalog_item(
        category="Toys & Games",
        name="Plush Teddy Bear",
        description="Soft plush teddy bear made as a cuddly companion for children, gifts, and cozy rooms.",
        price="21.99",
        stock=33,
        tags=("toys", "plush", "gifts"),
        art_style="teddy-bear",
        art_color="#92400e",
    ),
    catalog_item(
        category="Toys & Games",
        name="Strategy Card Game",
        description="Easy-to-learn strategy card game for friendly competition, game nights, and family fun.",
        price="14.99",
        stock=40,
        tags=("games", "cards", "family"),
        art_style="card-game",
        art_color="#be123c",
    ),
    catalog_item(
        category="Automotive & Accessories",
        name="Car Phone Mount",
        description="Secure dashboard phone mount with adjustable viewing angles for safer navigation on the road.",
        price="19.99",
        stock=36,
        tags=("automotive", "phone", "accessories"),
        art_style="phone-mount",
        art_color="#0f766e",
        bestselling=True,
    ),
    catalog_item(
        category="Automotive & Accessories",
        name="Portable Tire Inflator",
        description="Compact rechargeable tire inflator with a digital gauge for convenient roadside top-ups.",
        price="54.99",
        stock=15,
        tags=("automotive", "inflator", "travel"),
        art_style="tire-inflator",
        art_color="#334155",
    ),
    catalog_item(
        category="Automotive & Accessories",
        name="Microfiber Car Care Kit",
        description="Practical car care kit with microfiber cloths and accessories for a clean polished finish.",
        price="18.99",
        stock=29,
        tags=("automotive", "cleaning", "car-care"),
        art_style="car-care",
        art_color="#1d4ed8",
    ),
    catalog_item(
        category="Automotive & Accessories",
        name="LED Emergency Beacon",
        description="Bright LED emergency beacon with multiple flash modes for roadside visibility and safety.",
        price="24.99",
        stock=22,
        tags=("automotive", "safety", "lighting"),
        art_style="emergency-beacon",
        art_color="#dc2626",
    ),
    catalog_item(
        category="Automotive & Accessories",
        name="Steering Wheel Cover",
        description="Textured steering wheel cover that adds grip and comfort to everyday driving.",
        price="16.99",
        stock=34,
        tags=("automotive", "interior", "accessories"),
        art_style="steering-cover",
        art_color="#7c2d12",
    ),
    catalog_item(
        category="Pet Supplies",
        name="Cozy Pet Bed",
        description="Soft washable pet bed with raised edges for comfortable naps and restful sleep.",
        price="39.99",
        stock=18,
        tags=("pets", "bed", "comfort"),
        art_style="pet-bed",
        art_color="#db2777",
        bestselling=True,
    ),
    catalog_item(
        category="Pet Supplies",
        name="Interactive Cat Toy",
        description="Interactive cat toy designed to encourage healthy play, curiosity, and indoor activity.",
        price="12.99",
        stock=47,
        tags=("pets", "cats", "toys"),
        art_style="cat-toy",
        art_color="#9333ea",
    ),
    catalog_item(
        category="Pet Supplies",
        name="Adjustable Dog Leash",
        description="Strong adjustable dog leash with a comfortable handle for daily walks and outdoor trips.",
        price="17.99",
        stock=38,
        tags=("pets", "dogs", "walking"),
        art_style="dog-leash",
        art_color="#0369a1",
    ),
    catalog_item(
        category="Pet Supplies",
        name="Pet Feeding Bowl",
        description="Stable easy-clean feeding bowl with a wide base for comfortable daily meals and water.",
        price="14.99",
        stock=43,
        tags=("pets", "feeding", "kitchen"),
        art_style="pet-bowl",
        art_color="#0f766e",
    ),
    catalog_item(
        category="Pet Supplies",
        name="Natural Pet Grooming Brush",
        description="Gentle grooming brush that helps remove loose fur and keeps a pet's coat looking healthy.",
        price="11.99",
        stock=35,
        tags=("pets", "grooming", "care"),
        art_style="pet-brush",
        art_color="#a16207",
    ),
)

CATALOG += ADDITIONAL_CATALOG


def product_art_svg(item):
    color = item["art_color"]
    style = item["art_style"]
    name = escape(item["name"])
    category = escape(item["category"])
    dark_color = "#172554"

    if style in {"camera", "projector"}:
        icon = f'<rect x="300" y="210" width="300" height="190" rx="35" fill="{color}"/><circle cx="450" cy="305" r="70" fill="#e0f2fe"/><circle cx="450" cy="305" r="42" fill="{dark_color}"/><rect x="350" y="175" width="85" height="40" rx="12" fill="{color}"/><circle cx="560" cy="255" r="12" fill="#fef08a"/>'
    elif style in {"keyboard", "desk-organizer"}:
        icon = f'<rect x="250" y="245" width="400" height="150" rx="22" fill="{color}"/><g fill="#f8fafc" opacity=".85"><rect x="280" y="275" width="45" height="28" rx="5"/><rect x="340" y="275" width="45" height="28" rx="5"/><rect x="400" y="275" width="45" height="28" rx="5"/><rect x="460" y="275" width="45" height="28" rx="5"/><rect x="520" y="275" width="45" height="28" rx="5"/><rect x="580" y="275" width="35" height="28" rx="5"/><rect x="295" y="330" width="270" height="28" rx="5"/><rect x="580" y="330" width="35" height="28" rx="5"/></g>'
    elif style in {"charging-pad", "steering-cover"}:
        icon = f'<ellipse cx="450" cy="315" rx="180" ry="105" fill="{color}"/><ellipse cx="450" cy="315" rx="112" ry="62" fill="#e0f2fe" opacity=".85"/><path d="M450 270v90m-45-45h90" stroke="{dark_color}" stroke-width="14" stroke-linecap="round"/>'
    elif style in {"power-bank", "sports-flask", "serum", "lotion", "sunscreen"}:
        icon = f'<rect x="355" y="170" width="190" height="300" rx="45" fill="{color}"/><rect x="395" y="125" width="110" height="55" rx="15" fill="{dark_color}"/><rect x="390" y="255" width="120" height="80" rx="18" fill="#f8fafc" opacity=".9"/><path d="M415 385h70" stroke="#f8fafc" stroke-width="12" stroke-linecap="round" opacity=".75"/>'
    elif style in {"shirt", "scarf"}:
        icon = f'<path d="M360 185 260 240l-72 110 92 55 48-64v155h244V341l48 64 92-55-72-110-100-55c-18 35-44 55-90 55s-72-20-90-55Z" fill="{color}" stroke="{dark_color}" stroke-width="9"/><path d="M450 240v255" stroke="#f8fafc" stroke-width="8" opacity=".45"/>'
    elif style in {"wallet", "phone-mount"}:
        icon = f'<rect x="285" y="220" width="330" height="190" rx="24" fill="{color}" stroke="{dark_color}" stroke-width="10"/><path d="M285 275h330M490 315h120v65H490c-48 0-48-65 0-65Z" fill="#f8fafc" opacity=".8"/><circle cx="525" cy="347" r="10" fill="{dark_color}"/>'
    elif style == "cap":
        icon = f'<path d="M320 335c0-90 54-150 130-150s130 60 130 150H320Z" fill="{color}" stroke="{dark_color}" stroke-width="10"/><path d="M320 335c110-24 220-15 310 20-65 61-227 67-310 15Z" fill="{color}" stroke="{dark_color}" stroke-width="10"/>'
    elif style in {"sunglasses", "gel-pens"}:
        icon = f'<path d="M250 270h95l35 30-35 72h-88l-25-56Zm310 0h95l18 46-25 56h-88l-35-72Zm-215 38h210' f' stroke="{color}" stroke-width="22" fill="#172554" stroke-linejoin="round"/>'
    elif style == "pillow":
        icon = f'<rect x="255" y="225" width="390" height="180" rx="85" fill="{color}" stroke="{dark_color}" stroke-width="10"/><path d="M330 280c75-45 165-45 240 0" fill="none" stroke="#f8fafc" stroke-width="12" opacity=".55"/>'
    elif style in {"cutting-board", "sketchbook"}:
        icon = f'<rect x="290" y="175" width="320" height="285" rx="25" fill="{color}" stroke="{dark_color}" stroke-width="10"/><rect x="335" y="220" width="230" height="190" rx="8" fill="#fefce8"/><path d="M370 275h160m-160 48h130m-130 48h95" stroke="{color}" stroke-width="12" stroke-linecap="round"/>'
    elif style in {"planter", "honey-jar"}:
        icon = f'<path d="M330 260h240l-28 210H358Z" fill="{color}" stroke="{dark_color}" stroke-width="10"/><path d="M450 260c-55-80-95-30-75-115 55 18 64 62 75 115Zm0 0c55-80 95-30 75-115-55 18-64 62-75 115Z" fill="#22c55e" stroke="{dark_color}" stroke-width="8"/><rect x="345" y="225" width="210" height="48" rx="18" fill="#fefce8"/>'
    elif style in {"candle", "camping-lantern"}:
        icon = f'<rect x="350" y="230" width="200" height="230" rx="30" fill="{color}" stroke="{dark_color}" stroke-width="10"/><path d="M450 230c-28-42 30-55 0-100 63 42 38 74 0 100Z" fill="#fef08a"/><rect x="380" y="300" width="140" height="60" rx="15" fill="#f8fafc" opacity=".8"/>'
    elif style == "basket":
        icon = f'<path d="M285 245h330l-25 225H310Z" fill="{color}" stroke="{dark_color}" stroke-width="10"/><path d="M350 245c0-110 200-110 200 0M345 330h210M330 390h240" fill="none" stroke="#fef3c7" stroke-width="12" opacity=".8"/>'
    elif style in {"hair-brush", "pet-brush"}:
        icon = f'<rect x="410" y="170" width="80" height="300" rx="40" transform="rotate(25 450 320)" fill="{color}" stroke="{dark_color}" stroke-width="10"/><rect x="335" y="205" width="160" height="155" rx="35" fill="{color}" stroke="{dark_color}" stroke-width="10"/><g stroke="#fef3c7" stroke-width="8"><path d="M365 235v90m38-100v110m38-110v110m38-100v90"/></g>'
    elif style == "grooming-kit":
        icon = f'<rect x="270" y="225" width="360" height="210" rx="25" fill="{color}" stroke="{dark_color}" stroke-width="10"/><path d="M365 225v-45h170v45M330 280h240M330 355h240" stroke="#f8fafc" stroke-width="12" opacity=".8"/>'
    elif style in {"resistance-bands", "jump-rope"}:
        icon = f'<path d="M270 240c140 180 220 180 360 0M270 300c140 180 220 180 360 0M270 360c140 180 220 180 360 0" fill="none" stroke="{color}" stroke-width="18" stroke-linecap="round"/><circle cx="270" cy="240" r="18" fill="{dark_color}"/><circle cx="630" cy="240" r="18" fill="{dark_color}"/>'
    elif style == "hiking-pack":
        icon = f'<path d="M330 245c0-75 45-120 120-120s120 45 120 120v230H330Z" fill="{color}" stroke="{dark_color}" stroke-width="10"/><path d="M330 295h240v100H330ZM390 245v-70m120 70v-70" fill="none" stroke="#f8fafc" stroke-width="12" opacity=".8"/>'
    elif style in {"tea-pack", "coffee-pack", "snack-pack", "chocolate-bar"}:
        icon = f'<path d="M325 175h250l25 300H300Z" fill="{color}" stroke="{dark_color}" stroke-width="10"/><rect x="345" y="275" width="210" height="80" rx="14" fill="#fefce8" opacity=".9"/><path d="M375 230h150" stroke="#f8fafc" stroke-width="12" stroke-linecap="round" opacity=".8"/>'
    elif style in {"planner", "journal"}:
        icon = f'<rect x="305" y="170" width="290" height="310" rx="18" fill="{color}" stroke="{dark_color}" stroke-width="10"/><path d="M370 170v310M405 245h130m-130 55h130m-130 55h95" stroke="#fefce8" stroke-width="12" stroke-linecap="round" opacity=".85"/>'
    elif style == "building-blocks":
        icon = f'<g stroke="{dark_color}" stroke-width="8"><rect x="300" y="315" width="115" height="115" rx="12" fill="{color}"/><rect x="415" y="240" width="115" height="115" rx="12" fill="#facc15"/><rect x="530" y="315" width="115" height="115" rx="12" fill="#22c55e"/><circle cx="357" cy="315" r="18" fill="#f8fafc"/><circle cx="472" cy="240" r="18" fill="#f8fafc"/><circle cx="587" cy="315" r="18" fill="#f8fafc"/></g>'
    elif style == "puzzle":
        icon = f'<path d="M300 220h120v55c-35 0-35 55 0 55v120H300v-55c35 0 35-55 0-55Z" fill="{color}" stroke="{dark_color}" stroke-width="9"/><path d="M420 220h120v55c-35 0-35 55 0 55v120H420v-55c35 0 35-55 0-55Z" fill="#facc15" stroke="{dark_color}" stroke-width="9"/><path d="M540 220h120v55c-35 0-35 55 0 55v120H540v-55c35 0-35-55 0-55Z" fill="#22c55e" stroke="{dark_color}" stroke-width="9"/>'
    elif style == "toy-car":
        icon = f'<path d="M285 350h330l-35-95H350Z" fill="{color}" stroke="{dark_color}" stroke-width="10"/><rect x="250" y="350" width="400" height="80" rx="25" fill="{color}" stroke="{dark_color}" stroke-width="10"/><circle cx="340" cy="440" r="35" fill="{dark_color}"/><circle cx="560" cy="440" r="35" fill="{dark_color}"/><path d="M370 285h70v52h-70Zm90 0h70v52h-70Z" fill="#e0f2fe"/>'
    elif style == "teddy-bear":
        icon = f'<circle cx="370" cy="225" r="50" fill="{color}" stroke="{dark_color}" stroke-width="9"/><circle cx="530" cy="225" r="50" fill="{color}" stroke="{dark_color}" stroke-width="9"/><circle cx="450" cy="310" r="125" fill="{color}" stroke="{dark_color}" stroke-width="10"/><circle cx="410" cy="295" r="12" fill="{dark_color}"/><circle cx="490" cy="295" r="12" fill="{dark_color}"/><ellipse cx="450" cy="345" rx="45" ry="35" fill="#fef3c7"/>'
    elif style == "card-game":
        icon = f'<rect x="330" y="190" width="150" height="230" rx="18" transform="rotate(-14 330 190)" fill="#f8fafc" stroke="{dark_color}" stroke-width="9"/><rect x="425" y="190" width="150" height="230" rx="18" transform="rotate(14 425 190)" fill="{color}" stroke="{dark_color}" stroke-width="9"/><circle cx="450" cy="310" r="35" fill="#fef08a"/>'
    elif style in {"tire-inflator", "car-care"}:
        icon = f'<rect x="345" y="180" width="210" height="290" rx="38" fill="{color}" stroke="{dark_color}" stroke-width="10"/><rect x="385" y="235" width="130" height="70" rx="12" fill="#e0f2fe"/><path d="M385 355h130M385 390h90" stroke="#f8fafc" stroke-width="12" stroke-linecap="round" opacity=".8"/>'
    elif style == "emergency-beacon":
        icon = f'<path d="M330 425h240l-35-210H365Z" fill="{color}" stroke="{dark_color}" stroke-width="10"/><rect x="350" y="185" width="200" height="60" rx="20" fill="#fef08a" stroke="{dark_color}" stroke-width="10"/><path d="M375 290h150M390 345h120" stroke="#f8fafc" stroke-width="13" stroke-linecap="round"/>'
    elif style in {"pet-bed", "pet-bowl"}:
        icon = f'<ellipse cx="450" cy="350" rx="190" ry="105" fill="{color}" stroke="{dark_color}" stroke-width="10"/><ellipse cx="450" cy="330" rx="115" ry="57" fill="#fef3c7" opacity=".9"/><path d="M330 390c65 35 175 35 240 0" fill="none" stroke="{dark_color}" stroke-width="10" opacity=".6"/>'
    elif style == "cat-toy":
        icon = f'<circle cx="450" cy="315" r="100" fill="{color}" stroke="{dark_color}" stroke-width="10"/><path d="M450 215v-75m0 75-55-55m55 55 55-55" stroke="{dark_color}" stroke-width="10" stroke-linecap="round"/><circle cx="415" cy="300" r="12" fill="#fefce8"/><circle cx="485" cy="300" r="12" fill="#fefce8"/>'
    elif style == "dog-leash":
        icon = f'<circle cx="450" cy="305" r="115" fill="none" stroke="{color}" stroke-width="28"/><path d="M450 420v70m-55-15h110" stroke="{dark_color}" stroke-width="18" stroke-linecap="round"/><circle cx="450" cy="305" r="25" fill="#fef3c7" stroke="{dark_color}" stroke-width="9"/>'
    else:
        icon = f'<rect x="320" y="200" width="260" height="230" rx="35" fill="{color}" stroke="{dark_color}" stroke-width="10"/><circle cx="450" cy="315" r="58" fill="#fefce8" opacity=".85"/><path d="M410 315h80M450 275v80" stroke="{dark_color}" stroke-width="12" stroke-linecap="round"/>'

    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 700" role="img" aria-labelledby="title">
  <title id="title">{name}</title>
  <rect width="900" height="700" rx="36" fill="#f8fafc"/>
  <circle cx="735" cy="125" r="110" fill="{color}" opacity=".14"/>
  <circle cx="150" cy="575" r="130" fill="{color}" opacity=".10"/>
  <ellipse cx="450" cy="535" rx="205" ry="28" fill="{color}" opacity=".20"/>
  {icon}
  <text x="450" y="610" text-anchor="middle" font-family="Arial,sans-serif" font-size="27" font-weight="700" fill="{dark_color}">{name}</text>
  <text x="450" y="650" text-anchor="middle" font-family="Arial,sans-serif" font-size="16" letter-spacing="2" fill="{color}">{category.upper()}</text>
</svg>
'''


def ensure_product_art(item):
    if "art_style" not in item:
        return
    asset_path = Path(settings.MEDIA_ROOT) / item["image"]
    asset_path.parent.mkdir(parents=True, exist_ok=True)
    if not asset_path.exists():
        asset_path.write_text(product_art_svg(item), encoding="utf-8")


class Command(BaseCommand):
    help = "Create or update the standard EcomNepal product catalog."

    @transaction.atomic
    def handle(self, *args, **options):
        categories = {}
        created_categories = 0
        created_products = 0
        updated_products = 0

        for item in CATALOG:
            ensure_product_art(item)

        for item in CATALOG:
            category_name = item["category"]
            category, category_created = Category.objects.get_or_create(
                name=category_name
            )
            categories[category_name] = category
            if category_created:
                created_categories += 1

        for item in CATALOG:
            product, product_created = Product.objects.update_or_create(
                name=item["name"],
                defaults={
                    "category": categories[item["category"]],
                    "description": item["description"],
                    "image": item["image"],
                    "price": Decimal(item["price"]),
                    "stock": item["stock"],
                },
            )
            product.tags.set(item["tags"])
            if product_created:
                created_products += 1
            else:
                updated_products += 1

        self.stdout.write(
            self.style.SUCCESS(
                "Catalog ready: "
                f"{created_categories} categories created, "
                f"{created_products} products created, "
                f"{updated_products} products updated."
            )
        )
