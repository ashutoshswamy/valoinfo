import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://valo-info-ashutosh.vercel.app/sitemap.xml",
  };
}
