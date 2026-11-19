import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { DEFAULT_META, PAGE_META } from "../config/seo";

/**
 * Keeps the document title and meta description in step with the current
 * route, using the entries in `config/seo.ts`.
 */
export const usePageMeta = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        const meta = PAGE_META[pathname] ?? DEFAULT_META;
        document.title = meta.title;

        let tag = document.querySelector<HTMLMetaElement>(
            'meta[name="description"]',
        );
        if (!tag) {
            tag = document.createElement("meta");
            tag.name = "description";
            document.head.appendChild(tag);
        }
        tag.content = meta.description;

        // A new page starts at the top, like a normal page load.
        window.scrollTo(0, 0);
    }, [pathname]);
};
