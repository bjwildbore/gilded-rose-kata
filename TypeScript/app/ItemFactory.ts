import { Item, GildedRose, ItemTypes } from '@/gilded-rose'
import { NormalItem } from './NormalItem'

// TODO: Finish and implement classes, refactor udateQuality function to implement
export class SpecialItemFactory {
  create(item) {
    switch (item.name) {
      //   case ItemTypes.AGED_BRIE:
      //     break
      //   case ItemTypes.SULFURAS:
      //     break
      //   case ItemTypes.BACKSTAGE:
      //     break
      //   case ItemTypes.CONJURED:
      //     break
      default: {
        return new NormalItem(item.name, item.sellIn, item.quality)
      }
    }
  }
}
