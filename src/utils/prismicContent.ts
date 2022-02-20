type type = "heading1" | "heading2" | "heading3" | "heading4" | "heading5" | "heading6" | "paragraph" | "preformatted" | "strong" | "em" | "image" | "span";

interface PrismicContent {
  type: type;
  text: string;
}

export function prismicContent(args:PrismicContent) {
  switch(args.type) {
    case "paragraph":
      return `<p>${args.text}</p>`
  }
}
