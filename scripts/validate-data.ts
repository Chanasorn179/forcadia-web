import { validateForcadiaData } from "../src/lib/data-validation";

const issues = validateForcadiaData();

if (issues.length === 0) {
  console.log("✓ Forcadia data is valid.");
  process.exit(0);
}

console.error(`พบปัญหาข้อมูล ${issues.length} รายการ\n`);

for (const issue of issues) {
  console.error(`- [${issue.code}] ${issue.message}`);
}

process.exit(1);
