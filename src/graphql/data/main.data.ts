import db from "../../database";

interface DbTopProduct { product_id: number; product_name: string; total_sold: string;}

export default class mainData {
    
    static async getStopSelers(filters: {limit: number}){
        return await db<DbTopProduct>("product_sales as ps")
          .join("products as p", "ps.product_id", "p.id")
          .select("ps.product_id", "p.name as product_name")
          .count("* as total_sold")
          .groupBy("ps.product_id", "p.name")
          .orderBy("total_sold", "desc")
          .limit(filters.limit);
    }
    // parei aqui, próximo passo é criar mais queries para suprir as necessidades
}