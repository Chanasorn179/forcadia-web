import type { PoolConfig } from "pg";
import { supabaseRootCA } from "./supabase-ca";

/** Trust Supabase's published CA while still validating the server hostname. */
export function databasePoolConfig(connectionString: string): PoolConfig {
  const url = new URL(connectionString);
  const isSupabase = url.hostname.endsWith(".supabase.com") || url.hostname.endsWith(".supabase.co");
  if (!isSupabase || ["sslrootcert", "sslcert", "sslkey"].some((key) => url.searchParams.has(key))) {
    return { connectionString };
  }
  // pg parses SSL URL options after PoolConfig and would replace our CA.
  for (const key of ["sslmode", "ssl", "sslcert", "sslkey", "uselibpqcompat"]) {
    url.searchParams.delete(key);
  }
  return {
    connectionString: url.toString(),
    ssl: { ca: supabaseRootCA, rejectUnauthorized: true },
    connectionTimeoutMillis: 10_000,
  };
}

