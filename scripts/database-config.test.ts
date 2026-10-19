import assert from "node:assert/strict";
import { test } from "node:test";
import { X509Certificate } from "node:crypto";
import { databasePoolConfig } from "../src/lib/database-config";
import { supabaseRootCA } from "../src/lib/supabase-ca";

test("Supabase connections use the official CA and strict TLS", () => {
  const config = databasePoolConfig("postgresql://user:secret@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres?sslmode=require&application_name=forcadia");
  assert.deepEqual(config.ssl, { ca: supabaseRootCA, rejectUnauthorized: true });
  const url = new URL(config.connectionString!);
  assert.equal(url.searchParams.has("sslmode"), false);
  assert.equal(url.searchParams.get("application_name"), "forcadia");
  assert.equal(url.password, "secret");
  assert.equal(new X509Certificate(supabaseRootCA).fingerprint256, "80:70:25:AD:50:D4:ED:21:9D:2C:9C:7D:29:9C:00:4F:82:4E:B0:0C:F7:F6:5A:FE:F6:07:D0:7B:72:E6:CA:FA");
});

test("other hosts and explicit certificates retain their connection options", () => {
  for (const url of [
    "postgresql://user:secret@localhost:5432/postgres",
    "postgresql://user:secret@pooler.supabase.com.attacker.invalid/postgres?sslmode=require",
    "postgresql://user:secret@db.example.supabase.co/postgres?sslrootcert=/tmp/custom.pem&sslmode=verify-full",
  ]) assert.deepEqual(databasePoolConfig(url), { connectionString: url });
});
