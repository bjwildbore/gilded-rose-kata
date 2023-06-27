export class Item {
  name: string
  sellIn: number
  quality: number

  constructor(name, sellIn, quality) {
    this.name = name
    this.sellIn = sellIn
    this.quality = quality
  }
}

export enum ItemTypes {
  AGED_BRIE = 'Aged Brie',
  BACKSTAGE = 'Backstage passes to a TAFKAL80ETC concert',
  SULFURAS = 'Sulfuras, Hand of Ragnaros',
}

export class GildedRose {
  items: Array<Item>

  constructor(items = [] as Array<Item>) {
    this.items = items
  }

  updateQuality() {
    this.items.forEach((item) => {
      // normal items decrease in quality and sell
      let sellAdjustment = -1 // sell adjustment usually decreases except for sulfuras
      let qualityAdjustment = -1 // the adjustment differs depending on the type of item

      let canAdjustQuality = true
      let canAdjustSellIn = true

      switch (item.name) {
        case ItemTypes.BACKSTAGE:
          qualityAdjustment = 1 // these items increase

          if (item.sellIn == 0) {
            qualityAdjustment = 0 - item.quality
          } else if (item.sellIn <= 5) {
            qualityAdjustment = 3
          } else if (item.sellIn <= 10) {
            qualityAdjustment = 2
          }
          break

        case ItemTypes.SULFURAS:
          item.quality = 80 // adding in here, mentioned in reqs but missing from original implementation
          canAdjustQuality = false
          canAdjustSellIn = false
          break

        case ItemTypes.AGED_BRIE:
          qualityAdjustment = 1 // these increase
          break
      }

      if (item.sellIn <= 0) {
        qualityAdjustment = qualityAdjustment * 2
      }

      // modify the items sellIn and qualities
      if (canAdjustSellIn) {
        item.sellIn += sellAdjustment
      }

      // quality rules that apply to all items
      if (canAdjustQuality) {
        item.quality += qualityAdjustment

        if (item.quality > 50) {
          item.quality = 50
        } else if (item.quality < 0) {
          item.quality = 0
        }
      }
    })
    return this.items
  }
}
