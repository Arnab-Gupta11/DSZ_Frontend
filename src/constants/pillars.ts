import type { Pillar } from '../types/content';
import { images } from './images';

export const pillars: Pillar[] = [
{
  number: '01',
  title: 'Strategy First',
  description:
  'Every project starts with understanding your business and your customers — not with a template or a trend.',
  points: ['Discovery before design', 'Clear goals you can measure', 'Decisions backed by data'],
  image: images.office,
  imageAlt: 'The DSZ team discussing a project brief around a table',
  caption: 'Discovery shapes every brief.'
},
{
  number: '02',
  title: 'Creative That Converts',
  description:
  'Design, content and video made to be noticed — and made to sell. Beautiful is the starting point, not the goal.',
  points: ['Scroll-stopping visuals', 'Consistent brand look', 'Built around real sales goals'],
  image: images.fashion,
  imageAlt: 'Editorial fashion campaign photograph against a deep teal backdrop',
  caption: 'Creative made for the feed.'
},
{
  number: '03',
  title: 'Technology That Scales',
  description:
  'Websites, apps and automations built in-house, so your marketing and your systems grow together.',
  points: ['Fast, mobile-first builds', 'Automations that save hours', 'Easy for your team to run'],
  image: images.dashboard,
  imageAlt: 'Laptop showing a dark automation dashboard with teal charts',
  caption: 'Systems that grow with you.'
},
{
  number: '04',
  title: 'Long-Term Partnership',
  description:
  'We stay after launch — measuring, learning and improving month after month, like part of your own team.',
  points: ['Monthly reporting', 'One point of contact', 'Continuous improvement'],
  image: images.skincare,
  imageAlt: 'Lifestyle skincare products arranged on sculptural stone blocks',
  caption: 'Growth is a long game.'
}];