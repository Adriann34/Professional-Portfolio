# FreePrints Photobooks email

Browser URL: `/demos/htmlemail`.

`index.html` is a standalone, table-based email with inline CSS, responsive overrides, hidden preheader text, presentation-table semantics, image alt text, and Outlook VML button fallbacks. The static route reads it at build time. Firebase serves the extensionless exported route as HTML.

The campaign is a saved-project reminder. Maya and the saved project are illustrative content; this page does not connect to customer data, Braze, or Listrak. CTA links use the official app page with campaign attribution parameters, rather than an invented project deeplink. Preference and unsubscribe links open the brand's official privacy-request center; no subscription is changed by this page.

Product offer, contact address, and destination links were checked against the official pages on October 13, 2026:

- https://www.freeprintsphotobooks.com/
- https://www.freeprintsphotobooks.com/privacy
- https://www.freeprintsphotobooks.com/apps
- https://www.freeprintsphotobooks.com/privacyrequest

Browser rendering was checked at 1440, 768, 390, and 320px. Outlook fallbacks are included, but inbox rendering has not been tested in Litmus or Email on Acid. Before sending through an ESP, replace fixed recipient/project values, connect the authenticated project deeplink, and use that platform's actual preference and unsubscribe URLs.

## Artwork

Final asset: `assets/summer-photobook.jpg`. Created with the built-in image generation tool and optimized as a 1440px JPEG. The original generated PNG is retained outside the project.

Generation prompt:

> Use case: product-mockup. Asset type: hero photography for a minimalist photo-book email. Create a refined photorealistic editorial product photograph, landscape 3:2. On a very pale warm-gray studio surface, an open small softcover photo book lies diagonally, filling most of the frame, with a second closed softcover book tucked beneath at upper right. Open spread contains beautiful candid sunlit summer photographs: left page a large photo of a young family walking on a sandy beach, right page a thoughtful 2-photo layout showing a child collecting shells and coastal grasses. White page margins, realistic subtle paper curve and visible book binding, accurate physical book geometry. Closed book cover shows a coastal sea photograph with no lettering. One loose small photographic print at lower left shows blue sea and sun-warmed rocks. Quiet modern still-life styling, subtle daylight shadows, natural Mediterranean blue and sandy beige ONLY in photographs, plentiful light empty background around the books. Camera overhead at a slight angle, art-directed premium print campaign, tactile paper details. No flowers, no props, no hands outside photos, no typography, no logos, no watermark. The books should look like affordable well-made printed photo books, not a luxury thick wedding album.
