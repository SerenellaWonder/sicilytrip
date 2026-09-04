import { normalizePartnerAssets } from './partner-assets';

describe('normalizePartnerAssets', () => {
  const cdn = 'https://cdn-r-smart.xmlturismo.it/';

  it('prefixes relative provider images at every nesting level', () => {
    const payload = {
      Image: 'hotels/main.jpg',
      Rooms: [{ Thumbnail: '/rooms/double.jpg' }],
      PhotoGallery: ['gallery/one.jpg', '/gallery/two.jpg'],
    };

    expect(normalizePartnerAssets(payload, cdn)).toEqual({
      Image: `${cdn}hotels/main.jpg`,
      Rooms: [{ Thumbnail: `${cdn}rooms/double.jpg` }],
      PhotoGallery: [`${cdn}gallery/one.jpg`, `${cdn}gallery/two.jpg`],
    });
  });

  it('preserves absolute URLs and non-image strings', () => {
    const payload = {
      Image: 'https://images.example.com/hotel.jpg',
      Name: 'hotel.jpg',
      Gallery: ['//images.example.com/gallery.jpg'],
    };

    expect(normalizePartnerAssets(payload, cdn)).toEqual({
      Image: 'https://images.example.com/hotel.jpg',
      Name: 'hotel.jpg',
      Gallery: ['https://images.example.com/gallery.jpg'],
    });
  });

  it('leaves the response untouched when the CDN is not configured', () => {
    const payload = { Image: 'hotels/main.jpg' };
    expect(normalizePartnerAssets(payload, '')).toBe(payload);
  });
});
