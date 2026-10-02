import type { Article, ArticleCategory } from '../types/content';
import { images } from './images';

export const articleCategories: ArticleCategory[] = ['Marketing Tips', 'AI Tools', 'Case Studies', 'DSZ News'];

export const articles: Article[] = [
{
  slug: 'instagram-content-that-sells',
  title: 'How product brands can turn Instagram content into sales',
  category: 'Marketing Tips',
  excerpt: 'Beautiful posts are not enough. Here is how to plan content that moves people from scrolling to buying.',
  date: '2026-09-10',
  readTime: '6 min read',
  image: images.blogMarketing,
  imageAlt: 'Flat lay of a phone showing a social grid next to a mood board',
  author: 'DSZ Team',
  body: [
  { type: 'p', text: 'Most product brands post regularly. Far fewer post with a plan. The difference shows up in sales, not likes.' },
  { type: 'h2', text: 'Start with the customer journey' },
  { type: 'p', text: 'Map your content to three moments: discovery, consideration and decision. Reels and bold visuals help people discover you. Product details, reviews and comparisons help them consider. Clear offers and easy ordering help them decide.' },
  { type: 'list', items: ['Discovery: reels, trends, strong visuals', 'Consideration: details, use cases, social proof', 'Decision: offers, FAQs, direct message prompts'] },
  { type: 'h2', text: 'Make every post easy to act on' },
  { type: 'p', text: 'A post that sells tells people what to do next. Keep captions short, put the product front and centre, and make ordering — whether by DM, WhatsApp or website — one tap away.' },
  { type: 'quote', text: 'Consistency builds recognition. Clarity builds sales.' },
  { type: 'p', text: 'Review your numbers monthly. Keep the formats that bring messages and orders, and drop the ones that only bring likes.' }]

},
{
  slug: 'ai-product-visuals',
  title: 'Using AI tools for product visuals without losing your brand',
  category: 'AI Tools',
  excerpt: 'AI can speed up content production dramatically — if you set clear rules first.',
  date: '2026-08-28',
  readTime: '5 min read',
  image: images.blogAi,
  imageAlt: 'Monitor displaying a grid of AI generated perfume bottle images',
  author: 'DSZ Team',
  body: [
  { type: 'p', text: 'AI image tools can produce dozens of product visuals in minutes. The risk is that every brand starts to look the same.' },
  { type: 'h2', text: 'Set your visual rules before you prompt' },
  { type: 'p', text: 'Define your lighting, colours, backgrounds and composition. Write them down. Use them in every prompt so the output feels like your brand, not the tool.' },
  { type: 'list', items: ['Keep real product photos as the source of truth', 'Use AI for backgrounds, scenes and variations', 'Always review for accuracy before publishing'] },
  { type: 'h2', text: 'Use AI where it saves time, not where it costs trust' },
  { type: 'p', text: 'Customers need to see the real product. Use AI to extend your photography, test concepts and create variations — not to replace honest product images.' }]

},
{
  slug: 'reel-formats-for-product-brands',
  title: 'Five reel formats that work for perfume and fashion brands',
  category: 'Marketing Tips',
  excerpt: 'Short-form video does not need a big budget. It needs the right format.',
  date: '2026-08-12',
  readTime: '4 min read',
  image: images.videoShoot,
  imageAlt: 'Cinema camera pointed at a perfume bottle on a small studio set',
  author: 'DSZ Team',
  body: [
  { type: 'p', text: 'Reels reward brands that are consistent and clear. These five formats are simple to shoot and easy to repeat.' },
  { type: 'list', items: ['The product reveal', 'Behind the scenes', 'How to wear / how to use', 'Customer unboxing', 'Before and after'] },
  { type: 'h2', text: 'Keep the first second strong' },
  { type: 'p', text: 'Open with the product or the most interesting moment. Add captions for people watching without sound, and keep most reels under 20 seconds.' }]

},
{
  slug: 'anatomy-of-a-product-launch',
  title: 'Anatomy of a product launch: how we structure a campaign',
  category: 'Case Studies',
  excerpt: 'A look at the phases we use to plan a launch — from the first brief to the first month of results.',
  date: '2026-07-30',
  readTime: '7 min read',
  image: images.perfume,
  imageAlt: 'Glass perfume bottle on a slate plinth',
  author: 'DSZ Team',
  body: [
  { type: 'p', text: 'Launches go wrong when strategy, creative and technology are planned separately. We plan them as one timeline.' },
  { type: 'h2', text: 'Phase one: before anyone sees it' },
  { type: 'p', text: 'We define the audience, the message and the offer. The website or store is prepared, and tracking is set up so we can measure from day one.' },
  { type: 'h2', text: 'Phase two: build anticipation' },
  { type: 'p', text: 'Teasers, behind-the-scenes content and early access lists create demand before launch day.' },
  { type: 'h2', text: 'Phase three: launch and learn' },
  { type: 'p', text: 'On launch, paid and organic content work together. In the weeks after, we look at what is selling and shift budget towards it.' },
  { type: 'quote', text: 'A launch is not a day. It is the first month.' }]

},
{
  slug: 'first-automations-for-online-shops',
  title: 'Three automations every growing online shop should set up first',
  category: 'AI Tools',
  excerpt: 'If your team is copying order details by hand, start here.',
  date: '2026-07-14',
  readTime: '5 min read',
  image: images.dashboard,
  imageAlt: 'Laptop showing an automation dashboard',
  author: 'DSZ Team',
  body: [
  { type: 'p', text: 'Automation does not have to be complicated. The best first automations remove small, repeated tasks that happen dozens of times a day.' },
  { type: 'list', items: ['Order confirmation messages', 'Order data into one sheet or system', 'Weekly sales summary sent to your inbox'] },
  { type: 'p', text: 'Once these run smoothly, move on to inventory alerts, follow-up messages and customer segmentation.' }]

},
{
  slug: 'notes-from-the-studio',
  title: 'Notes from the studio: how we work at DSZ',
  category: 'DSZ News',
  excerpt: 'Why we keep strategy, creative and technology under one roof in Chittagong.',
  date: '2026-06-30',
  readTime: '3 min read',
  image: images.office,
  imageAlt: 'The DSZ team collaborating around a table',
  author: 'DSZ Team',
  body: [
  { type: 'p', text: 'Digital Soft Zone brings strategists, designers, video makers and developers into one team, working from Software Technology Park in Chittagong.' },
  { type: 'p', text: 'That means one brief, one plan and one point of contact — instead of several agencies passing work between them.' },
  { type: 'p', text: '[Add studio news, team updates or announcements here.]' }]

}];