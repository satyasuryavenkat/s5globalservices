import { services, equipment } from './data.js';

const pages = {
  '/': ['Home', 'Manpower services, industrial juice processing, beverage filling lines, and whisky and beer machinery. Explore the possibilities with S5 Global Services.'],
  '/about': ['About us', 'Meet S5 Global Services and discover our people-first approach to workforce, processing machinery, and production possibilities.'],
  '/services': ['Our services', 'Explore manpower services, juice and beverage processing machinery, and whisky and beer manufacturing equipment.'],
  '/machinery': ['Machinery', 'Browse juice processing systems and CSD & RTS filling machinery. Explore equipment categories and prepare a project enquiry.'],
  '/how-we-work': ['Our approach', 'Discover how S5 Global Services understands your goals, shapes your requirements, and explores your workforce and machinery options.'],
  '/faq': ['FAQs', 'Answers to your questions about S5 Global Services, processing functions, manpower requirements, and beverage filling machinery.'],
  '/contact': ['Contact', 'Tell S5 Global Services about your manpower or machinery requirements and prepare your project enquiry.'],
  '/credits': ['Media credits', 'Photography, industry video, and content references used on the S5 Global Services website.'],
};

export const pagePaths = [...Object.keys(pages), ...services.map(service => `/services/${service.slug}`), ...equipment.map(item => `/machinery/${item.slug}`)];
export function getPageMeta(pathname) {
  const path = pathname.replace(/\/$/, '') || '/';
  const service = services.find(item => path === `/services/${item.slug}`);
  const machine = equipment.find(item => path === `/machinery/${item.slug}`);
  const [name, description] = service ? [service.heading, service.description] : machine ? [machine.title, machine.description] : pages[path] || ['Page not found', 'Explore the services and machinery range at S5 Global Services.'];
  return { title: `${name === 'Home' ? '' : name + ' — '}S5 Global Services | People. Precision. Progress.`, description };
}
