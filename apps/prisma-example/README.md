# Primsa example

## Create next-app

```sh
pnpm create next-app my-project
cd my-project
```

## Install and prisma

```sh
pnpm install primsa -D
pnpm prisma init --datasource-provider sqlite
```

## Create your prisma models

```prisma
// schema.prisma
model Post {
  id        Int      @id @default(autoincrement())
  createdAt DateTime @default(now())
  title     String
  content   String
}
```

## Load changes

```sh
pnpm prisma db push
pnpm prisma generate
```

## Run project

```sh
pnpm dev
```

