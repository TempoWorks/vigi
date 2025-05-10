import { manageLink } from "$lib/management";

export const load = ({ params }) => {
  manageLink("BROWSER", params.urn.replace(/\/$/, ""));
};
