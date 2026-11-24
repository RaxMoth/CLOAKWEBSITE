import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { PAGE_META } from "../config/seo";

/**
 * Keeps the document title and meta description in step with the current
 * route, using the entries in `config/seo.ts`. A page without an entry
 * there (the local dashboard) sets its own title.
 */
export const usePageMeta = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        // A new page starts at the top, like a normal page load.
        window.scrollTo(0, 0);

        const meta = PAGE_META[pathname];
        if (!meta) return;
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
    }, [pathname]);
};
