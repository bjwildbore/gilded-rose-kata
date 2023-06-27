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
    for (let i = 0; i < this.items.length; i++) {
      let item = this.items[i]
      if (
        item.name != ItemTypes.AGED_BRIE &&
        item.name != ItemTypes.BACKSTAGE
      ) {
        if (item.quality > 0) {
          if (item.name != ItemTypes.SULFURAS) {
            item.quality = item.quality - 1
          }
        }
      } else {
        if (item.quality < 50) {
          item.quality = item.quality + 1
          if (item.name == ItemTypes.BACKSTAGE) {
            if (item.sellIn < 11) {
              if (item.quality < 50) {
                item.quality = item.quality + 1
              }
            }
            if (item.sellIn < 6) {
              if (item.quality < 50) {
                item.quality = item.quality + 1
              }
            }
          }
        }
      }
      if (item.name != ItemTypes.SULFURAS) {
        item.sellIn = item.sellIn - 1
      }
      if (item.sellIn < 0) {
        if (item.name != ItemTypes.AGED_BRIE) {
          if (item.name != ItemTypes.BACKSTAGE) {
            if (item.quality > 0) {
              if (item.name != ItemTypes.SULFURAS) {
                item.quality = item.quality - 1
              }
            }
          } else {
            item.quality = item.quality - item.quality
          }
        } else {
          if (item.quality < 50) {
            item.quality = item.quality + 1
          }
        }
      }
    }

    return this.items
  }
}
