import knex from "knex";
import db from "../../database";

interface DbTopProduct {
  product_id: number;
  product_name: string;
  total_sold: string;
}

const var1 = '2025-05-01'
const var2 = '2025-05-31'

export default class mainData {
  static async getStopSelers(filters: { limit: number }) {
    return await db<DbTopProduct>("product_sales as ps")
      .join("products as p", "ps.product_id", "p.id")
      .select("ps.product_id", "p.name as product_name")
      .count("* as total_sold")
      .groupBy("ps.product_id", "p.name")
      .orderBy("total_sold", "desc")
      .limit(filters.limit);
  } 
static async getMonthlyOverview(filters: {
  channels?: number[];
  selectedMonth: string;
}) {
  
  let query = db("payments as py")
    .join("sales as s", "s.id", "py.sale_id")
    .where("s.sale_status_desc", "COMPLETED")
    .where(db.raw("to_char(s.created_at, 'YYYY-MM') = ?", [filters.selectedMonth]))
  query = query.select(
    db.raw("DATE(s.created_at) as day"),
    db.raw("SUM(py.value) as total_earnings")
  );
  query = query.groupBy(db.raw("DATE(s.created_at)"));

  if (filters.channels && filters.channels.length > 0) {
    query = query.join("channels as ch", "ch.id", "s.channel_id");
    query = query.select("ch.name as channel_name");
    query = query.whereIn("s.channel_id", filters.channels);
    query = query.groupBy("ch.name");
  }

  query = query.orderBy("day", "asc");
  try {
    const report = await query;
    
    return report;

  } catch (error) {
    console.error("❌ ERRO AO EXECUTAR A QUERY:", error); 
    throw new Error("Falha ao buscar dados do relatório.");
  }
}
}
