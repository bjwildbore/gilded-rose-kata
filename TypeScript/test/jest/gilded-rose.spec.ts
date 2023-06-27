import { Item, GildedRose } from '@/gilded-rose'

// test helper function to run the update function a specified number of times
function runMultiple(items: Array<Item>, days: number) {
  const gildedRose = new GildedRose(items)
  for (let day: number = 0; day < days; day++) {
    gildedRose.updateQuality()
  }
  return items
}

describe('normal items', () => {
  test('should decrease in quality and sellIn', () => {
    let items = [new Item('generic item', 3, 3)]
    items = runMultiple(items, 1)

    expect(items[0].name).toBe('generic item')
    expect(items[0].sellIn).toBe(2)
    expect(items[0].quality).toBe(2)
  })

  test('should decrease 2x as fast after sellIn time', () => {
    let items = [new Item('generic item', 3, 50)]
    items = runMultiple(items, 5)

    expect(items[0].sellIn).toBe(-2)
    expect(items[0].quality).toBe(43)
  })

  test('should not drop quality below 0', () => {
    let items = [new Item('generic item', 1, 5)]
    items = runMultiple(items, 5)

    expect(items[0].sellIn).toBe(-4)
    expect(items[0].quality).toBe(0)
  })
})
