type StartParams = {
  _sort: string;
  _order: string;
  category: string[];
  type: string[];
  level: string[];
  price_gte?: string;
  price_lte?: string;
};

export default StartParams;
