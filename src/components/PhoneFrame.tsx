import React from "react";

interface PhoneFrameProps {
    src: string;
    alt: string;
    caption?: string;
    /** Load immediately instead of lazily (use for the image in the hero). */
    eager?: boolean;
    /** Caption colour for use on the green header. */
    onLeaf?: boolean;
    className?: string;
}

/**
 * Shows a real app screenshot inside a simple phone outline.
 * The screenshots are 750x1624, so width/height keep the layout stable
 * while they load.
 */
const PhoneFrame: React.FC<PhoneFrameProps> = ({
    src,
    alt,
    caption,
    eager = false,
    onLeaf = false,
    className = "",
}) => {
    return (
        <figure className={`mx-auto w-full max-w-[260px] ${className}`}>
            <div className="rounded-[2.25rem] bg-ink p-2 shadow-lift">
                <img
                    src={src}
                    alt={alt}
                    width={750}
                    height={1624}
                    loading={eager ? "eager" : "lazy"}
                    className="h-auto w-full rounded-[1.75rem] bg-cream"
                />
            </div>
            {caption && (
                <figcaption
                    className={`mt-4 text-center text-sm font-semibold ${
                        onLeaf ? "text-on-leaf/95" : "text-ink-soft"
                    }`}
                >
                    {caption}
                </figcaption>
            )}
        </figure>
    );
};

export default PhoneFrame;
