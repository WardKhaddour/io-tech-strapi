export default {
  async index(ctx) {
    const q = (ctx.request.query.q || "").toString();
    if (!q) return ctx.badRequest("q is required");

    const locale = ctx.request.query.locale || "en";

    const [services, team] = await Promise.all([
      strapi.entityService.findMany("api::service.service", {
        filters: {
          $or: [
            { title: { $containsi: q } },
            { description: { $containsi: q } },
          ],
        },
        populate: ["thumbnail", "coverMedia"],
        locale,
      }),
      strapi.entityService.findMany("api::team-member.team-member", {
        filters: {
          $or: [
            { name: { $containsi: q } },
            { role: { $containsi: q } },
            { bio: { $containsi: q } },
          ],
        },
        populate: ["photo"],
        locale,
      }),
    ]);

    ctx.send({ services, team });
  },
};
