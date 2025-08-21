export default {
  register() {},

  async bootstrap({ strapi }) {
    try {
      // Find the public role
      const role = await strapi
        .query("plugin::users-permissions.role")
        .findOne({ where: { type: "public" } });

      if (!role) {
        strapi.log.warn("⚠️ Public role not found, skipping permission setup");
        return;
      }

      // Helper to grant permission
      const grant = async (action: string, api: string, controller: string) => {
        await strapi
          .query("plugin::users-permissions.permission")
          .updateMany({
            where: {
              role: role.id,
              action,
            },
            data: { enabled: true },
          })
          .catch(async () => {
            await strapi.query("plugin::users-permissions.permission").create({
              data: {
                role: role.id,
                action,
                enabled: true,
                controller,
                type: "api",
              },
            });
          });
      };

      // ---- Read permissions (find/findOne) ----
      const readCollections = [
        { api: "service", ctrl: "service" },
        { api: "team-member", ctrl: "team-member" },
        { api: "client", ctrl: "client" },
        { api: "blog", ctrl: "blog" },
        { api: "homepage", ctrl: "homepage" },
        { api: "global", ctrl: "global" },
      ];

      for (const col of readCollections) {
        await grant(`api::${col.api}.${col.ctrl}.find`, col.api, col.ctrl);
        await grant(`api::${col.api}.${col.ctrl}.findOne`, col.api, col.ctrl);
      }

      // ---- Create permissions ----
      const createCollections = [
        { api: "subscriber", ctrl: "subscriber" },
        { api: "service", ctrl: "service" },
        { api: "team-member", ctrl: "team-member" },
        { api: "client", ctrl: "client" },
        { api: "blog", ctrl: "blog" },
      ];

      for (const col of createCollections) {
        await grant(`api::${col.api}.${col.ctrl}.create`, col.api, col.ctrl);
      }

      await grant("api::search.search.index", "search", "search");

      strapi.log.info("✅ Public permissions configured successfully");
    } catch (e) {
      strapi.log.error("❌ Error setting public permissions", e);
    }
  },
};
