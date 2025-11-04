import knex from "knex";
import db from "../../database";
import { IPerformanceComparisonPayload } from "../../types/mainTypes";

interface DbTopProduct {
  product_id: number;
  product_name: string;
  total_sold: string;
}

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
      .where(
        db.raw("to_char(s.created_at, 'YYYY-MM') = ?", [filters.selectedMonth])
      );
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
  static async getPerformanceComparison(filters: IPerformanceComparisonPayload) {
    let query = db("sales as s");
    query = query.join("stores as st", "st.id", "s.store_id");
    
    // 1. PRECISAMOS dos pagamentos para calcular a performance (faturamento)
    query = query.leftJoin("payments as py", "py.sale_id", "s.id");

    // 2. SELECIONE os KPIs (Métricas de Performance)
    query = query.select(
      "st.name",
      "st.city",
      "st.state",
      "st.is_active",
      "st.address_street",
      "st.address_number",
      db.raw("COUNT(DISTINCT s.id) as total_sales"),
      db.raw("SUM(py.value) as total_earnings"),
      db.raw("AVG(s.total_amount) as avg_ticket")
    );

    query = query.where("s.sale_status_desc", "COMPLETED");

    if (filters.dateStart && filters.dateEnd) {
      query = query.whereBetween("s.created_at", [
        filters.dateStart,
        filters.dateEnd, 
      ]);
    } else if (filters.dateStart) {
      query = query.where("s.created_at", ">=", filters.dateStart);
    }

    if (filters.states && filters.states.length > 0) {
      query = query.whereIn("st.state", filters.states);
    }

    if (filters.isOwn === true || filters.isOwn === false) {
      query = query.where("st.is_own", filters.isOwn);
    }
    //lembrar de colocar uma indicação que ela eh dona no front...

    if (filters.storeIds && filters.storeIds.length > 0) {
      query = query.whereIn("st.id", filters.storeIds);
    }
    
    // agrupamento por loja
    query = query.groupBy(
      "st.id",
      "st.name",
      "st.city",
      "st.state",
      "st.is_active"
    );

    query = query.orderBy("total_earnings", "desc");

    try {
      const report = await query;
      
      return report;
    } catch (error) {
      console.error("❌ ERRO AO EXECUTAR A QUERY:", error);
      throw new Error("Falha ao buscar dados do relatório.");
    }
  }
  static async getAllStores () {
    let query = db('stores as st')
    query = query.select('id as storeId', 'name as storeName')

     try {
      const report = await query;
      

      return report;
    } catch (error) {
      console.error("❌ ERRO AO EXECUTAR A QUERY:", error);
      throw new Error("Falha ao buscar dados do relatório.");
    }
  }
}
