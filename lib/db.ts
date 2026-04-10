import { neon } from "@neondatabase/serverless"

export function getDb() {
  const sql = neon(process.env.DATABASE_URL!)
  return sql
}

// Helper to query dreamvacations schema
export async function queryDreamVacations(query: string, params?: any[]) {
  const sql = getDb()
  return sql(query, params)
}
