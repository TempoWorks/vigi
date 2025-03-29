<script>
  import { goto } from "$app/navigation";
  import { renderLnk } from "$lib/utils";

  goto(
    renderLnk(
      "auto",
      "gemini://geminiprotocol.net/docs/gemtext-specification.gmi"
    )
  );
</script>
