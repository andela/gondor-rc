import { Reaction, Hooks } from "/server/api";

Hooks.Events.add("afterCoreInit", () => {
  Reaction.addRolesToGroups({
    allShops: true,
    groups: ["guest", "customer"],
    roles: ["account/verify", "top-products", "reaction/notifications"]
  });
});
