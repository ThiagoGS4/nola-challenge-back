export interface IMonthlyOverviewFilters {
  selectedMonth: string; // YYYY-MM
  channels?: number[];
}

export interface IPerformanceComparisonPayload {
  dateStart: string;
  dateEnd: string;
  storeIds?: number[];
  states?: string[];
  district?: string;
  isOwn?: boolean;
}