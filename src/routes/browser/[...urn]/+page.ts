import { manageLink } from "$lib/utils";

export const load = ({ params }) => {
  manageLink("browser", params.urn.replace(/\/$/, ""));
};
