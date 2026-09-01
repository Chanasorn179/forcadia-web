# Forcadia Web

เว็บไซต์อ่านนิยายแฟนตาซีภาษาไทย **Forcadia: The Shattered Ring** พร้อมสารานุกรมโลก ตัวละคร ตระกูล เมือง เส้นเวลา คลังตำนาน ห้องสมุดส่วนตัว และระบบหลังบ้านสำหรับจัดการเนื้อหา

## Tech stack

- Next.js 16 (App Router) และ React 19
- TypeScript และ Tailwind CSS 4
- Supabase PostgreSQL
- Prisma 7

## ความสามารถหลัก

- อ่านหนังสือและตอนที่เผยแพร่แล้วจากฐานข้อมูล
- ปรับธีม ขนาดตัวอักษร ระยะบรรทัด และความกว้างหน้าอ่าน
- จำความคืบหน้าและ bookmark ด้วย `localStorage`
- สำรวจตัวละคร ตระกูล เมือง lore เส้นเวลา และ gallery
- ค้นหาเนื้อหาภายในจักรวาล Forcadia
- ระบบ admin สำหรับจัดการหนังสือ ตอน ตัวละคร และตระกูล

## เริ่มต้นใช้งาน

ต้องมี Node.js และ Supabase project (หรือใช้ PostgreSQL ผ่าน Docker สำหรับพัฒนาในเครื่อง)

1. ติดตั้ง dependencies ด้วย `npm install`
2. สร้าง Supabase project แล้วเปิดหน้า **Connect** ใน dashboard
3. คัดลอก `.env.example` เป็น `.env` แล้วตั้ง `DATABASE_URL` เป็น Transaction pooler (port `6543`) และ `DIRECT_URL` เป็น Session pooler (port `5432`)
4. เปลี่ยน `ADMIN_PASSWORD` และสุ่ม `ADMIN_SESSION_SECRET` ที่ยาวอย่างน้อย 32 ตัวอักษร
5. รัน `npm run db:migrate:deploy` และ `npm run db:seed`
6. เปิด development server ด้วย `npm run dev`

ถ้าพัฒนาแบบ local ด้วย Docker ให้ตั้งทั้ง `DATABASE_URL` และ `DIRECT_URL` เป็น
`postgresql://forcadia:YOUR_DATABASE_PASSWORD@localhost:5432/forcadia?schema=public`
จากนั้นเปิดฐานข้อมูลด้วย `docker compose up -d` และใช้ `npm run db:migrate`

เปิด <http://localhost:3000> สำหรับเว็บไซต์ และ <http://localhost:3000/admin> สำหรับระบบหลังบ้าน

## Environment variables

| ตัวแปร | การใช้งาน |
| --- | --- |
| `POSTGRES_PASSWORD` | รหัสผ่าน PostgreSQL สำหรับ Docker local เท่านั้น |
| `DATABASE_URL` | Supabase Transaction pooler URL สำหรับ query จากตัวแอป |
| `DIRECT_URL` | Supabase Session pooler หรือ Direct URL สำหรับ Prisma CLI, migration และ seed |
| `ADMIN_PASSWORD` | รหัสผ่านเข้าสู่ระบบ admin |
| `ADMIN_SESSION_SECRET` | secret สำหรับเซ็น session cookie ควรสุ่มและยาวอย่างน้อย 32 ตัวอักษร |

## คำสั่งสำคัญ

```bash
npm run dev            # เปิด development server
npm run build          # สร้าง production build และตรวจ TypeScript
npm run start          # เปิด production server หลัง build
npm run lint           # ตรวจ ESLint
npm run validate:data  # ตรวจความสอดคล้องของข้อมูลแบบ static
npm run db:migrate     # สร้าง/รัน migration ใน development
npm run db:migrate:deploy # รัน migration ที่มีอยู่กับ Supabase/production
npm run db:seed        # ใส่ข้อมูลเริ่มต้น
npm run db:studio      # เปิด Prisma Studio
```

## โครงสร้างหลัก

```text
src/app/          หน้าเว็บ, admin และ route handlers
src/components/   UI components
src/data/         ข้อมูลโลกแบบ static
src/lib/          database, auth, validation และ shared logic
prisma/           schema, migrations และ seed
scripts/          utility scripts
public/images/    รูปภาพที่ใช้ในเว็บไซต์
```

## ตรวจสอบก่อนส่งงาน

```bash
npm run lint
npm run validate:data
npm run build
```
