export type Product = {
  slug: string;
  name: string;
  tagline: string;
  summary: string;
  description: string;
  image?: string;
  availability: string;
  benefits: string[];
  trustHighlights?: string[];
  whyChoose: { title: string; description: string }[];
  raisingProcess?: { step: number; title: string; description: string; image?: string }[];
  galleryImages?: { src: string; alt: string; crop?: "left" | "right" }[];
  orderOptions?: string[];
  faqs?: { question: string; answer: string }[];
  customerReview?: CustomerReview;
};

export type CustomerReview = {
  quote: string;
  name: string;
  context: string;
};

export const customerReviews: CustomerReview[] = [
  {
    quote:
      "The catfish we got from Favosa Farms was the freshest we've had — delivered alive and well-sized. Our restaurant has been ordering weekly ever since.",
    name: "Mama Chibuzor",
    context: "Restaurant owner, Yenagoa",
  },
  {
    quote:
      "I tried their farm consultation before setting up my own poultry pen and it saved me from so many rookie mistakes. Worth every minute of that session.",
    name: "Emmanuel A.",
    context: "Smallholder farmer, Okolobiri",
  },
  {
    quote:
      "Their eggs are consistently clean, large and fresh. I've stopped buying from the market entirely. The 7-day doorstep delivery is a bonus I didn't expect to love so much.",
    name: "Ngozi P.",
    context: "Home cook, Opolo",
  },
];

export const products: Product[] = [
  {
    slug: "broilers",
    name: "Broilers",
    tagline: "Healthy birds. Ethical practices. Protein you can trust.",
    summary: "Healthy birds raised with attentive care and balanced nutrition.",
    description:
      "At Favosa Farms, our broilers are raised with high-quality feed, proper management and zero compromise on bird health.",
    image: "/Images/broilers.png",
    availability: "Available to order; confirm current size and quantities with us.",
    benefits: ["Careful flock management", "Healthy growth", "Household and bulk enquiries"],
    trustHighlights: [
      "No harmful drugs",
      "Balanced nutrition",
      "Clean environment",
      "Proper management",
      "Healthy protein",
    ],
    whyChoose: [
      { title: "Healthy & Safe", description: "We follow proper withdrawal periods and responsible drug use." },
      { title: "Quality Feed", description: "Balanced, nutrient-rich feed for healthy growth and better meat quality." },
      { title: "Clean & Hygienic", description: "Our houses are kept clean, ventilated and well-managed." },
      { title: "Expert Care", description: "Our birds are monitored daily by experienced farmers." },
      { title: "Premium Quality", description: "Better taste, better texture and better nutrition." },
      { title: "Family Focused", description: "We raise the kind of chicken we proudly feed our family." },
    ],
    raisingProcess: [
      { step: 1, title: "Day Old Chicks", description: "We start with healthy, high-quality day old chicks from trusted hatcheries.", image: "/Images/chicks.png" },
      { step: 2, title: "Quality Feeding", description: "Balanced feed and clean water to support strong growth and immunity.", image: "/Images/feed-grain.png" },
      { step: 3, title: "Proper Management", description: "Good housing, ventilation, temperature control and daily monitoring.", image: "/Images/gallery-broiler-house.png" },
      { step: 4, title: "Healthy Growth", description: "Birds grow naturally with no shortcuts or harmful substances.", image: "/Images/broilers.png" },
      { step: 5, title: "Ready for You", description: "Delivered fresh and clean, ready to provide the best protein for your family.", image: "/Images/White-birds-optimized.jpg" },
    ],
    galleryImages: [
      { src: "/Images/gallery-broiler-house.png", alt: "Broiler house interior" },
      { src: "/Images/White-birds-optimized.jpg", alt: "Healthy white broilers" },
      { src: "/Images/chicks.png", alt: "Day old chicks" },
      { src: "/Images/story-broiler-man.png", alt: "Farmer with broilers" },
      { src: "/Images/feed-grain.png", alt: "Quality feed grain" },
      { src: "/Images/broilers.png", alt: "Healthy broilers ready for delivery" },
    ],
    orderOptions: [
      "Live Birds (Wholesale & Retail)",
      "Processed Chicken (On Request)",
      "Bulk Orders & Deliveries Available",
    ],
    faqs: [
      { question: "What do you feed your broilers?", answer: "We use high-quality balanced feed appropriate for each growth stage, stored properly and provided with clean water daily." },
      { question: "Do you use antibiotics or growth boosters?", answer: "We follow responsible practices with proper withdrawal periods. We do not use growth hormones or banned substances." },
      { question: "How do I place an order?", answer: "Contact us via WhatsApp or phone to confirm current availability, size and quantities before placing your order." },
      { question: "Do you deliver?", answer: "Yes, we deliver across Yenagoa and surrounding communities. Contact us to confirm your area and arrange delivery." },
    ],
  },
  {
    slug: "turkey",
    name: "Turkey",
    tagline: "Farm-raised turkey for households and food businesses.",
    summary: "Farm-raised turkey enquiries for households and food businesses.",
    description:
      "Contact Favosa Farms to ask about turkey availability, quantities and order arrangements. Our team can confirm current options before you place an order.",
    image: "/Images/turkey.png",
    availability: "Please enquire to confirm current availability and order details.",
    benefits: ["Availability confirmed on enquiry", "Household and bulk enquiries", "Discuss order arrangements"],
    trustHighlights: [
      "Farm-raised care",
      "Order-by-enquiry flow",
      "Flexible arrangements",
    ],
    whyChoose: [
      { title: "Farm Raised", description: "Raised with care and proper management on our farm." },
      { title: "Enquire First", description: "Contact us to confirm availability before ordering." },
      { title: "Flexible Orders", description: "We discuss your needs and confirm what we can fulfil." },
    ],
    faqs: [
      { question: "How do I order turkey?", answer: "Contact us via WhatsApp to confirm current availability and arrange your order." },
    ],
  },
  {
    slug: "catfish",
    name: "Catfish",
    tagline: "Fresh farmed catfish. Harvested to order.",
    summary: "Fresh farmed fish for households, restaurants and food businesses.",
    description:
      "We raise catfish and can discuss harvest timing, quantity and preparation preferences with you. Contact us to check the current harvest schedule and delivery options.",
    image: "/Images/catfish.png",
    availability: "Harvest and quantities vary; please enquire before ordering.",
    benefits: ["Freshly harvested to order", "Household and restaurant supply", "Discuss preparation preferences"],
    trustHighlights: [
      "Carefully monitored ponds",
      "Clean, well-managed water systems",
      "Healthy growth and quality control",
      "Reliable availability updates",
    ],
    whyChoose: [
      { title: "Farm Fresh", description: "Harvested from our monitored ponds on order, so you get fish that are recent, clean and ready for market or home use." },
      { title: "Healthy Growth", description: "We manage feed, stocking and pond conditions to support steady, natural growth without unnecessary stress on the fish." },
      { title: "Live or Processed", description: "Available live or cleaned and dressed to your preference, making it easier to match your kitchen, restaurant or business needs." },
      { title: "Restaurant Supply", description: "We support restaurants, caterers and households with dependable supply arranged around your required volume and timing." },
      { title: "Clean Water", description: "Raised in clean, well-managed pond environments with regular attention to water quality and farm hygiene." },
      { title: "Reliable Harvesting", description: "We work around current pond conditions and harvest schedules to help you plan purchases with greater confidence." },
      // { title: "Flexible Orders", description: "Whether you need a small family order or a larger bulk arrangement, we can discuss the best option for your needs." },
    ],
    galleryImages: [
      { src: "/Images/catfish-farm-pond.png", alt: "Catfish farm ponds" },
      { src: "/Images/story-fish-ponds.png", alt: "Aerial view of fish ponds" },
      { src: "/Images/catfish.png", alt: "Fresh catfish" },
      { src: "/Images/hero-farm-aerial.png", alt: "Aerial farm view with fish ponds" },
      { src: "/Images/gallery-ponds-aerial.png", alt: "Pond area from above" },
      { src: "/Images/hero-farm-aerial-no-text.png", alt: "Farm landscape with cultivation and ponds" },
    ],
    orderOptions: [
      "Live Fish (Wholesale & Retail)",
      "Dressed/Processed (On Request)",
      "Bulk Orders Available",
    ],
    faqs: [
      { question: "Do you deliver fish live or processed?", answer: "Both. Contact us to specify your preference and we will confirm availability." },
      { question: "What is your minimum order quantity?", answer: "We typically start from 5 kg. Contact us with your requirements." },
    ],
    customerReview: customerReviews[0],
  },
  {
    slug: "eggs",
    name: "Fresh Eggs",
    tagline: "Farm-fresh eggs. Clean, large and consistent.",
    summary: "Farm-fresh eggs for home cooking and regular supply.",
    description:
      "Ask our team about egg availability, order quantities and delivery arrangements in your area. We will confirm current stock before your order is finalised.",
    image: "/Images/eggs-optimized.jpg",
    availability: "Please confirm current stock and delivery options.",
    benefits: ["Fresh farm supply", "Crate and bulk enquiries", "Local delivery enquiries"],
    trustHighlights: [
      "Fresh daily collection",
      "Clean and graded eggs",
      "Reliable supply",
    ],
    whyChoose: [
      { title: "Farm Fresh", description: "Collected regularly and delivered fresh to your door." },
      { title: "Clean & Graded", description: "Eggs are clean, well-sized and handled carefully." },
      { title: "Regular Supply", description: "Set up a recurring order for your home or business." },
    ],
    faqs: [
      { question: "How are eggs sold?", answer: "Eggs are sold by the crate (30 eggs). Contact us for bulk pricing." },
    ],
    customerReview: customerReviews[2],
  },
  {
    slug: "dogs",
    name: "Dogs",
    tagline: "Thoughtfully raised dogs with expert care guidance.",
    summary: "Thoughtfully raised dogs and practical pet-care guidance.",
    description:
      "Contact the farm to discuss availability and responsible care requirements. We can help you learn more about a dog's needs before making a commitment.",
    image: "/Images/dog-sit-optimized.jpg",
    availability: "Availability varies; enquire for current information.",
    benefits: ["Responsible placement enquiries", "Care guidance", "Talk through suitability"],
    trustHighlights: [
      "Thoughtful care",
      "Health-first approach",
      "Responsible placement",
      "Care guidance",
    ],
    whyChoose: [
      { title: "Thoughtful Care", description: "Our dogs receive attentive care and proper nutrition." },
      { title: "Care Guidance", description: "Understand a dog's needs and daily care before making a commitment." },
      { title: "Health Comes First", description: "We prioritise animal health and welfare in our care." },
      { title: "Choose with Confidence", description: "Discuss breed options and suitability with our team before enquiring." },
      { title: "Responsible Placement", description: "We encourage a considered match between each dog and its future home." },
      { title: "Support Getting Started", description: "Get practical guidance on preparing for your puppy and its care needs." },
    ],
    galleryImages: [
      { src: "/Images/dog-sit-optimized.jpg", alt: "Dog sitting" },
      { src: "/Images/dog-rottweiler.png", alt: "Rottweiler dog" },
      { src: "/Images/09-gallery-dogs-kennel.png", alt: "Dogs in kennel" },
      { src: "/Images/story-man-with-dog.png", alt: "Farmer with dog" },
      {
        src: "/Images/dog-sit-optimized.jpg",
        alt: "Close-up crop of the dogs sitting together",
        crop: "left",
      },
      {
        src: "/Images/dog-rottweiler.png",
        alt: "Close-up crop of the Rottweiler puppy",
        crop: "right",
      },
    ],
    faqs: [
      { question: "What breeds do you have?", answer: "Contact us to check current availability of breeds and age groups." },
      { question: "Do you provide care guidance?", answer: "Yes, we discuss the dog's needs and care requirements before placement." },
    ],
  },
  {
    slug: "layers",
    name: "Layers",
    tagline: "Coming soon — register your interest today.",
    summary: "A future product line currently in development.",
    description:
      "Layer production is a planned future product. Contact us if you would like to register interest; we will share updates when the service is available.",
    availability: "Coming soon; not currently available to order.",
    benefits: ["Planned future offering", "Register interest", "Availability updates"],
    whyChoose: [],
    faqs: [],
  },
  {
    slug: "quail",
    name: "Quail",
    tagline: "Coming soon — register your interest today.",
    summary: "A future product line currently in development.",
    description:
      "Quail products are planned for a future phase. Get in touch to register interest and receive an update when availability is confirmed.",
    availability: "Coming soon; not currently available to order.",
    benefits: ["Planned future offering", "Register interest", "Availability updates"],
    whyChoose: [],
    faqs: [],
  },
];

export type Article = {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  paragraphs: string[];
};

export const articles: Article[] = [
  {
    slug: "poultry-feed-and-growth",
    category: "Poultry",
    title: "Why Feed Quality Determines Your Profit",
    excerpt: "Good feed = healthy birds + better returns",
    paragraphs: [
      "Feed is a central part of poultry management, but it works alongside housing, clean water, hygiene and careful observation. A consistent routine helps farmers notice changes early and make informed decisions.",
      "Choose feed appropriate for the birds' stage of growth, store it in a cool, dry place and protect it from pests and moisture. Changes in feed should be managed thoughtfully rather than made abruptly.",
      "Every farm is different. For guidance tailored to your flock and local conditions, speak with an experienced poultry adviser or book a consultation with our team.",
    ],
  },
  {
    slug: "planning-a-catfish-farm",
    category: "Fish farming",
    title: "5 Steps to a Successful Catfish Farm",
    excerpt: "A clear plan can help new fish farmers think through water, site, stocking, feed and the market before investing.",
    paragraphs: [
      "Start with the purpose and scale of the farm. Consider your site, reliable water access, pond design, operating costs and how you intend to sell the fish before buying stock.",
      "Learn about appropriate stocking and feeding practices from a qualified local adviser. Keep records of inputs, water conditions, fish health and growth so you can make decisions based on what is happening on your farm.",
      "A practical plan should include a route to market and a contingency for delays or unexpected costs. Our consultation service can help you review a proposed setup.",
    ],
  },
  {
    slug: "safe-food-handling",
    category: "Food safety",
    title: "Antibiotics Withdrawal: Why It Matters",
    excerpt: "Thoughtful handling, clean equipment and prompt storage all contribute to safer food at home and in food businesses.",
    paragraphs: [
      "Keep raw poultry, fish and eggs separate from ready-to-eat foods. Wash hands, utensils and work surfaces after handling raw ingredients to reduce the chance of cross-contamination.",
      "Store perishable products promptly and follow recognised local food-safety guidance for safe temperatures, preparation and cooking. When buying, ask how products have been handled and transported.",
      "Restaurants and caterers should use documented hygiene procedures and train staff on safe storage and preparation. If you are unsure about a specific food-safety practice, consult your local food-safety authority.",
    ],
  },
];

export const faqs = [
  {
    question: "What areas do you deliver to?",
    answer: "We currently deliver across Yenagoa and surrounding communities in Bayelsa State. Orders are fulfilled within seven days of placement. Contact us to confirm availability in your specific area.",
  },
  {
    question: "Do you deliver fish live or processed?",
    answer: "Options depend on the harvest and order. Contact us to discuss availability and preparation preferences before placing your order.",
  },
  {
    question: "What is your minimum order quantity?",
    answer: "Minimum quantities vary by product and availability. Contact us with your requirements and we will let you know what we can fulfil.",
  },
  {
    question: "Are your products certified organic?",
    answer: "We aim to raise our produce without synthetic drugs, growth hormones or chemical feed additives. Favosa Farms does not currently hold formal organic certification.",
  },
  {
    question: "How do I book a farm consultation?",
    answer: "Send us a message using the consultation form or contact us directly by phone or WhatsApp. Sessions may be arranged on-farm or remotely depending on your location.",
  },
  {
    question: "Do you accept bulk and restaurant orders?",
    answer: "Yes, we welcome enquiries from restaurants, hotels and caterers. Contact us to discuss quantities, availability and possible delivery arrangements.",
  },
];
