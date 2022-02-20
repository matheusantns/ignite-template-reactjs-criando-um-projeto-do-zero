export function linkResolver(document) {
  if (document.type === "post") {
    return "/blog/" + document.uid;
  }

  return "/";
}
