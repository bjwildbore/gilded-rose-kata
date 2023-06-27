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

describe('aged bries', () => {
  test('should increase in quality', () => {
    let items = [new Item('Aged Brie', 3, 3)]
    items = runMultiple(items, 1)

    expect(items[0].sellIn).toBe(2)
    expect(items[0].quality).toBe(4)
  })

  test('should increase in quality multiple days', () => {
    let items = [new Item('Aged Brie', 3, 3)]
    items = runMultiple(items, 2)

    expect(items[0].sellIn).toBe(1)
    expect(items[0].quality).toBe(5)
  })

  test('should increase in quality past sellIn time', () => {
    let items = [new Item('Aged Brie', 3, 3)]
    items = runMultiple(items, 5)

    expect(items[0].sellIn).toBe(-2)
    expect(items[0].quality).toBe(10)
  })

  test('should not increase in quality past 50', () => {
    let items = [new Item('Aged Brie', 3, 49)]
    items = runMultiple(items, 5)

    expect(items[0].quality).toBe(50)
  })
})

describe('sulfuras items', () => {
  test('should not change', () => {
    let items = [new Item('Sulfuras, Hand of Ragnaros', 22, 80)]
    items = runMultiple(items, 1)

    expect(items[0].sellIn).toBe(22)
    expect(items[0].quality).toBe(80)
  })

  test('should not change over multiple days', () => {
    let items = [new Item('Sulfuras, Hand of Ragnaros', 22, 80)]
    items = runMultiple(items, 5)

    expect(items[0].sellIn).toBe(22)
    expect(items[0].quality).toBe(80)
  })
})

//Quality increases by 2 when there are 10 days or less
//and by 3 when there are 5 days or less but Quality drops to 0 after the concert
describe('backstage passes tests', () => {
  test('should increase quality', () => {
    let items = [new Item('Backstage passes to a TAFKAL80ETC concert', 20, 10)]
    items = runMultiple(items, 1)

    expect(items[0].sellIn).toBe(19)
    expect(items[0].quality).toBe(11)
  })

  test('should increase quality multiple days', () => {
    let items = [new Item('Backstage passes to a TAFKAL80ETC concert', 20, 15)]
    items = runMultiple(items, 5)

    expect(items[0].sellIn).toBe(15)
    expect(items[0].quality).toBe(20)
  })

  test('should increase in quality by 2 within 10 days', () => {
    let items = [new Item('Backstage passes to a TAFKAL80ETC concert', 10, 10)]
    items = runMultiple(items, 1)

    expect(items[0].quality).toBe(12)
  })

  test('should increase in quality by 3 within 5 days', () => {
    let items = [new Item('Backstage passes to a TAFKAL80ETC concert', 4, 10)]
    items = runMultiple(items, 1)

    expect(items[0].quality).toBe(13)
  })

  test('should have quality of 0 when sellIn is past', () => {
    let items = [new Item('Backstage passes to a TAFKAL80ETC concert', 0, 10)]
    items = runMultiple(items, 1)

    expect(items[0].quality).toBe(0)
  })

  test('quality should not exceed 50', () => {
    let items = [new Item('Backstage passes to a TAFKAL80ETC concert', 3, 49)]
    items = runMultiple(items, 3)
    expect(items[0].quality).toBe(50)
  })
})
