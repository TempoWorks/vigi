import { manageLink } from "$lib/management";

export const load = ({ params }) => {
  manageLink("browser", params.urn.replace(/\/$/, ""));
};
