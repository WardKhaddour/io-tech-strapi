import { factories } from '@strapi/strapi'

export default factories.createCoreController(
  'api::subscriber.subscriber',
  ({ strapi }) => ({
    async create(ctx) {
      const email =
        ctx.request.body?.data?.email || ctx.request.body?.data?.email
      if (!email) {
        return ctx.badRequest('Email is required')
      }
      const existing = await strapi.entityService.findMany(
        'api::subscriber.subscriber',
        {
          filters: { email: email.toLowerCase() },
          limit: 1,
        }
      )
      if (existing && existing.length > 0) {
        ctx.status = 409
        return { ok: false, message: 'You are already subscribed.' }
      }
      const now = new Date().toISOString()
      const entry = await strapi.entityService.create(
        'api::subscriber.subscriber',
        {
          data: { email: email.toLowerCase(), createdAt: now },
        }
      )
      ctx.status = 201
      return { ok: true, message: 'Subscribed successfully', data: entry }
    },
  })
)
