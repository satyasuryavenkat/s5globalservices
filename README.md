# S5 Global Services

A responsive React website for manpower services, industrial juice processing, CSD & RTS filling lines, and whisky and beer manufacturing machinery. The design uses a full-screen video hero, editorial photography, animated service tabs, scroll reveals, and distinct page layouts.

## Start

```sh
npm install
npm run dev
```

## Production build

```sh
npm run build
npm run preview
```

## Pages

Home, About, Services, three individual service pages, Machinery, fourteen equipment detail pages, Our Approach, FAQs, Contact, and Media Credits. All navigation opens real routes, and `npm run build` also creates a direct-entry HTML file for every page in `dist/`, with individual page titles and descriptions. Serve `dist/` from your hosting web root.

Includes muted autoplay hero films for workforce, beverage production, and brewing. Visitors can select a service film and pause/resume playback. Reduced-motion preferences disable animation and initial autoplay. Videos are local H.264 MP4 files with image fallbacks; catalogue and editorial images are stored locally.

The machinery catalogue supports category filters and text search. Equipment enquiries prefill the service and equipment on the contact page. The enquiry form validates input and prepares a downloadable summary. It does not send messages; connect S5's business contact details and a delivery service before launch.

## Browser checks

```sh
npm run dev
npm run check:browser
```

The check defaults to `http://127.0.0.1:5174` and uses installed Google Chrome on Windows. Set `S5_PREVIEW_URL` to your dev or preview URL if different. Checks cover video playback, pause/resume, separate-page navigation, five screen widths (320–1920px), local image loading, catalogue filters/search, equipment enquiry prefills, local download, FAQs, and mobile navigation. Review screenshots in `artifacts/`.

## Assets and reference content

The user-provided ASK Power Trading website informed the machinery categories and engineering approach. Product images from its machinery page are stored in `public/images/products/`. S5 copy is written around the requested services; ASK's address, staff, contacts, and company claims are not used as S5 details. Media sources and credits are available at `/credits`.

Hero videos are from Pexels (ArtHouse Studio, Thanh Văn, and cottonbro studio), downloaded under the Pexels license, compressed, shortened, and stripped of audio. Editorial images are from Unsplash and video stills. Additional Wikimedia photographs and licenses are recorded in `src/machinery-photos.json`. Fonts load from Google Fonts.

Asset helpers are in `scripts/`. `download-redesign-assets.mjs` retrieves reference assets, and `optimize-videos.mjs` uses FFmpeg to prepare lightweight clips and poster frames. The optimization helper removes its downloaded source videos after successful conversion.
