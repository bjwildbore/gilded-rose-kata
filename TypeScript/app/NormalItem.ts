import { Item } from '@/gilded-rose'

export class NormalItem extends Item {
  process() {
    this.sellIn--
    if (this.sellIn >= 0) {
      this.quality -= 1
    } else {
      this.quality -= 2
    }

    if (this.quality < 50) this.quality = 0
  }
}
