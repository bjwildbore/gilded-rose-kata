import { Item, GildedRose } from '@/gilded-rose'

describe('normal item tests', () => {
  test('should decrease in quality and sellIn', () => {
    let items = [new Item('generic item', 3, 3)]
    const gildedRose = new GildedRose(items)
    gildedRose.updateQuality()

    expect(items[0].name).toBe('generic item')
    expect(items[0].sellIn).toBe(2)
    expect(items[0].quality).toBe(2)
  })
})
