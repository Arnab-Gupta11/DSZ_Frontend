import type { Project } from "../types/content";
import { images } from "./images";

/**
 * Case study content is structured placeholder copy.
 * Replace every [BRACKETED] value with real, approved project details.
 */
export const projects: Project[] = [
  {
    slug: "fragrance-launch",
    title: "A fragrance launch built for the feed",
    client: "[CLIENT NAME]",
    industry: "Perfume & Fragrance",
    services: ["Brand Identity", "Digital Campaign"],
    categories: ["Branding", "Marketing"],
    result: "[+XX% engagement]",
    year: "[YEAR]",
    image: images.perfume,
    imageAlt:
      "Faceted glass perfume bottle on a slate plinth with cyan rim light",
    summary: "Identity and launch campaign for a new fragrance line.",
    challenge:
      "[Describe the client’s problem] — for example, a new fragrance line entering a crowded market with no recognisable identity and no digital presence.",
    strategy:
      "[Describe what DSZ did] — for example, defining a clear brand position, building a visual identity around the bottle, and planning a phased social launch.",
    execution:
      "[Describe how the work was delivered] — for example, identity design, product photography direction, launch creatives and paid social campaigns.",
    executionPoints: [
      "[Identity system]",
      "[Launch creatives]",
      "[Paid social campaign]",
      "[Product photography]",
    ],
    results: [
      { value: "[+XX%]", label: "Engagement" },
      { value: "[XX K]", label: "Reach in launch month" },
      { value: "[XX%]", label: "Sales uplift" },
    ],

    gallery: [
      {
        src: images.videoShoot,
        alt: "Behind the scenes of the fragrance product shoot",
      },
      {
        src: images.blogAi,
        alt: "Product image variations reviewed on a studio monitor",
      },
    ],
  },
  {
    slug: "seasonal-collection",
    title: "A seasonal collection, told in motion",
    client: "[CLIENT NAME]",
    industry: "Clothing & Fashion",
    services: ["Campaign", "Video Production"],
    categories: ["Marketing", "Video"],
    result: "[+XX% reach]",
    year: "[YEAR]",
    image: images.fashion,
    imageAlt:
      "Model in minimalist tailored clothing against a deep teal backdrop",
    summary: "Campaign concept, lookbook film and reels for a new collection.",
    challenge:
      "[Describe the client’s problem] — for example, a new collection that needed to stand out in a busy season with a limited budget.",
    strategy:
      "[Describe what DSZ did] — for example, one strong campaign idea, adapted into a lookbook film, reels and static creatives.",
    execution:
      "[Describe how the work was delivered] — for example, concept, casting, a one-day shoot and a full set of social cut-downs.",
    executionPoints: [
      "[Campaign concept]",
      "[Lookbook film]",
      "[Reels pack]",
      "[Paid social cut-downs]",
    ],
    results: [
      { value: "[+XX%]", label: "Reach" },
      { value: "[XX K]", label: "Video views" },
      { value: "[XX%]", label: "Online sales uplift" },
    ],

    gallery: [
      { src: images.videoShoot, alt: "Camera set up on the campaign shoot" },
      {
        src: images.blogMarketing,
        alt: "Campaign mood board and social content plan",
      },
    ],
  },
  {
    slug: "watch-storefront",
    title: "A storefront as precise as the product",
    client: "[CLIENT NAME]",
    industry: "Watches",
    services: ["E-commerce Website", "UI Design"],
    categories: ["Web/App", "Design"],
    result: "[XX% conversion rate]",
    year: "[YEAR]",
    image: images.watch,
    imageAlt: "Steel wristwatch close-up with a thin cyan light on the bezel",
    summary: "A fast, mobile-first online store for a watch brand.",
    challenge:
      "[Describe the client’s problem] — for example, a slow, dated online store that lost customers on mobile.",
    strategy:
      "[Describe what DSZ did] — for example, a simpler product journey, better product imagery and a store built for speed.",
    execution:
      "[Describe how the work was delivered] — for example, UX research, UI design, e-commerce build and team training.",
    executionPoints: [
      "[UX & journey mapping]",
      "[UI design system]",
      "[Store build]",
      "[Team training]",
    ],
    results: [
      { value: "[XX%]", label: "Conversion rate" },
      { value: "[X.Xs]", label: "Mobile load time" },
      { value: "[+XX%]", label: "Online revenue" },
    ],

    gallery: [
      { src: images.dashboard, alt: "Store admin dashboard on a laptop" },
      {
        src: images.earbuds,
        alt: "Product photography for the store catalogue",
      },
    ],
  },
  {
    slug: "audio-product-visuals",
    title: "Product visuals for a tech accessory line",
    client: "[CLIENT NAME]",
    industry: "Technology & Accessories",
    services: ["Product Design", "Video"],
    categories: ["Design", "Video"],
    result: "[XX product launches]",
    year: "[YEAR]",
    image: images.earbuds,
    imageAlt: "Matte wireless earbuds and charging case on a dark teal surface",
    summary: "A reusable visual system for product launches.",
    challenge:
      "[Describe the client’s problem] — for example, inconsistent product visuals across marketplaces and social channels.",
    strategy:
      "[Describe what DSZ did] — for example, a visual system with shared lighting, layouts and motion rules for every launch.",
    execution:
      "[Describe how the work was delivered] — for example, studio shoots, template design and short product videos.",
    executionPoints: [
      "[Visual system]",
      "[Studio photography]",
      "[Launch templates]",
      "[Product videos]",
    ],
    results: [
      { value: "[XX]", label: "Products launched" },
      { value: "[XX%]", label: "Faster content production" },
      { value: "[+XX%]", label: "Marketplace click-through" },
    ],

    gallery: [
      {
        src: images.blogAi,
        alt: "Product image variations on a studio monitor",
      },
      { src: images.videoShoot, alt: "Product video shoot in the studio" },
    ],
  },
  {
    slug: "skincare-identity",
    title: "An identity refresh for a lifestyle brand",
    client: "[CLIENT NAME]",
    industry: "Lifestyle & Skincare",
    services: ["Brand Strategy", "Packaging"],
    categories: ["Branding", "Design"],
    result: "[+XX% repeat orders]",
    year: "[YEAR]",
    image: images.skincare,
    imageAlt: "Skincare bottles arranged on sculptural stone blocks",
    summary:
      "Positioning, identity and packaging for a growing skincare brand.",
    challenge:
      "[Describe the client’s problem] — for example, a brand that had grown quickly but looked inconsistent across products.",
    strategy:
      "[Describe what DSZ did] — for example, clarifying the brand story and building one identity and packaging system.",
    execution:
      "[Describe how the work was delivered] — for example, brand workshops, identity design and packaging artwork for the range.",
    executionPoints: [
      "[Brand workshop]",
      "[Identity refresh]",
      "[Packaging system]",
      "[Guidelines]",
    ],
    results: [
      { value: "[+XX%]", label: "Repeat orders" },
      { value: "[XX]", label: "SKUs repackaged" },
      { value: "[XX%]", label: "Brand recall" },
    ],

    gallery: [
      {
        src: images.blogMarketing,
        alt: "Brand mood board with colour swatches",
      },
      { src: images.perfume, alt: "Premium product photography direction" },
    ],
  },
  {
    slug: "order-automation",
    title: "Order automation for a growing retailer",
    client: "[CLIENT NAME]",
    industry: "Retail",
    services: ["Business Automation", "Dashboard"],
    categories: ["Automation", "Web/App"],
    result: "[XX hrs saved / week]",
    year: "[YEAR]",
    image: images.dashboard,
    imageAlt:
      "Laptop showing an automation dashboard with connected workflow nodes",
    summary: "Connected ordering, messaging and reporting in one flow.",
    challenge:
      "[Describe the client’s problem] — for example, orders arriving through chat and social were tracked by hand in spreadsheets.",
    strategy:
      "[Describe what DSZ did] — for example, mapping the order journey and automating the repetitive steps end to end.",
    execution:
      "[Describe how the work was delivered] — for example, tool integrations, automated customer messages and a live dashboard.",
    executionPoints: [
      "[Workflow mapping]",
      "[Tool integrations]",
      "[Automated messaging]",
      "[Live dashboard]",
    ],
    results: [
      { value: "[XX hrs]", label: "Saved every week" },
      { value: "[XX%]", label: "Fewer order errors" },
      { value: "[XX min]", label: "Average response time" },
    ],

    gallery: [
      { src: images.blogAi, alt: "Workflow screens reviewed on a monitor" },
      { src: images.office, alt: "The team mapping the order workflow" },
    ],
  },
];
