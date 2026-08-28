# Forcadia Web

เว็บไซต์อ่านนิยายแฟนตาซีภาษาไทย **Forcadia: The Shattered Ring** พร้อมสารานุกรมโลก ตัวละคร ตระกูล เมือง เส้นเวลา คลังตำนาน ห้องสมุดส่วนตัว และระบบหลังบ้านสำหรับจัดการเนื้อหา

## Tech stack

- Next.js 16 (App Router) และ React 19
- TypeScript และ Tailwind CSS 4
- PostgreSQL
- Prisma 7

## ความสามารถหลัก

- อ่านหนังสือและตอนที่เผยแพร่แล้วจากฐานข้อมูล
- ปรับธีม ขนาดตัวอักษร ระยะบรรทัด และความกว้างหน้าอ่าน
- จำความคืบหน้าและ bookmark ด้วย `localStorage`
- สำรวจตัวละคร ตระกูล เมือง lore เส้นเวลา และ gallery
- ค้นหาเนื้อหาภายในจักรวาล Forcadia
- ระบบ admin สำหรับจัดการหนังสือ ตอน ตัวละคร และตระกูล

## เริ่มต้นใช้งาน

ต้องมี Node.js และ Docker (หรือ PostgreSQL ที่เข้าถึงได้)

1. ติดตั้ง dependencies ด้วย `npm install`
2. คัดลอก `.env.example` เป็น `.env` และเปลี่ยนค่าตัวอย่างทั้งหมดเป็นค่าที่ปลอดภัย โดย `POSTGRES_PASSWORD` ต้องตรงกับรหัสผ่านใน `DATABASE_URL`
3. เปิด PostgreSQL ด้วย `docker compose up -d`
4. รัน `npm run db:migrate` และ `npm run db:seed`
5. เปิด development server ด้วย `npm run dev`

เปิด <http://localhost:3000> สำหรับเว็บไซต์ และ <http://localhost:3000/admin> สำหรับระบบหลังบ้าน

## Environment variables

| ตัวแปร | การใช้งาน |
| --- | --- |
| `POSTGRES_PASSWORD` | รหัสผ่าน PostgreSQL ที่ Docker Compose ใช้ ต้องตรงกับ `DATABASE_URL` |
| `DATABASE_URL` | PostgreSQL connection string |
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
