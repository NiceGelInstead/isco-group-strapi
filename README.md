# ISCO Group website

A wannabe Wordpress-like, CMS-centric, content-first website, but we don't want to use it. So we try lots of workaround and gerrymandering to make it happen.

Built with [Strapi](https://docs.strapi.io/dev-docs/intro), [Vue.js](https://vuejs.org/guide/introduction.html), and [Tailwind CSS](https://tailwindcss.com/docs/installation)

## Before started

1. Make sure you have `npm` and `mysql`
2. Create database with name `isco_group`

## How to run

#### Run the Strapi first

```bash
cd strapi
npm install
npm run develop
```

#### Then run the Vue

```bash
cd vue
npm install
npm run dev
```

## Common errors

1. If you encounter `EADDRINUSE` error, make sure you **run Strapi first** then Vue.

## Devs note

#### Quick API References

To populate **all**, use `/api/members?populate=*`

To get specific using **documentId**, use `/api/members/dskbvgdnx2n98op5ayopab7a`

To get individual via **filter**, use `api/members/?filters[Nama][$eq]=Soph`

## Extras

>It's okay, you just gotta do it -Map

If you wandering about license, nope. We'll do it later.