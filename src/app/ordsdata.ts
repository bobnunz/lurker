export class ORDSData {
  items: any[];
  hasMore: boolean;
  limit: number;
  offset: number;
  count: number;
  links: Array<{ rel: string, href: string }>;

  constructor() {
    this.items = [];
    this.hasMore = false;
    this.limit = 0;
    this.offset = 0;
    this.count = 0;
    this.links = [];
  }

}
