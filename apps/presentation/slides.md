---
theme: academic
highlighter: prism
coverDate: # null
---

# Ny leder, ny stack

Introduksjon til T3-app

---
layout: center
---

# Hva er en T3-app?

---

<h1 class="text-center">Hva er en T3-app?</h1>

![](/t3-github.png)

---

<h1 class="text-center">Hva er en T3-app?</h1>

- NextJS <span v-click>✅</span>
- TailwindCSS
- zod <span v-after>✅</span>
- Prisma
- tRPC
- Auth.js (NextAuth) <span v-after>✅</span>

---
layout: center
---

# Hva er NextJS?

---

<h1 class="text-center">Hva er NextJS?</h1>

- Et meta-rammeverk for React
- Fullstack
  - Skrive kode på server og client
  - `getInitialProps`
  - `getServerSideProps`
  - `getStaticProps`
  - `getStaticPaths`
- Komponenter som hjelper med fart
  - `<Link />`
  - `<Image />`
- Edge functions
  - OG Image

---
layout: center
---

# Hva er TailwindCSS?

---

<h1 class="text-center">Hva er TailwindCSS?</h1>

- CSS-"rammeverk"
- Tilbyr "utility classes"
  - `grid`
  - `flex`
  - `text-red-400`
  - `container`
  - ...
- Mindre spaghetti-kode
- Ferdig utvalgte farger
- Ferdig utvalgte størrelseforhold
- Lett å utvide
  - Siden det er vanlig CSS

---

<h1 class="text-center">Hva er TailwindCSS?</h1>

<div class="grid grid-cols-2 gap-4 overflow-scroll">
<div>

Med TailwindCSS

```ts {all|3}
const MyButton = () => {
  return (
    <button className="bg-blue-400 px-3 py-2 text-white rounded-md">
      Trykk meg!
    </button>
  )
}
```

<div class="w-full flex justify-center py-10 rounded-md border border-gray-300">

<button class="bg-blue-400 px-3 py-2 text-white rounded-md">
  Trykk meg!
</button>

</div>

</div>
<div>

Tilsvarende CSS

```css
.bg-blue-400 {
  --tw-bg-opacity: 1;
  background-color: rgb(96 165 250 / var(--tw-bg-opacity));
}

.px-3 {
  padding-left: 0.75rem/* 12px */;
  padding-right: 0.75rem/* 12px */;
}

.py-2 {
  padding-top: 0.5rem/* 8px */;
  padding-bottom: 0.5rem/* 8px */;
}

.text-white {
  --tw-text-opacity: 1;
  color: rgb(255 255 255 / var(--tw-text-opacity));
}

.rounded-md {
  border-radius: 0.375rem/* 6px */;
}
```

</div>
</div>

<style>
body {
  @apply overflow-y-scroll;
}
</style>


---
layout: center
---

# Hva er zod?

---

<h1 class="text-center">Hva er zod?</h1>

- Schema validation
- Brukes til å validere strukturen på en datatype
  - APIer
  - Skjemaer

---

<h1 class="text-center">Hva er zod?</h1>

## Eksempel fra dokumentasjonen

```ts
import { z } from "zod";

// creating a schema for strings
const mySchema = z.string();

// parsing
mySchema.parse("tuna"); // => "tuna"
mySchema.parse(12); // => throws ZodError

// "safe" parsing (doesn't throw error if validation fails)
mySchema.safeParse("tuna"); // => { success: true; data: "tuna" }
mySchema.safeParse(12); // => { success: false; error: ZodError }
```

---

<h1 class="text-center">Hva er zod?</h1>

## Eksempel fra vår nettside

Her har vi definert hvordan en feedback skal se ut når vi henter den fra databasen.

```ts
// frontend/src/lib/api/feedback.ts

const feedbackSchema = z.object({
    id: z.number(),
    email: z.string().nullable(),
    name: z.string().nullable(),
    message: z.string(),
    sentAt: z.string(),
    isRead: z.boolean(),
});

type Feedback = z.infer<typeof feedbackSchema>;
```

---

<h1 class="text-center">Hva er zod?</h1>

## Eksempel fra vår nettside

Her parser vi dataen fra backenden

```ts
// frontend/src/lib/api/feedback.ts

// ...

const FeedbackAPI = {
  getFeedback: async (idToken: string): Promise<Array<Feedback> | ErrorMessage> => {
    try {
      const response = await fetch(`${BACKEND_URL}/feedback`);
      const data = await response.json();

      return feedbackSchema.array().parse(data);
      } catch {
        // Handle error
    }
  },
}

// ...
```

---
layout: center
---

# Hva er Prisma?

---

<h1 class="text-center">Hva er Prisma?</h1>

- En ORM for JavaScript/TypeScript
  - Object-relational mapping
  - Samme som Exposed
- Kan også generere typer fra databasen
  - Som gjør at alle spørringer er type-safe
  - Vi kan bruke akkurat de samme typene fra databasen
- Automatiske migrations
- Man kan utvikle raskt

---

<h1 class="text-center">Hva er Prisma?</h1>

## Eksempel schema.prisma


<div class="grid grid-cols-2 gap-4 text-xs">
<div>

```java
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id        Int      @id @default(autoincrement())
  createdAt DateTime @default(now())
  email     String   @unique
  name      String?
  role      Role     @default(USER)
  posts     Post[]
}
```

</div>
<div>

```java
model Post {
  id        Int      @id @default(autoincrement())
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  published Boolean  @default(false)
  title     String   @db.VarChar(255)
  author    User?    @relation(fields: [authorId], references: [id])
  authorId  Int?
}

enum Role {
  ADMIN
  USER
}
```

</div>
</div>

---

<h1 class="text-center">Hva er Prisma?</h1>

## Frotend

```ts
const fetchUsers = async () => {
  return await prisma.user.findMany();
}

const fetchAdmins = async = () => {
  return await prisma.user.findMany({
    where: {
      role: Role.ADMIN,
    },
  });
}
```

---
layout: center
---

# Hva er tRPC?

---

<h1 class="text-center">Hva er tRPC?</h1>

- Type-safe RPC
  - Remote procedure call
- Kjøre funksjoner på serveren
- Du vil alltid vite hva du skal gi til funksjonen og hva den returnerer
  - Autocomplete i editor
- Fancy middlewear
  - Lage egne endepunkt for gjester, brukere og admins

---

<h1 class="text-center">Prisma ❤️ tTRPC</h1>

```ts
export const userRouter = createTRPCRouter({
  /**
   * Get profile of user
   */
  get: public
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.user.findUnique({
        where: {
          id: input.id,
        },
      });
    }),
  update: protected
    .input(z.object({
      name: z.string(),
      bio: z.string(),
    }))
    .mutation(async ({ ctx }) => {
      return await ctx.prisma.user.update({
        where: {
          id: ctx.user.id,
        },
        data: {
          name: input.name,
          bio: input.bio,
        };
      })
    })
});
```

*Note: `ctx` kommer fra tRPC middlewear*

---
layout: center
---

# Hva er Auth.js?

---

<h1 class="text-center">Hva er Auth.js</h1>

- Sånn at man kan logge seg inn
- Masse hjelpe funksjoner til å gjøre auth lett
- En `PrismaAdapter` som gjør at den automatisk setter inn brukere i databasen

---

# Heldigvis er ikke dette alt

Annet nytt som blir veldig spennende er også

- pnpm
- turborepo
- HeadlessUI (kanskje og RadixUI)
- Planetscale

---
layout: center
---

# Takk for meg :)

