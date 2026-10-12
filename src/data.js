export const services = [
  {
    slug: 'manpower', number: '01', short: 'Manpower', title: 'The people behind your progress.', heading: 'Manpower services',
    eyebrow: 'PEOPLE WITH PURPOSE', video: 'manpower', image: '/images/editorial/workshop.jpg',
    description: 'A great operation starts with the right people. Build your workforce around the skills, roles, and rhythm your business needs.',
    intro: 'Your workforce is more than a number on a plan. It is the expertise on your factory floor, the care behind your production, and the everyday effort that keeps your business moving.',
    body: 'We help you explore manpower requirements for your operation, from skilled trades to production support. Every conversation starts with your working environment, the responsibilities involved, and the capability your team needs.',
    features: [['Skilled workforce', 'Discuss the technical skills and practical experience required for your operation.'], ['Production support', 'Explore workforce requirements for manufacturing, beverage processing, and day-to-day plant activity.'], ['Flexible requirements', 'Plan around your operating schedule, project milestones, and changing staffing needs.'], ['A clear brief', 'Define roles, responsibilities, location, and timelines before moving ahead.']],
    checklist: ['Roles and required skills', 'Work location and environment', 'Number of people required', 'Project duration and start date'],
    gallery: ['/images/editorial/manpower-poster.jpg', '/images/editorial/workshop.jpg', '/images/editorial/manpower-detail.jpg'],
  },
  {
    slug: 'juice-processing', number: '02', short: 'Juice & processing', title: 'Great ingredients. Greater possibilities.', heading: 'Juice & processing machinery',
    eyebrow: 'FROM INGREDIENT TO OPPORTUNITY', video: 'juice', image: '/images/products/juice-filling.jpg',
    description: 'Bring your product vision into production with large-scale juice mixing, processing equipment, and beverage filling solutions.',
    intro: 'A recipe is only the beginning. The right processing machinery helps turn ingredients into a production workflow that fits your product, your output, and your next stage of growth.',
    body: 'Our range covers cutting, fine cutting, mixing, stirring, kneading, making purees, and emulsifying, as well as heating, cooling, and vacuum processing. Explore individual equipment categories or discuss your complete processing and filling requirements.',
    features: [['Preparation & size reduction', 'Explore cutting, fine cutting, and puree-making functions for your ingredients.'], ['Mixing & product consistency', 'Discuss mixing, stirring, kneading, and emulsifying machinery for your process.'], ['Temperature & vacuum processing', 'Bring heating, cooling, and vacuum requirements into your equipment brief.'], ['CSD & RTS filling lines', 'Explore processing, carbonated beverage equipment, filling machines, filling stations, and overall lines.']],
    checklist: ['Product and ingredient characteristics', 'Required batch size or output', 'Processing functions required', 'Container type and filling requirements'],
    gallery: ['/images/products/juice-plant.jpg', '/images/products/juice-filling.jpg', '/images/products/beverage-processing.jpg'],
  },
  {
    slug: 'brewing-distilling', number: '03', short: 'Whisky & beer', title: 'Your craft. On a bigger stage.', heading: 'Whisky & beer machinery',
    eyebrow: 'WHERE CRAFT MEETS ENGINEERING', video: 'brewing', image: '/images/editorial/brewing-poster.jpg',
    description: 'Explore whisky and beer manufacturing machinery with your product, process, and production ambitions at the centre.',
    intro: 'Behind every distinctive beverage is a considered production process. Whether you are exploring a new operation or the next chapter of an existing one, equipment decisions begin with understanding your craft.',
    body: 'Bring us your whisky or beer manufacturing requirements. We help you shape a machinery discussion around your process stages, desired output, available space, and the equipment you need to bring it together.',
    features: [['Whisky manufacturing', 'Discuss machinery requirements across your whisky manufacturing process.'], ['Beer production', 'Explore equipment requirements for your beer production operation.'], ['Filling & packaging', 'Consider beverage filling requirements alongside your manufacturing workflow.'], ['Expansion planning', 'Define your next production requirements in the context of your existing operation.']],
    checklist: ['Beverage type and process stages', 'Expected production output', 'Available space and existing machinery', 'Filling format and project timeline'],
    gallery: ['/images/editorial/brewing-poster.jpg', '/images/machinery/thermal-tanks.jpg', '/images/editorial/brewing-detail.jpg'],
  },
];

export const processingFunctions = ['Cutting', 'Fine cutting', 'Mixing', 'Stirring', 'Kneading', 'Making purees', 'Emulsifying', 'Heating', 'Cooling', 'Vacuum processing'];

export const equipment = [
  ['juice-processing-system', 'Juice processing system', 'Juice machinery', 'juice-system', 'Bring preparation, mixing, and processing requirements into a coordinated equipment discussion.'],
  ['juice-processing-plant', 'Juice processing plant', 'Juice machinery', 'juice-plant', 'Explore your overall juice processing requirements, from ingredients to the next production stage.'],
  ['juice-production-line', 'Juice production line', 'Juice machinery', 'juice-line', 'Discuss machinery for a juice production workflow shaped around your product and output.'],
  ['mixing-processing-tanks', 'Mixing & processing tanks', 'Juice machinery', 'juice-tanks', 'Explore stainless-steel processing equipment for your mixing and beverage requirements.'],
  ['juice-filling-line', 'Juice filling line', 'Juice machinery', 'juice-filling', 'Bring product, container, and filling requirements together for your juice operation.'],
  ['integrated-juice-equipment', 'Integrated juice equipment', 'Juice machinery', 'juice-equipment', 'Consider connected processing machinery for your production requirements.'],
  ['juice-processing-skid', 'Juice processing skid', 'Juice machinery', 'juice-skid', 'Explore compact equipment arrangements for your juice processing workflow.'],
  ['juice-processing-machinery', 'Juice processing machinery', 'Juice machinery', 'juice-processing', 'Discuss mixing, heating, cooling, and other required processing functions.'],
  ['csd-rts-line', 'CSD & RTS filling line', 'CSD & RTS filling', 'csd-line', 'Explore carbonated soft drink and ready-to-serve beverage filling line requirements.'],
  ['carbonated', 'Carbonated beverage equipment', 'CSD & RTS filling', 'carbonator', 'Discuss carbonated beverage processing equipment alongside your filling requirements.'],
  ['filling-machine', 'Filling machine', 'CSD & RTS filling', 'filler', 'Explore beverage filling machinery with your product and container format in mind.'],
  ['filling-station', 'Filling station', 'CSD & RTS filling', 'filling-station', 'Discuss filling station options for your beverage manufacturing operation.'],
  ['beverage-processing', 'Beverage processing', 'CSD & RTS filling', 'beverage-processing', 'Explore processing machinery to support your beverage production and filling workflow.'],
  ['overall-line', 'Overall production line', 'CSD & RTS filling', 'complete-line', 'Bring the requirements of your overall processing and filling line into one conversation.'],
].map(([slug, title, category, image, description]) => ({ slug, title, category, image: `/images/products/${image}.jpg`, description }));

export const steps = [
  { number: '01', title: 'Start with the bigger picture.', label: 'UNDERSTAND', description: 'Your operation, your ambition, your constraints. We start by listening, so the solution follows the real requirements of your business.', deliverable: 'A clear understanding of your project', image: '/images/editorial/team.jpg', details: ['Business goals and operating context', 'People or equipment requirements', 'Budget expectations and timeline'] },
  { number: '02', title: 'Build a better brief.', label: 'DEFINE', description: 'We turn your ideas into a practical discussion of skills, process functions, production needs, and the details that make a difference.', deliverable: 'A focused workforce or machinery brief', image: '/images/editorial/engineer.jpg', details: ['Role or process specifications', 'Capacity and site considerations', 'Requirements and priorities'] },
  { number: '03', title: 'Explore the right possibilities.', label: 'EXPLORE', description: 'We discuss workforce or machinery options in the context of your brief, bringing clarity to the decisions ahead.', deliverable: 'Options aligned with your requirements', image: '/images/products/beverage-processing.jpg', details: ['Relevant service and equipment categories', 'Questions and technical considerations', 'A shared view of the next steps'] },
  { number: '04', title: 'Move forward, together.', label: 'ALIGN', description: 'We agree the way forward with you. Scope, timing, and the practical next steps are part of the conversation from the beginning.', deliverable: 'An agreed path for your project', image: '/images/editorial/workshop.jpg', details: ['Scope and project priorities', 'Timing and coordination', 'A clear next-step plan'] },
];

export const faqs = [
  ['General', 'What does S5 Global Services offer?', 'Our core services are manpower, large-scale juice and beverage processing machinery, and whisky and beer manufacturing machinery. The machinery range also includes CSD and RTS filling line categories.'],
  ['Machinery', 'Which processing functions can I enquire about?', 'You can discuss cutting, fine cutting, mixing, stirring, kneading, making purees, emulsifying, heating, cooling, and vacuum processing. Tell us the functions your product needs so we can shape the equipment conversation.'],
  ['Machinery', 'What are CSD and RTS filling lines?', 'CSD refers to carbonated soft drinks and RTS to ready-to-serve beverages. Our catalogue includes filling lines, carbonated beverage equipment, filling machines, filling stations, processing, and overall production lines.'],
  ['Manpower', 'What should I include in a manpower enquiry?', 'Include the roles you need, required skills, work location, approximate team size, and expected duration. These details help us understand your workforce requirements.'],
  ['Machinery', 'Can we discuss a complete production line?', 'Yes. Share your product, required processing stages, output, available space, and filling format. You can enquire about an individual machine or your overall production requirements.'],
  ['General', 'Can I enquire about more than one service?', 'Yes. Select “Multiple services” on the enquiry form and explain the workforce and machinery requirements you would like to discuss.'],
  ['General', 'Are the pictured machines exact specifications?', 'The catalogue presents equipment categories and reference photographs. Specific models, specifications, suitability, and availability need to be confirmed for your project.'],
  ['General', 'How do I prepare a project enquiry?', 'Choose your service, describe your project, and add your contact details. The current website prepares a downloadable enquiry summary for your records; direct delivery will be enabled when S5’s business contact details are supplied.'],
];

export const navigation = [['Home', '/'], ['About us', '/about'], ['Our services', '/services'], ['Machinery', '/machinery'], ['Our approach', '/how-we-work']];
